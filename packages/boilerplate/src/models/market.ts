import { ICoin } from './coin'

export interface IMarket extends ICoin {
  price: number
  marketCap: number
  marketCapRank: number
  supply: number
  circulatingSupply: number
}

const transformer = {
  coinmarketcap: (market): IMarket => {
    const currency = market.quote[Object.keys(market.quote)[0]]
    return {
      symbol: market.symbol.toLowerCase(),
      name: market.name,
      price: Math.round(currency.price),
      marketCap: Math.round(currency.market_cap),
      marketCapRank: market.cmc_rank,
      supply: market.max_supply,
      circulatingSupply: market.circulating_supply,
    }
  },
  coingecko: (market): IMarket => {
    return {
      symbol: market.symbol,
      name: market.name,
      price: market.current_price,
      marketCap: market.market_cap,
      marketCapRank: market.market_cap_rank,
      supply: market.total_supply,
      circulatingSupply: market.circulating_supply,
    }
  },
}

const Single = (market, provider): IMarket => transformer[provider](market)

const List = (data: any, provider): IMarket[] => data.map((market: any) => Single(market, provider))

export default {
  Single,
  List,
}
