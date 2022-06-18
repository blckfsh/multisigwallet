require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(`${account.address}`)
  }
});

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
     rinkeby: {
       url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PUBLIC_KEY}`,
       accounts: [process.env.TESTNET_ACCOUNT_PK]
     },
     // mainnet: {
     //   url: process.env.NEXT_PUBLIC_MAINNET_URL
     // }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
