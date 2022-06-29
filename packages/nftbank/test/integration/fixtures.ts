import nock from 'nock'

import { DEFAULT_BASE_URL } from '../../src/config'

export const mockEstimateResponseError = (tokenId: number, chainId: string): nock => {
  return nock(DEFAULT_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'x-api-key': process.env.API_KEY,
    },
  })
    .get(
      `/estimates-v2/estimates/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/${tokenId}?chainId=${chainId}`,
    )
    .reply(500, {})
}

export const mockEstimateSuccessResponse = (tokenId: number, chainId: string): nock => {
  return nock(DEFAULT_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'x-api-key': process.env.API_KEY,
    },
  })
    .get(
      `/estimates-v2/estimates/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/${tokenId}?chainId=${chainId}`,
    )
    .reply(200, {
      data: [
        {
          _id: '1',
          estimate: [
            {
              currency_symbol: 'ETH',
              estimate_price: 100,
            },
            {
              currency_symbol: 'USD',
              estimate_price: 200,
            },
          ],
        },
      ],
    })
}

export const mockFloorPriceResponseError = (chainId: string): nock => {
  return nock(DEFAULT_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'x-api-key': process.env.API_KEY,
    },
  })
    .get(`/estimates-v2/floor_price/0xed5af388653567af2f388e6224dc7c4b3241c544?chainId=${chainId}`)
    .reply(500, {})
}

export const mockFloorPriceSuccessResponse = (chainId: string): nock => {
  return nock(DEFAULT_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'x-api-key': process.env.API_KEY,
    },
  })
    .get(`/estimates-v2/floor_price/0xed5af388653567af2f388e6224dc7c4b3241c544?chainId=${chainId}`)
    .reply(200, {
      data: [
        {
          _id: '1',
          estimated_at: 'Wed, 29 Jun 2022 04:00:00 GMT',

          floor_price: [
            {
              currency_symbol: 'ETH',
              floor_price: 12.0,
            },
            {
              currency_symbol: 'USD',
              floor_price: 23951.237809862814,
            },
          ],
        },
      ],
    })
}
