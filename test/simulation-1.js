const { expect } = require("chai")

describe("Simulation Test", () => {
  let MultiSigWallet
  let multisig
  let LoyToken
  let token
  let owner
  let addr1
  let addr2
  let addr3
  let addr4
  let addrs

  before(async () => {
    // Get accounts
    [owner, addr1, addr2, addr3, addr4, ...addrs] = await ethers.getSigners()

    MultiSigWallet = await ethers.getContractFactory("MultiSigWallet")
    multisig = await MultiSigWallet.deploy([owner.address, addr1.address])

    LoyToken = await ethers.getContractFactory("LoyToken")
    token = await LoyToken.deploy()

    await token.deployed()
    await multisig.deployed()
  })

  describe ("Token Deploment", async () => {

    it("Token Config", async () => {
      expect(await token.name()).to.equal('Loy Token')
      expect(await token.symbol()).to.equal('LOY')
      expect(await token.decimals()).to.equal(18)
    })

    it("Should be able to send token", async () => {
      await token.connect(owner).transfer(multisig.address, await ethers.utils.parseEther('100'))
    })

    it("Should be able to get balance", async () => {
      const balance = await token.connect(owner).balanceOf(multisig.address)
      expect(balance.toString()).to.equal(await ethers.utils.parseEther('100'))
    })
  })

  describe ("MultiSig Wallet Deploment", async () => {

    it("Send ether to smart contract", async () => {
      await owner.sendTransaction({ to: multisig.address, value: ethers.utils.parseEther('20') })

    })

    it("Owners should be able to add signer", async () => {
      await multisig.connect(owner).addSigner(addr2.address)
      await multisig.connect(addr1).addSigner(addr3.address)
    })

    // Sending Ether
    it("Owner should be able to create Transaction", async () => {
      await multisig.connect(owner).createTransaction(addr4.address, ethers.utils.parseEther('5'), '0x00')
    })

    it("Owners/Signers should be able to approve", async () => {
      await multisig.connect(owner).confirmTransaction(0)
      await multisig.connect(addr1).confirmTransaction(0)
      await multisig.connect(addr2).confirmTransaction(0)
    })

    it("Should not be able to confirm if done already", async () => {
      await expect(multisig.connect(owner).confirmTransaction(0)).to.be.revertedWith('tx already confirmed')
    })

    it("Shoud be able to revoke", async () => {
      await multisig.connect(addr1).revokeConfirmation(0)
      await multisig.connect(addr2).revokeConfirmation(0)
    })

    it("Owners/Signers should be able to approve", async () => {
      await multisig.connect(addr1).confirmTransaction(0)
      await multisig.connect(addr2).confirmTransaction(0)
    })

    it("Should be able to execute transaction", async () => {
      await multisig.connect(owner).executeTransaction(0)
    })

    // Sending ERC20 Token
    it("Signer should be able to create Token Transaction", async () => {
      await multisig.connect(addr2).createtokenTransaction(token.address, addr4.address, ethers.utils.parseEther('5'), '0x01')
    })

    it("Owners/Signers should be able to approve", async () => {
      await multisig.connect(owner).confirmTokenTransaction(0)
      await multisig.connect(addr1).confirmTokenTransaction(0)
      await multisig.connect(addr2).confirmTokenTransaction(0)
    })

    it("Should not be able to confirm if done already", async () => {
      await expect(multisig.connect(owner).confirmTokenTransaction(0)).to.be.revertedWith('token tx already confirmed')
    })

    it("Shoud be able to revoke", async () => {
      await multisig.connect(addr1).revokeTokenConfirmation(0)
      await multisig.connect(addr2).revokeTokenConfirmation(0)
    })

    it("Owners/Signers should be able to approve", async () => {
      await multisig.connect(addr1).confirmTokenTransaction(0)
      await multisig.connect(addr2).confirmTokenTransaction(0)
    })

    it("Should be able to execute transaction", async () => {
      await multisig.connect(owner).executeTokenTransaction(0)
    })

    it("Should be able to check token balance of smart contract", async () => {
      const balance = await token.connect(owner).balanceOf(multisig.address)
      expect(balance.toString()).to.equal(await ethers.utils.parseEther('95'))
    })
  })
})
