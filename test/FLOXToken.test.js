const { expect } = require('chai');
const { ethers } = require("hardhat");

// Start test block
describe('FLOXToken', function () {
  before(async function () {
    this.FloxToken = await ethers.getContractFactory('FLOXToken');
  });

  beforeEach(async function () {
    const signers = await ethers.getSigners();

    this.ownerAddress = signers[0].address; // aka DAO address
    this.recipientAddress = signers[1].address;

    this.floxToken = await this.FloxToken.deploy(this.ownerAddress);

    this.decimals = await this.floxToken.decimals();

    this.totalSupply = 50_000_000;

    this.signerContract = this.floxToken.connect(signers[1]);
  });

  // Test cases
  it('Creates a token with a name', async function () {
    expect(await this.floxToken.name()).to.exist;
    // expect(await this.floxToken.name()).to.equal('FLOXToken');
  });

  it('Creates a token with a symbol', async function () {
    expect(await this.floxToken.symbol()).to.exist;
    // expect(await this.floxToken.symbol()).to.equal('FLOX');
  });

  it('Has a valid decimal', async function () {
    expect((await this.floxToken.decimals()).toString()).to.equal('18');
  })

  it('Has a valid total supply', async function () {
    const expectedSupply = this.totalSupply.toString();
    expect((await this.floxToken.totalSupply()).toString()).to.equal(expectedSupply);
  });

  it("Should assign the total supply of tokens to the DAO wallet", async function () {
    const daoBalance = await this.floxToken.balanceOf(this.ownerAddress);
    expect(await this.floxToken.totalSupply()).to.equal(daoBalance);
  });

  it('Is able to query account balances', async function () {
    const ownerBalance = await this.floxToken.balanceOf(this.ownerAddress);
    expect(await this.floxToken.balanceOf(this.ownerAddress)).to.equal(ownerBalance);
  });

  it('Transfers the right amount of tokens to/from an account', async function () {
    const transferAmount = 1000;
    await expect(this.floxToken.transfer(this.recipientAddress, transferAmount)).to.changeTokenBalances(
        this.floxToken,
        [this.ownerAddress, this.recipientAddress],
        [-transferAmount, transferAmount]
      );
  });

});
