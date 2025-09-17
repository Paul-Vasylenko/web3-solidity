import { ethers } from "hardhat";

async function main() {
  console.log("Deploying Counter contract...");

  // Deploy the Counter contract
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();

  await counter.waitForDeployment();

  const address = await counter.getAddress();
  console.log(`Counter contract deployed to: ${address}`);

  // Save deployment info to a JSON file for frontend to use
  const deploymentInfo = {
    address: address,
    abi: Counter.interface.format("json"),
  };

  const fs = require("fs");
  const path = require("path");

  // Create deployments folder if it doesn't exist
  const deploymentsDir = path.join(__dirname, "../deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir);
  }

  // Write deployment info
  fs.writeFileSync(
    path.join(deploymentsDir, "Counter.json"),
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("Deployment info saved to deployments/Counter.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
