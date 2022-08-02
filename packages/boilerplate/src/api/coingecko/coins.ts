import Coin, { ICoin } from '../../models/coin'
import Market, { IMarket } from '../../models/market'
import { ICoins } from '../base'

const provider = 'coingecko'

export default (fetch): ICoins => ({
  list: async (): Promise<ICoin[]> => {
    const response = await fetch({ url: 'coins/list' })
    const data = response?.data?.length ? response.data : []
    return Coin.List(data, provider)
  },

  market: async ({ id, currency }): Promise<IMarket[]> => {
    const response = await fetch({
      url: 'coins/markets',
      params: {
        ids: id,
        vs_currency: currency,
      },
    })
    const data = response?.data?.length ? response.data : []
    return Market.List(data, provider)
  },
})
