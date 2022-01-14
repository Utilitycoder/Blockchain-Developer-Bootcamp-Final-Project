# Avoiding Common Attacks

The following measures were applied in [UtilityNFT.sol](https://github.com/Utilitycoder/blockchain-developer-bootcamp-final-project/blob/main/contracts/UtilityNFT.sol) and [UtilityMarketplace.sol](https://github.com/Utilitycoder/blockchain-developer-bootcamp-final-project/blob/main/contracts/UtilityMarketplace.sol) contracts to avoid common security pitfalls:


- **Proper setting of visibility for functions**: Functions are specified as being external, public, internal or private to reduce the attack surface of a contract system. - [SWC-100](https://swcregistry.io/docs/SWC-100)


- **Using Specific Compiler Pragma:** Solidity 0.8.3 is used in both UtilityNFT and UtilityMarketplace contracts and not floating pragma. - [SWC-103](https://swcregistry.io/docs/SWC-103) 

- Using [Openzeppelin's ReentrancyGuard](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/security/ReentrancyGuard.sol) in **createUtilityMarketItem** and **createUtilityItemSale** functions in **UtilityMarketplace** contract to safeguard against reentrancy attack. - [SWC-107](https://swcregistry.io/docs/SWC-107) 

- **Proper Use of Require, Assert and Revert:** Using `require` to check the listing price and the amount of eth send by the user to buy or list an item in **UtilityMarketplace** contract.

- Include fallback() and receive() functions in **UtilityMarketplace** contract to receive force-sending of ETH and add the amount to the contract balances.
  



