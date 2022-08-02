import { errors } from '@linkpool/shared'
import { utils } from 'ethers'

import type { Stat, StatisticsResult } from './types'

export const encodeStatistics = (floorPrice: string, marketCap: string): string => {
  return utils.solidityPack(['uint128', 'uint128'], [floorPrice, marketCap])
}

export const encodeTimestampWithFloor = (date: number, price: string): string => {
  return utils.solidityPack(['uint128', 'uint128'], [date.toString(), price])
}

export const parseResult = (rawStatistics: Stat): StatisticsResult => {
  const floorPrice =
    rawStatistics.floor ??
    errors.throwError(`Missing 'floor' in statistics: ${JSON.stringify(rawStatistics)}`)

  const marketCap =
    rawStatistics.marketCap ??
    errors.throwError(`Missing 'marketCap' in statistics: ${JSON.stringify(rawStatistics)}`)

  const timestamp =
    rawStatistics.timestamp ??
    errors.throwError(`Missing 'timestamp' in statistics: ${JSON.stringify(rawStatistics)}`)

  const formattedStatistics = {
    floorPrice: Number(floorPrice),
    marketCap: Number(marketCap),
    statistics: encodeStatistics(floorPrice, marketCap),
    dateAndFloor: encodeTimestampWithFloor(timestamp, floorPrice),
  }

  return formattedStatistics
}
