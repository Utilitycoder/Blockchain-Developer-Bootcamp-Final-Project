async function main() {
	const NFTMarketplace = await hre.ethers.getContractFactory('UtilityMarketplace')
	const nftMarketplace = await NFTMarketplace.deploy()
	await nftMarketplace.deployed()
	console.log('nftMarketplace deployed to:', nftMarketplace.address)

	const NFT = await hre.ethers.getContractFactory('UtilityNFT')
	const nft = await NFT.deploy(nftMarketplace.address)
	await nft.deployed()
	console.log('nft deployed to:', nft.address)
}

const runMain = async () => {
	try {
		await main()
		process.exit(0)
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
}

runMain()
