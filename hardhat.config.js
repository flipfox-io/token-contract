require('@nomicfoundation/hardhat-verify');
require('@nomicfoundation/hardhat-chai-matchers');
require("hardhat-contract-sizer");
require('hardhat-dependency-compiler');
require('hardhat-deploy');
require('hardhat-gas-reporter');
require('hardhat-tracer');
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.24',
      }
    ]
  },
  etherscan: {
   apiKey: {
    "base-mainnet": process.env.BASESCAN_API_KEY
   },
   customChains: [
     {
       network: "base-mainnet",
       chainId: 8453,
       urls: {
        apiURL: "https://api.basescan.org/api",
        browserURL: "https://basescan.org"
       }
     }
   ]
  },
  networks: {
    base: {
      url: 'https://base.llamarpc.com',
      accounts: [process.env.DEPLOYER_PRIVATE_KEY]
    },
  }
};
