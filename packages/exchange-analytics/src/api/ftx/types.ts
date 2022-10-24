export interface FtxFundingRatesGetPayload {
  success: boolean
  result: {
    volume: number
    nextFundingRate: number
    nextFundingTime: string
    openInterest: number
  }
}
