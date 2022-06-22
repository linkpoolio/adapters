import nock from 'nock'

import { DEFAULT_BASE_URL } from '../../src/config'

export const mockEstimateResponseError = (
  nftCollection: string,
  nftId: number,
  chainId: string,
): nock => {
  return nock(DEFAULT_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'x-api-key': process.env.API_KEY,
    },
  })
    .get(`/estimates-v2/estimates/${nftCollection}/${nftId}?chainId=${chainId}`)
    .reply(500, {})
}

export const mockEstimateSuccessResponse = (
  nftCollection: string,
  nftId: number,
  chainId: string,
): nock => {
  return nock(DEFAULT_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'x-api-key': process.env.API_KEY,
    },
  })
    .get(`/estimates-v2/estimates/${nftCollection}/${nftId}?chainId=${chainId}`)
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

export const mockFloorPriceResponseError = (nftCollection: string, chainId: string): nock => {
  return nock(DEFAULT_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'x-api-key': process.env.API_KEY,
    },
  })
    .get(`/estimates-v2/floor_price/${nftCollection}?chainId=${chainId}`)
    .reply(500, {})
}

export const mockFloorPriceSuccessResponse = (nftCollection: string, chainId: string): nock => {
  return nock(DEFAULT_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'x-api-key': process.env.API_KEY,
    },
  })
    .get(`/estimates-v2/floor_price/${nftCollection}?chainId=${chainId}`)
    .reply(200, {
      data: [
        {
          _id: '1',
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
