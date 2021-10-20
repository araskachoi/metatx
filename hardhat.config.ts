import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

import { HardhatUserConfig } from "hardhat/types"
import "@nomiclabs/hardhat-ethers";

const config: HardhatUserConfig = {
  solidity:  {
    compilers: [
      {
        version: "0.8.0"
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: "remote",
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY || 'df9ca0e5e494499b9a3915fe3404b507'}`,
      accounts: [process.env.RINKEBY_PRIVKEY || '798c4076c7726aad33ccaab054862a90310ad3e60bed7460681edae4431a2c1c'],
    },
  },
  mocha: {
    timeout: "900s"
  },
} 

export default config