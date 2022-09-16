export interface BinanceFundingRatesGetPayload {
  symbol: string
  markPrice: string
  indexPrice: string
  estimatedSettlePrice: string
  lastFundingRate: string
  interestRate: string
  nextFundingTime: number
  time: number
}
