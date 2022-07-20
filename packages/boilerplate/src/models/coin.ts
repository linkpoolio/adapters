export interface ICoin {
  symbol: string
  name: string
}

const transformer = {
  coinmarketcap: (coin): ICoin => ({
    symbol: coin.symbol,
    name: coin.name,
  }),
  coingecko: (coin): ICoin => ({
    symbol: coin.symbol,
    name: coin.name,
  }),
}

const Single = (coin: any, provider): ICoin => transformer[provider](coin)

const List = (data: any, provider): ICoin[] => data.map((coin: any) => Single(coin, provider))

export default {
  Single,
  List,
}
