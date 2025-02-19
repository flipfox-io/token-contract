// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {

  // Get the contract owner
  const [deployer] = await ethers.getSigners();
  const mintingAddress = process.env.INIT_DAO_WALLET;

  console.log(`Deploying contract from: ${deployer.address}`);
  console.log(`Minting address: ${mintingAddress}`)

  // Hardhat helper to get the ethers contractFactory object
  const FLOXToken = await ethers.getContractFactory('FLOXToken');

  // Deploy the contract
  console.log('Deploying Flipfox Token $FLOX...');

  const floxToken = await FLOXToken.deploy(mintingAddress);
  await floxToken.waitForDeployment();

  const contractAddress = await floxToken.getAddress();
  console.log(`FLOX Token deployed to: ${contractAddress}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
