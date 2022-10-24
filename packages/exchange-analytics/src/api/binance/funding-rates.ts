import { util } from '@chainlink/ea-bootstrap'

import FundingRate from '../../models/funding-rate'
import type { IFundingRate } from '../../models/funding-rate'
import { Provider } from '../constants'

export default (fetch) => ({
  get: async ({ asset }): Promise<IFundingRate> => {
    const url = util.buildUrlPath(`premiumIndex?symbol=:assetUSDT`, {
      asset,
    })
    const response = await fetch({ url })
    return FundingRate.Single(response.data, Provider.BINANCE)
  },
})
