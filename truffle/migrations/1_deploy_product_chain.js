// const SimpleStorage = artifacts.require("SimpleStorage");

// module.exports = function (deployer) {
//   deployer.deploy(SimpleStorage);
// };

const ProductChain = artifacts.require("ProductChain");

module.exports = function (deployer) {
  deployer.deploy(ProductChain);
};
