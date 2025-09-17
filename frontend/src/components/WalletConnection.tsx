import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

function WalletConnection() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="wallet-info">
        <p>Connected to: {address}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return (
    <div className="wallet-connect">
      <p>Please connect your wallet to interact with the smart contract</p>
      <button onClick={() => connect({ connector: injected() })}>
        Connect Wallet
      </button>
    </div>
  );
}

export default WalletConnection;
