import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import "./Web3Counter.css";
import { counterAbi } from "../generated/abi";
import { COUNTER_CONTRACT_ADDRESS } from "../wagmi";
import WalletConnection from "./WalletConnection";

function Web3Counter() {
  const { isConnected } = useAccount();

  // Read the current count from the contract
  const {
    data: count,
    isError,
    isPending,
    refetch,
  } = useReadContract({
    address: COUNTER_CONTRACT_ADDRESS,
    abi: counterAbi,
    functionName: "getValue",
  });

  // Write functions for incrementing
  const {
    data: incHash,
    writeContract: increment,
    isPending: isIncPending,
  } = useWriteContract();
  const {
    data: incByHash,
    writeContract: incrementBy,
    isPending: isIncByPending,
  } = useWriteContract();
  const {
    data: decHash,
    writeContract: decrement,
    isPending: isDecPending,
  } = useWriteContract();

  // Wait for transactions to be mined
  const incResult = useWaitForTransactionReceipt({ hash: incHash });
  const incByResult = useWaitForTransactionReceipt({ hash: incByHash });
  const decResult = useWaitForTransactionReceipt({ hash: decHash });

  // Refetch count when transactions are successful
  if (incResult.isSuccess || incByResult.isSuccess || decResult.isSuccess) {
    refetch();
  }

  const handleIncrement = () => {
    if (!isConnected) {
      console.log("Wallet not connected!");
      alert("Please connect your wallet first!");
      return;
    }

    try {
      increment({
        address: COUNTER_CONTRACT_ADDRESS,
        abi: counterAbi,
        functionName: "inc",
      });
      console.log("Increment transaction initiated");
    } catch (error) {
      console.error("Error calling increment:", error);
    }
  };

  const handleIncrementBy = () => {
    incrementBy({
      address: COUNTER_CONTRACT_ADDRESS,
      abi: counterAbi,
      functionName: "incBy",
      args: [BigInt(10)], // Increment by 10
    });
  };

  const handleDecrement = () => {
    decrement({
      address: COUNTER_CONTRACT_ADDRESS,
      abi: counterAbi,
      functionName: "dec",
    });
  };

  if (isPending) return <div>Loading contract data...</div>;
  if (isError) return <div>Error connecting to contract</div>;

  return (
    <div className="web3-counter">
      <h2>Web3 Smart Contract Counter</h2>

      {/* Wallet Connection */}
      <WalletConnection />

      <div className="counter-display">
        <h3>Current Count: {count?.toString() || "0"}</h3>
      </div>

      <div className="counter-actions">
        <button
          onClick={handleDecrement}
          disabled={isDecPending || decResult.isLoading}
          className="counter-btn decrement"
        >
          {isDecPending || decResult.isLoading ? "Mining..." : "- Decrement"}
        </button>

        <button
          onClick={handleIncrement}
          disabled={isIncPending || incResult.isLoading}
          className="counter-btn increment"
        >
          {isIncPending || incResult.isLoading ? "Mining..." : "+ Increment"}
        </button>

        <button
          onClick={handleIncrementBy}
          disabled={isIncByPending || incByResult.isLoading}
          className="counter-btn increment-by"
        >
          {isIncByPending || incByResult.isLoading
            ? "Mining..."
            : "+10 Increment By 10"}
        </button>
      </div>

      <div className="contract-info">
        <p>
          <strong>Contract Address:</strong> {COUNTER_CONTRACT_ADDRESS}
        </p>
        <p>
          <strong>Network:</strong> Localhost
        </p>
      </div>

      {(incHash || incByHash || decHash) && (
        <div className="transaction-info">
          <h4>Recent Transactions:</h4>
          {incHash && <p>Inc TX: {incHash}</p>}
          {incByHash && <p>IncBy TX: {incByHash}</p>}
          {decHash && <p>Dec TX: {decHash}</p>}
        </div>
      )}
    </div>
  );
}

export default Web3Counter;
