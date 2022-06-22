export const nftCollection: ReadonlyMap<string, string> = new Map([
  ['azuki', '0xED5AF388653567Af2F388E6224dC7C4b3241C544'], // Azuki (AZUKI)
  ['bayc', '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D'], // Bored Ape Yacht Club (BAYC)
  ['coolcats', '0x1A92f7381B9F03921564a437210bB9396471050C'], // Cool Cats NFT (COOL)
  ['cryptopunks', '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB'], // CryptoPunks (C)
  ['doodles', '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e'], // Doodles (DOODLE)
  ['mayc', '0x60E4d786628Fea6478F785A6d7e704777c86a7c6'], // Mutant Ape Yacht Club (MAYC)
])

export const estimateNftCollection: ReadonlyMap<string, string> = new Map(nftCollection.entries())

export const floorPriceNftCollection: ReadonlyMap<string, string> = new Map(
  [...nftCollection.entries()].filter(([collection]) => !['cryptopunks'].includes(collection)),
)

export const enum PricingAsset {
  ETH = 'ETH',
  USD = 'USD',
}

export const PricingAssetFactor: Map<string, number> = new Map([
  [PricingAsset.ETH, 10 ** 14],
  [PricingAsset.USD, 10 ** 11],
])

export const chainId: ReadonlyMap<number, string> = new Map([[1, 'ETHEREUM']])
