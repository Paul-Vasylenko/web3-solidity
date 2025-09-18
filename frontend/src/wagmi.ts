import { http, createConfig, injected } from "wagmi";
import { hardhat } from "wagmi/chains";
import { metaMask, safe } from "wagmi/connectors";

export const config = createConfig({
  chains: [hardhat],
  connectors: [injected(), metaMask(), safe()],
  transports: {
    [hardhat.id]: http(),
  },
});

// Contract information from environment variables
export const COUNTER_CONTRACT_ADDRESS = import.meta.env
  .VITE_COUNTER_CONTRACT_ADDRESS as `0x${string}`;
console.log(COUNTER_CONTRACT_ADDRESS);
