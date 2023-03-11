require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/1MnBDcNmzf2CpLBp9bfpuY3EyvbRWkG-',
      accounts: [ '6f0407f48c41bbe9d0b047b4237147f201c290cdb96b722255cd19ad6278f69e' ]
    }
  }
}