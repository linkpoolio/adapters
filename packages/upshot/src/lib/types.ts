export interface DataFloorPrice {
  stats: Stat[]
}

export interface Stat {
  floor: string
  marketCap: string
  timestamp: number
}

export interface StatisticsResult {
  floorPrice: number
  marketCap: number
  statistics: string
}

export interface ResponseSchemaStatistics {
  data: DataFloorPrice
  status: boolean
  result?: StatisticsResult
}

export interface DataAssetPrice {
  currentPricing: CurrentPricing
}

export interface CurrentPricing {
  estimatedPrice: string
}

export interface ResponseSchemaAssetPrice {
  data: DataAssetPrice[]
  status: boolean
  result?: number
}
