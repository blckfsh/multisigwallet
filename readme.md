MultiSig Wallet
===============

Smart Contract that would allow to send ether and erc20 token thru quorum.

Installation
------------

```
npm install
```
from this directory. It will re-install the `node_modules` folder based on the dependencies on `package.json` file.

How to use?
----------
```
npx hardhat node
```
from this directory and it will run `hardhat`.

Deploy to localhost
-------------------
```
npx hardhat run scripts/deploy-test.js --network localhost
```
from this directory and it will deploy the smart contracts on `hardhat`.

Test
-----

```
npm test
```
from this directory.
It will run the `test` script.

Smart Contracts deployed in `rinkeby` and verified as well.
1. Token: [0xE02e58dF1a5687aF44f1A366C63dd31fF716c8D7](https://rinkeby.etherscan.io/address/0xE02e58dF1a5687aF44f1A366C63dd31fF716c8D7)
2. MultiSig Wallet: [0x29DC0F20B843D078e3508c0A64C3dBD7F5d35d0b](https://rinkeby.etherscan.io/address/0x29DC0F20B843D078e3508c0A64C3dBD7F5d35d0b)

Enjoy!
