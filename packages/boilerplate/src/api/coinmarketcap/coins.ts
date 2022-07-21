import { ICoins } from '../base'
import Coin, { ICoin } from '../../models/coin'
import Market, { IMarket } from '../../models/market'

const provider = 'coinmarketcap'

export default (fetch): ICoins => ({
  list: async (): Promise<ICoin[]> => {
    const response = await fetch({ url: 'cryptocurrency/map' })
    const data = response?.data?.data.length ? response.data.data : []
    return Coin.List(data, provider)
  },

  market: async ({ id, currency }): Promise<IMarket[]> => {
    const response = await fetch({
      url: 'cryptocurrency/quotes/latest',
      params: {
        slug: id,
        convert: currency,
      },
    })
    const raw = response?.data?.data ? response.data.data : {}
    const data = Object.keys(raw).map((key) => raw[key])
    return Market.List(data, provider)
  },
})
