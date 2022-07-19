import nock from 'nock'

// TODO: declare api baseUrls for all providers in easily exportable object
const url = 'https://pro-api.coingecko.com/api/v3'

const list = [
  {
    id: '01coin',
    symbol: 'zoc',
    name: '01coin',
  },
  {
    id: '0-5x-long-algorand-token',
    symbol: 'algohalf',
    name: '0.5X Long Algorand',
  },
  {
    id: '0-5x-long-altcoin-index-token',
    symbol: 'althalf',
    name: '0.5X Long Altcoin Index',
  },
]

const single = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
    current_price: 20430,
    market_cap: 389669208366,
    market_cap_rank: 1,
    fully_diluted_valuation: 428571231273,
    total_volume: 28441445539,
    high_24h: 20752,
    low_24h: 19707.7,
    price_change_24h: 190.53,
    price_change_percentage_24h: 0.94138,
    market_cap_change_24h: 1496312087,
    market_cap_change_percentage_24h: 0.38548,
    circulating_supply: 19093800.0,
    total_supply: 21000000.0,
    max_supply: 21000000.0,
    ath: 69045,
    ath_change_percentage: -70.45298,
    ath_date: '2021-11-10T14:24:11.849Z',
    atl: 67.81,
    atl_change_percentage: 29985.49762,
    atl_date: '2013-07-06T00:00:00.000Z',
    roi: null,
    last_updated: '2022-07-15T01:38:00.323Z',
  },
]

export const mockCoinSuccess = (): nock => {
  return nock(url).get(`/coins/list?x_cg_pro_api_key=${process.env.API_KEY}`).reply(200, {
    data: list,
  })
}

export const mockMarketSuccess = (id: string, currency: string): nock => {
  return nock(url)
    .get(`/coins/markets?x_cg_pro_api_key=${process.env.API_KEY}&ids=${id}&vs_currency=${currency}`)
    .reply(200, {
      data: single,
    })
}
