//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


/// @title UtilityMarketplace
/// @author Lawal Abubakar Babatunde
/// @dev This contract is used to create a marketplace for the Eternal NFTs.
/// @dev Inherits ReentrancyGuard which is deployed on createEternalMarketItem() and createItemSale() functions
/// @dev Uses Counters library for tracking itemID for the marketplace items created.
/// @dev Uses Counters library for tracking number of items Sold.
contract UtilityMarketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemNo;
    Counters.Counter private _itemSold;

    address payable owner;
    uint256 initialPrice = 0.02 ether;

    constructor() {
        owner = payable(msg.sender);
    }

    struct Item {
        uint256 itemNo;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => Item) private idToItem;

    event ItemCreated (
        uint256 indexed itemNo,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    /// @notice Returns the initial price for listing an item on the marketplace
    /// @dev 0.02 ether is what I chose, you can use whatever you want.
    /// @return uint256 The listing price
    function getInitialPrice() public view returns(uint256) {
        return initialPrice;
    }

    /// @notice Creates an item on the marketplace
    /// @dev transfers the token from owner to the marketplace contract
    /// @param nftContract Address of the NFT contract
    /// @param tokenId Token ID of the NFT
    /// @param price The amount the seller wants to sell the NFT
    function createUtilityMarketItem(address nftContract , uint256 tokenId, 
        uint256 price) public payable nonReentrant {
            
        require(price > 0, "Price must be greater than 0");
        require(msg.value == initialPrice, "Price must be equal to listing price");

        uint256 itemNo = _itemNo.current();

        idToItem[itemNo] = Item(
            itemNo,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false
        );

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        _itemNo.increment();

        emit ItemCreated(
            itemNo,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );
    }

    /// @notice Creates an item sale on the marketplace
    /// @dev Transfers the token from the marketplace contract to the buyer
    /// @dev Transfer eth from the buyer to the seller of the token through the marketplace contract  
    /// @param nftContract Address of the NFT contract
    /// @param itemNo ID of the item to be sold
    function createItemSale(
        address nftContract, 
        uint256 itemNo
        ) public payable nonReentrant {

        uint256 tokenId = idToItem[itemNo].tokenId;
        uint256 price = idToItem[itemNo].price;

        require(msg.value == price, "Please make sure the amount to be paid is equal to the listed price");

        (bool success, ) = idToItem[itemNo].seller.call{value: msg.value}("");
        require(success, "Transfer failed");

        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

        idToItem[itemNo].owner = payable(msg.sender);
        idToItem[itemNo].sold = true;
        _itemSold.increment();

        payable(owner).transfer(initialPrice);
    }

    /// @notice Returns the details of all the unsold marketplace items
    /// @return Item[] All the unsold marketplace items

    function fetchItems() public view returns(Item[] memory) {
        uint256 itemCount = _itemNo.current();
        uint256 unsoldItemCount = _itemNo.current() - _itemSold.current();
        uint256 currentIndex = 0;

        Item[] memory items = new Item[](unsoldItemCount);
        
        for(uint256 i = 0; i < itemCount; i++) {
            if (idToItem[i].owner == address(0)) {
                uint256 currentId = i;
                Item storage currentItem = idToItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }

    /// @notice Returns the details of the unSold marketplace items by ItemId
    /// @param itemId ID of the item to be fetched
    /// @return Item The unsold marketplace item
    function fetchItemById(uint256 itemId) public view returns(Item memory) {
        return idToItem[itemId];
    }

    /// @notice Returns the details of the marketplace items owned by the owner
    /// @return Item[] All the marketplace items owned by the owner
    function fetchMyItems() public view returns(Item[] memory) {
        uint totalItemCount = _itemNo.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToItem[i].owner == msg.sender) {
                itemCount += 1;
            }
        }

        Item[] memory items = new Item[](itemCount);

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToItem[i].owner == msg.sender) {
                uint currentId = i;
                Item storage currentItem = idToItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }

    ///@dev receive() and fallback() functions to allow the contract to receive ETH and data  
    receive() external payable {
    }

    fallback() external payable {
    }
}