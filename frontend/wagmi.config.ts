import { defineConfig } from "@wagmi/cli";
import { hardhat } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "./src/generated/abi.ts",
  plugins: [
    hardhat({
      project: "../contracts",
    }),
  ],
});
