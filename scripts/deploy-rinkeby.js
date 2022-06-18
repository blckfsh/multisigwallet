const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const accounts = [
    '0x1BA8f5D548Bf698d5b33d0BD5628C2EB76253264',
    '0x9532b57CeAc5Ba4a29B1FF8F0744Cc9C39D1FE2D'
  ]
  const MultiSigWallet = await hre.ethers.getContractFactory("MultiSigWallet");
  const multisigwallet = await MultiSigWallet.deploy(
    [
      accounts[0],
      accounts[1]
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
