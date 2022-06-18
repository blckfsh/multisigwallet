const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const accounts = await hre.ethers.getSigners()
  const MultiSigWallet = await hre.ethers.getContractFactory("MultiSigWallet");
  const multisigwallet = await MultiSigWallet.deploy(
    [
      accounts[0].address,
      accounts[1].address
    ]
  );

  const LoyToken = await hre.ethers.getContractFactory("LoyToken");
  const token = await LoyToken.deploy();

  await multisigwallet.deployed();
  await token.deployed();

  console.log("MultiSig Wallet deployed to:", multisigwallet.address);
  console.log("Token Wallet deployed to:", token.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
