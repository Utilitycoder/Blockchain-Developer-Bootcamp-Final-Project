require("@nomiclabs/hardhat-waffle");
require('dotenv').config({path:/Blockchain-Developer-Bootcamp-Final-Projects/.env});

module.exports = {
  solidity: "0.8.11",
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};