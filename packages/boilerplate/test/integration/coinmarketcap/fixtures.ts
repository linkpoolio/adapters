import nock from 'nock'

const list = {
  data: [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      slug: 'bitcoin',
      rank: 1,
      is_active: 1,
      first_historical_data: '2013-04-28T18:47:21.000Z',
      last_historical_data: '2022-07-15T01:29:00.000Z',
      platform: null,
    },
    {
      id: 2,
      name: 'Litecoin',
      symbol: 'LTC',
      slug: 'litecoin',
      rank: 20,
      is_active: 1,
      first_historical_data: '2013-04-28T18:47:22.000Z',
      last_historical_data: '2022-07-15T01:29:00.000Z',
      platform: null,
    },
    {
      id: 3,
      name: 'Namecoin',
      symbol: 'NMC',
      slug: 'namecoin',
      rank: 620,
      is_active: 1,
      first_historical_data: '2013-04-28T18:47:22.000Z',
      last_historical_data: '2022-07-15T01:29:00.000Z',
      platform: null,
    },
  ],
}

const single = {
  '1': {
    id: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    slug: 'bitcoin',
    num_market_pairs: 9620,
    date_added: '2013-04-28T00:00:00.000Z',
    tags: [
      'mineable',
      'pow',
      'sha-256',
      'store-of-value',
      'state-channel',
      'coinbase-ventures-portfolio',
      'three-arrows-capital-portfolio',
      'polychain-capital-portfolio',
      'binance-labs-portfolio',
      'blockchain-capital-portfolio',
      'boostvc-portfolio',
      'cms-holdings-portfolio',
      'dcg-portfolio',
      'dragonfly-capital-portfolio',
      'electric-capital-portfolio',
      'fabric-ventures-portfolio',
      'framework-ventures-portfolio',
      'galaxy-digital-portfolio',
      'huobi-capital-portfolio',
      'alameda-research-portfolio',
      'a16z-portfolio',
      '1confirmation-portfolio',
      'winklevoss-capital-portfolio',
      'usv-portfolio',
      'placeholder-ventures-portfolio',
      'pantera-capital-portfolio',
      'multicoin-capital-portfolio',
      'paradigm-portfolio',
    ],
    max_supply: 21000000,
    circulating_supply: 19093768,
    total_supply: 19093768,
    is_active: 1,
    platform: null,
    cmc_rank: 1,
    is_fiat: 0,
    self_reported_circulating_supply: null,
    self_reported_market_cap: null,
    tvl_ratio: null,
    last_updated: '2022-07-15T01:29:00.000Z',
    quote: {
      USD: {
        price: 20412.81959992469,
        volume_24h: 30905114146.284775,
        volume_change_24h: -8.8563,
        percent_change_1h: -0.24239391,
        percent_change_24h: 0.6514273,
        percent_change_7d: -6.98162695,
        percent_change_30d: -7.17338191,
        percent_change_60d: -33.92945424,
        percent_change_90d: -49.74325616,
        market_cap: 389757641666.8148,
        market_cap_dominance: 42.4053,
        fully_diluted_market_cap: 428669211598.42,
        tvl: null,
        last_updated: '2022-07-15T01:29:00.000Z',
      },
    },
  },
}

// TODO: declare api baseUrls for all providers in easily exportable object
const url = 'https://pro-api.coinmarketcap.com/v1'

export const mockCoinSuccess = (): nock => {
  return nock(url, {
    encodedQueryParams: true,
    reqheaders: {
      'x-cmc_pro_api_key': process.env.API_KEY,
    },
  })
    .get(`/cryptocurrency/map`)
    .reply(200, {
      data: list,
    })
}

export const mockMarketSuccess = (id: string, currency: string): nock => {
  return nock(url, {
    encodedQueryParams: true,
    reqheaders: {
      'x-cmc_pro_api_key': process.env.API_KEY,
    },
  })
    .get(`/cryptocurrency/quotes/latest?slug=${id}&convert=${currency}`)
    .reply(200, {
      data: single,
    })
}
