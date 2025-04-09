const hre = require("hardhat");

async function main() {
  // Get contract factory
  const SupplyChainFactory = await hre.ethers.getContractFactory("DeviceSupplyChain");

  // Deploy contract
  const contract = await SupplyChainFactory.deploy();

  // Wait for the contract to be mined
  await contract.waitForDeployment();

  // Print deployed address
  console.log("✅ DeviceSupplyChain deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error("❌ Error deploying contract:", error);
  process.exitCode = 1;
});
