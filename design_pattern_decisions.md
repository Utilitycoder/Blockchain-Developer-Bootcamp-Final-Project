# Design pattern decisions

The following design patterns were implemented in [[UtilityMarketplace.sol](https://github.com/Utilitycoder/blockchain-developer-bootcamp-final-project/blob/main/contracts/UtilityMarketplace.sol) and [UtilityNFT.sol](https://github.com/Utilitycoder/blockchain-developer-bootcamp-final-project/blob/main/contracts/UtilityNFT.sol) contracts:


## Inter-Contract Execution
- The **UtilityMarketplace** contract interacts with **UtilityNFT** contract to transfer ERC-721 tokens from the seller to the buyer through the marketplace contract.

- The **UtilityNFT** contract interacts with [OpenZepplin ERC721URIStorage](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol) for _safeMint(), _setTokenURI() and setApprovalForAll() functions for creating ERC-721 tokens.


## Inheritance and Interfaces

-  The **UtilityNFT** contract inherites [Base64 library](https://github.com/Utilitycoder/blockchain-developer-bootcamp-final-project/blob/main/contracts/libraries/Base64.sol) to encode the tokenURI of the minted NFT.

-  The **UtilityMarketplace** contract inherites [OpenZepplin Counters library](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol) for tracking the itemId of the created marketplace item.

-  The **UtilityNFT** contract inherites [OpenZepplin Counters library](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol) for tracking the tokenId of minted NFT.