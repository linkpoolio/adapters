// Hardhat configuration
// See (https://hardhat.org/config/) for more details.

const TESTING_PRIVATE_KEY = '0x90125e49d93a24cc8409d1e00cc69c88919c6826d8bbabb6f2e1dc8213809f4c'

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 31337,
      accounts: [
        {
          privateKey: TESTING_PRIVATE_KEY,
          balance: '10000000000000000000000',
        },
      ],
    },
  },
  // NOTE: The compiler isn't currently used, but this suppresses a warning
  solidity: {
    version: '0.5.15',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
}
