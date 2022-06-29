export const enum PricingAsset {
  ETH = 'ETH',
  USD = 'USD',
}

export const enum Format {
  PRICE = 0,
  DATE_AND_PRICE = 1,
}

export const PricingAssetFactor: Map<string, number> = new Map([
  [PricingAsset.ETH, 10 ** 14],
  [PricingAsset.USD, 10 ** 11],
])

export const chainId: ReadonlyMap<number, string> = new Map([[1, 'ETHEREUM']])
