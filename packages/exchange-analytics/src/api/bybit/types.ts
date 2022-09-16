export interface BybitFundingRatesGetPayload {
  ret_code: number
  ret_msg: string
  ext_code: string
  ext_info: string
  result: {
    symbol: string
    funding_rate: string
    funding_rate_timestamp: number
  }
  time_now: string
}
