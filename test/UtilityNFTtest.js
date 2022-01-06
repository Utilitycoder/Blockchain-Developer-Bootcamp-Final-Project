const { assert } = require('chai')

describe('UtilityNFT Contract', async () => {
	let nft
	let market
	let marketContractAddress
	let nftContractAddress
	let tokenId

	// Deploys the UtilityNFT contract and the UtilityMarket contract before each test
	beforeEach('Setup Contract', async () => {
		const Market = await ethers.getContractFactory('UtilityMarketplace')
		market = await Market.deploy()
		await market.deployed()
		marketContractAddress = await market.address

		const UtilityNFT = await ethers.getContractFactory('UtilityNFT')
		nft = await UtilityNFT.deploy(marketContractAddress)
		await nft.deployed()
		nftContractAddress = await nft.address
	})

	// Tests address for the UtilityNFT contract
	it('Should have an address', async () => {
		assert.notEqual(nftContractAddress, 0x0)
		assert.notEqual(nftContractAddress, '')
		assert.notEqual(nftContractAddress, null)
		assert.notEqual(nftContractAddress, undefined)
	})

	// Tests name for the token of UtilityNFT contract
	it('Should have a name', async () => {
		// Returns the name of the token
		const name = await nft.collectionName()

		assert.equal(name, 'UtilityNFT')
	})

	// Tests symbol for the token of UtilityNFT contract
	it('Should have a symbol', async () => {
		// Returns the symbol of the token
		const symbol = await nft.collectionSymbol()

		assert.equal(symbol, 'UNFT')
	})

	// Tests for NFT minting function of UtilityNFT contract using tokenID of the minted NFT
	it('Should be able to mint NFT', async () => {
		// Mints a NFT
		let txn = await nft.createUtilityNFT()
		let tx = await txn.wait()

		// tokenID of the minted NFT
		let event = tx.events[0]
		let value = event.args[2]
		tokenId = value.toNumber()

		assert.equal(tokenId, 0)

		// Mints another NFT
		txn = await nft.createUtilityNFT()
		tx = await txn.wait()

		// tokenID of the minted NFT
		event = tx.events[0]
		value = event.args[2]
		tokenId = value.toNumber()

		assert.equal(tokenId, 1)
	})

	// Test for number of NFTs owned by an address
	it('Should be able to return number of NFTs owned by and address', async () => {
		// Mints a NFT
		let txn = await nft.createUtilityNFT()
		await txn.wait()

		// Returns the array of NFTs owned by the address
		let tokensOwned = await nft.getMyUtilityNFT()

		assert.equal(tokensOwned.length, 1)
	})
})

describe('EternalMarketpalce Contract', function () {
	let nft
	let market
	let marketContractAddress
	let nftContractAddress
	let listingPrice
	let auctionPrice

	// Deploys the UtilityNFT contract and the UtilityMarket contract before each test
	beforeEach('Marketplace', async () => {
		const Market = await ethers.getContractFactory('UtilityMarketplace')
		market = await Market.deploy()
		await market.deployed()
		marketContractAddress = await market.address

		const UtilityNFT = await ethers.getContractFactory('UtilityNFT')
		nft = await UtilityNFT.deploy(marketContractAddress)
		await nft.deployed()
		nftContractAddress = await nft.address

		listingPrice = await market.getInitialPrice()
		listingPrice = listingPrice.toString()

		auctionPrice = ethers.utils.parseUnits('1', 'ether')
	})

	// Test for creation of an Utility Marketplace item
	it('Should be able to create an NFT Item', async () => {
		// Mints a NFT
		await nft.createUtilityNFT()

		// Puts the NFT up for sale in the Utility marketplace
		await market.createUtilityMarketItem(nftContractAddress, 0, auctionPrice, {
			value: listingPrice,
		})

		// Fetches the remaining unsold marketplace items
		let items = await market.fetchItems()

		assert.equal(items.length, 1)
	})

	// Test for creation and sale of an Marketplace item
	it('Should be able to execute Item Sale', async () => {
		// Mints 2 NFTs
		await nft.createUtilityNFT()
		await nft.createUtilityNFT()

		// Puts the first NFT up for sale in the Utility marketplace
		await market.createUtilityMarketItem(nftContractAddress, 0, auctionPrice, {
			value: listingPrice,
		})

		// Puts the second NFT up for sale in the Utility marketplace
		await market.createUtilityMarketItem(nftContractAddress, 1, auctionPrice, {
			value: listingPrice,
		})

		const [_, buyerAddress] = await ethers.getSigners()

		// Creates a sale for the first NFT and transfers it from the owner to the buyer through the marketplace contract
		await market
			.connect(buyerAddress)
			.createItemSale(nftContractAddress, 1, { value: auctionPrice })

		// Fetches the remaining unsold marketplace items
		// Returns one as one of the two NFT minted is sold
		let items = await market.fetchItems()

		assert.equal(items.length, 1)
	})

	// Test for fetchng details of an Marketplace item using its itemId
	it('Should be able to get an item by its tokenId', async () => {
		// Mints 2 NFTs
		await nft.createUtilityNFT()
		await nft.createUtilityNFT()

		// Puts the first NFT up for sale in the marketplace
		await market.createUtilityMarketItem(nftContractAddress, 0, auctionPrice, {
			value: listingPrice,
		})

		// Puts the second NFT up for sale in the marketplace
		await market.createUtilityMarketItem(nftContractAddress, 1, auctionPrice, {
			value: listingPrice,
		})

		// Fetches the details of first marketplace item by its itemId
		let item = await market.fetchItemById('1')

		assert.equal(item.itemNo, 1)
	})

	// Test for fetchng details of all created Marketplace items
	it('Should be able to get an item by its tokenId', async () => {
		// Mints 2 NFTs
		await nft.createUtilityNFT()
		await nft.createUtilityNFT()

		// Puts the first NFT up for sale in the marketplace
		await market.createUtilityMarketItem(nftContractAddress, 0, auctionPrice, {
			value: listingPrice,
		})

		// Puts the second NFT up for sale in the marketplace
		await market.createUtilityMarketItem(nftContractAddress, 1, auctionPrice, {
			value: listingPrice,
		})

		// Fetches the details of all unsold marketplace items
		// Returs 2 as two items are created and none is sold
		let item = await market.fetchItems()

		assert.equal(item.length, 2)
	})
})