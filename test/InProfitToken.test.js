const BigNumber = web3.utils.BN;

const _getBalance = web3.eth.getBalance;
web3.eth.getBalance = async (address) => {
  return new BigNumber(await _getBalance(address))
};

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bn')(BigNumber))
  .should();

const InProfitToken = artifacts.require('InProfitToken');

contract('InProfitToken', function ([depl, owner, dest]) {
  const initialSupply = new BigNumber('1000000');
  const decimals = new BigNumber('0');
  const value = new BigNumber('1');
  
  beforeEach(async function () {
    this.token = await InProfitToken.new(initialSupply, owner, "InProfitPoint", "IPP", decimals);
  });
  
  it('Should issue whole supply to owner', async function () {
    (await this.token.balanceOf(depl)).should.be.bignumber.equal(new BigNumber('0'));
    (await this.token.balanceOf(owner)).should.be.bignumber.equal(initialSupply);
  });
  
  it('Should transfer tokens', async function () {
    await this.token.transfer(dest, value, { from: owner }).should.be.fulfilled;
    
    (await this.token.balanceOf(dest)).should.be.bignumber.equal(value);
    (await this.token.balanceOf(owner)).should.be.bignumber.equal(initialSupply.sub(value));
  });
});