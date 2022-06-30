import { FormattedPrices, Prices } from './types'
import { utils } from 'ethers'

export const formatPrices = (prices: Prices): FormattedPrices => {
  if (prices.length === 0) return { firstHalfPrice: 0, secondHalfPrice: 0 }
  if (prices.length === 1) return { firstHalfPrice: 0, secondHalfPrice: prices[0][3] * 10e15 }
  return {
    firstHalfPrice: prices[0][3] * 10e15,
    secondHalfPrice: prices[prices.length - 1][3] * 10e15,
  }
}

export const encodePrices = (formattedPrices: FormattedPrices): string => {
  return utils.solidityPack(
    ['uint128', 'uint128'],
    [formattedPrices.firstHalfPrice.toString(), formattedPrices.secondHalfPrice.toString()],
  )
}
