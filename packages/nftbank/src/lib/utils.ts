import { utils } from 'ethers'

import { PricingAsset, PricingAssetFactor } from './const'
import type { AssetEstimate, AssetFloorPrice } from './types'

export const getEstimateFor = (pricingAsset: PricingAsset, estimate: AssetEstimate[]): number => {
  const assetEstimate = estimate.find(
    (assetEstimate) => assetEstimate.currency_symbol === pricingAsset,
  )

  if (!assetEstimate) {
    throw new Error(
      `Asset estimate for 'currency_symbol' ${pricingAsset} not found in: ${JSON.stringify(
        estimate,
      )}`,
    )
  }

  const price = assetEstimate.estimate_price * (PricingAssetFactor.get(pricingAsset) as number)
  if (isNaN(price)) {
    throw new Error(`Price is not a number`)
  }
  return Math.round(price)
}

export const getFloorPriceFor = (
  pricingAsset: PricingAsset,
  floorPrice: AssetFloorPrice[],
): number => {
  const assetFloorPrice = floorPrice.find(
    (assetFloorPrice) => assetFloorPrice.currency_symbol === pricingAsset,
  )

  if (!assetFloorPrice) {
    throw new Error(
      `Asset floor price for 'currency_symbol' ${pricingAsset} not found in: ${JSON.stringify(
        floorPrice,
      )}`,
    )
  }

  const price = assetFloorPrice.floor_price * (PricingAssetFactor.get(pricingAsset) as number)
  if (isNaN(price)) {
    throw new Error(`Price is not a number`)
  }
  return Math.round(price)
}

export const encodePriceWithDate = (date: number, price: number): string => {
  return utils.solidityPack(['uint128', 'uint128'], [date.toString(), price.toString()])
}
