# Final project - Utility NFT Marketplace

## Table of Contents:
  - [Project Description](#project-description)
  - [Screencast link](#screencast-link)
  - [Deployed Website url](#deployed-website-url)
  - [Public Ethereum wallet](#public-ethereum-wallet)
  - [Workflow](#workflow)
  - [Related docs](#related-docs)
  - [Directory structure](#directory-structure)
  - [Clone, Install and Build steps](#clone-install-and-build-steps)
    - [Prerequisites](#prerequisites)
    - [Cloning and installing dependencies](#cloning-and-installing-dependencies)
    - [Testing Contracts](#testing-contracts)
    - [Running the frontend](#running-the-frontend)
    - [Deploying and running against a local instance](#deploying-and-running-against-a-local-instance)
  - [Troubleshooting](#troubleshooting)
  - [TODO](#todo)

## Project Description

**Utility NFT Marketplace** is a marketplace where users can buy, sell and mint **Unique images**, which are ERC-721 standard (NFT) tokens.

The NFT images consist of 3 main characteristics, **Weapon, Area of Control, and Rank**.

- **Weapon -** Sword, Spear, Shield, Hammer, Saber, Axe, Bow, Staff, Wand, Fist, Dagger, Scythe, Mace, Blade, Katana
- **Area of Control -** Fire, Wind, Wave, Earth, Light, Shadow, Thunder, Space, Time, Gravity, Ice
- **Rank -** Lord, King, Emperor, Venerable, Ancestor, Saint, God

## Screencast link
<<<<<<< HEAD
https://youtu.be/ddcQU3dwEe8
=======
https://www.loom.com/share/e80b24c920084a598c946a7e7bf057a2
>>>>>>> f16e92d1107c6649490ed82f24dcc4e783e7eb51

## Deployed Website url

https://utilitynftplace.vercel.app/


## Public Ethereum wallet
`0x78C267869e588823F6D1660EBE6e286deE297f0a`


## Workflow

1. User load the website address and connect their wallet, which is set to rinkeby network
2. After users have connected to the dApp, they can:
   
    1. **Mint NFT**
      - User goes to mint page and click on the **Mint NFT** button.
      - Metamask pops up and asks user to confirm the transaction.
      - After the transaction is successfully processed the user can see the minted character.
      - The minted character is also added to **My NFT** page under **Minted NFT** section. The user can see NFTs they minted. 

   2. **Buy NFTs**
      - The homepage consist of NFTs listed by other users. So user can click on any NFT they want to buy.
      - User will be redirected to the **BuyNFT** page which shows the price and other details about the NFT they clicked in step 1 .
      - Click on the **Buy** button to buy the NFT.
      - Metamask pops up and asks user to confirm the transaction for the price of the NFT.
      - After the transaction is successfully processed, user is redirected to the **My NFT** page.
      - The bought NFT is displayed under the **NFT Bought From Marketplace** section

   3. **Sell NFTs**
      - Go to the **My NFT** page and click on the **Sell** button under the minted NFT which user want to sell.
      - User will be redirected to the **SellNFT** page where user can enter the price they want to sell their NFT.
      - After entering the desired price, click on the **Sell** button to list the NFT in the market place.
      - Metamask pops up and asks to confirm the transaction for the listing price.
      - After the transaction is successfully processed user is redirected to the **Home** page.
      - The NFT will be listed in the marketplace to be bought for the price entered by the user.

## Related docs
- [design_pattern_decisions.md](https://github.com/Utilitycoder/blockchain-developer-bootcamp-final-project/blob/main/design_pattern_decisions.md)
- [deployed_address.txt](https://github.com/Utilitycoder/blockchain-developer-bootcamp-final-project/blob/main/deployed_address.txt)
- [avoiding_common_attacks.md](https://github.com/Utilitycoder/blockchain-developer-bootcamp-final-project/blob/main/avoiding_common_attacks.md)

## Directory structure

```
blockchain-developer-bootcamp-final-project
 ┣ client
 ┃ ┣ pages
 ┃ ┃ ┣ _app.js
 ┃ ┃ ┣ buynft.js
 ┃ ┃ ┣ index.js
 ┃ ┃ ┣ mint.js
 ┃ ┃ ┣ mynft.js
 ┃ ┃ ┗ sellnft.js
 ┃ ┣ public
 ┃ ┃ ┣ favicon.ico
 ┃ ┃ ┗ vercel.svg
 ┃ ┣ utils
 ┃ ┃ ┣ UtilityMarketplace.json
 ┃ ┃ ┗ UtilityNFT.json
 ┃ ┣ .gitignore
 ┃ ┣ README.md
 ┃ ┣ config.js
 ┃ ┣ package-lock.json
 ┃ ┣ package.json
 ┃ ┣ postcss.config.js
 ┃ ┗ tailwind.config.js
 ┣ contracts
 ┃ ┣ libraries
 ┃ ┃ ┗ Base64.sol
 ┃ ┣ UtilityMarketplace.sol
 ┃ ┗ UtilityNFT.sol
 ┣ scripts
 ┃ ┣ deploy.js
 ┃ ┗ run.js
 ┣ test
 ┃ ┗ UtilityTest.js
 ┣.DS_Store
 ┣.gitattributes
 ┣.gitignore
 ┣ README.md
 ┣ avoiding_common_attacks.md
 ┣ deployed_address.txt
 ┣ design_pattern_decisions.md
 ┣ final-project-checklist.txt
 ┣ hardhat.config.js
 ┣ package-lock.json
 ┗ package.json
```

## Clone, Install and Build steps

### What is required:

1. [Git](https://git-scm.com/)
2. [Node JS](https://nodejs.org/en/) (everything was installed and tested under v15.12.0)
3. Test Ether on the Rinkeby network.
4. A Browser with the [MetaMask extension](https://metamask.io/) installed.


<br>

### Cloning and installing dependencies

1. Clone my project repository and run it on your local machine

```
 git clone https://github.com/Utilitycoder/blockchain-developer-bootcamp-final-project.git

 cd blockchain-developer-bootcamp-final-project
```

2. Installing dependencies

- For contracts -
  ```
  npm install
  ```
- For client -
  ```
  cd client
  npm install
  ```

### Testing Smart Contracts

For testing contracts, run command:

```
npx hardhat test
```

### Running the frontend

For running frontend locally run command:

```
cd client
npm run dev
```

### Deploying and running against a local instance

1. For deploying and running the dApp against a local instance run commands:

```
npx hardhat node
```

2. This should create a local network with 19 accounts. Keep it running, and in another terminal run:

```
npx hardhat run scripts/deploy.js --network localhost
```

3. When the deployment is complete, the CLI should print out the addresses of the contracts that were deployed:

```
nftMarket contract deployed to: 'UtilityMarketplace contract address'

nft contract deployed to: 'UtilityNFT contract address'
```

4. Copy these addresses and paste them in the [**config.js**](https://github.com/Utilitycoder/blockchain-developer-bootcamp-final-project/blob/main/hardhat.config.js) file inside the client floder, in place of current addresses.
```
export const nftMarketAddress = 'UtilityNFT contract address'

export const nftContractAddress = 'UtilityMarketplace contract address'
```

5. For importing account to metamask

   1. Import account using private key from one of the accounts that were logged on running `npx hardhat node`
   2. Create a custom network (if not already there) pointing to http://127.0.0.1:8545 with **chainId 1337**
   3. Switch to this network and connect it to the dApp and reload it.
   6. For better testing of the transfer of tokens and transactions import at least 2 accounts*_
   7. For changing chainId and other possible errors see [Troubleshooting](#troubleshooting)

6. Now run the frontend locally in another terminal using command:

```
cd client
npm run dev
```
After this you can run and test the dApp locally in your web browser.

### Environment variables (you don't need this if you're running the project locally)
```
RINKEBY_URL =
PRIVATE_KEY =
```

## Troubleshooting
### For custom chainId
The default chainId for network localhost8545 is 1337. To change the chainId, the user should follow these steps :
1. Change the chainId in networks under hardhat in [hardhat.config.js](https://github.com/Utilitycoder/blockchain-developer-bootcamp-final-project/blob/main/hardhat.config.js) file.
```
hardhat: {
  chainId: 1337,
}
```
2. After this the user needs to change the devChainId in the [_app.js](https://github.com/Utilitycoder/blockchain-developer-bootcamp-final-project/blob/main/client/pages/_app.js) file on line 61 and 86 under the functions **connectWallet()** and **checkCorrectNetwork()** respectively.

```
const devChainId = 1337
```
  
### For 'Nonce too High' Error 
While testing the dApp on against a local instance, if you get the **Nonce too high** error in the hardhat node terminal or the UI does not show processing your transaction after confirming a transaction, try **resetting your metamask account**. This can be done by going to **Settings > Advanced > Reset Account** in Metamask.

## TODO
- Using oracle for on chain randomness in generating NFTs
- Allowing Users to mint NFT from their local machine
- Letting users list NFTs that are minted from other places
- Improve the look and feel of the User Interface.
- Add other trendy features that can hook users to the service the project offers.
- Switching the account in Metamask is not handled on the website. Needs to be reloaded manually.

