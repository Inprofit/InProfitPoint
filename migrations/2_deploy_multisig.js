const InProfitToken = artifacts.require("./InProfitToken.sol");
const BigNumber = web3.utils.BN;

module.exports = function (deployer, network, [owner]) {
  deployer.deploy(InProfitToken, new BigNumber(1000000), owner, 'InProfitPoint', 'IPP', new BigNumber(0));
};
