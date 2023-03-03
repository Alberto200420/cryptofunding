var TMIS = artifacts.require("TMIS");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(TMIS);
};
