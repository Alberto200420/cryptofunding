module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
    poligon: {
      url: 'http://localhost:24012/rpc',
      network_id: '137',
      timeout: 60000,
      gasMultiplier: 1
    }
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // api_keys: {
  //   etherscan: ETHERSCAN_API_KEY,  VERIFICAR CONTRATOS
  // },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.17" // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
};

    // Useful for deploying to a public network.
    // Note: It's important to wrap the provider as a function to ensure truffle uses a new provider every time.
    // goerli: {
    //   provider: () => new HDWalletProvider(MNEMONIC, `https://goerli.infura.io/v3/${PROJECT_ID}`),
    //   network_id: 5,       // Goerli's id
    //   confirmations: 2,    // # of confirmations to wait between deployments. (default: 0)
    //   timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    //   skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    // },