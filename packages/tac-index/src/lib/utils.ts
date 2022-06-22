/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Currency } from './const'
import { RouteData } from './types'

export const filterPrice = (currency: Currency, routeData: RouteData): number => {
  if (currency === Currency.EURO) {
    return Number(routeData.euro) as number
  } else if (currency === Currency.USD) {
    return Number(routeData.usd) as number
  } else if (currency === Currency.LOCAL) {
    return Number(routeData.local) as number
  } else {
    throw new Error(
      `Route: ${routeData} does not have the price for the provided currency: ${currency}`,
    )
  }
}
