import nock from 'nock'

import { DEFAULT_BASE_URL } from '../../src/config'

export const mockTamiResponseError = (): nock => {
  nock(DEFAULT_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'x-access-key-id': process.env.ACCESS_KEY,
      'x-secret-key': process.env.SECRET_KEY,
    },
  })
    .get(`/v1/nft/metrics/0xbce3781ae7ca1a5e050bd9c4c77369867ebc307e&market=AllMarkets`)
    .reply(500, {})
}

export const mockTamiSuccessResponse = (): nock => {
  nock(DEFAULT_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'x-access-key-id': process.env.ACCESS_KEY,
      'x-secret-key': process.env.SECRET_KEY,
    },
  })
    .get(`/v1/nft/metrics/0xbce3781ae7ca1a5e050bd9c4c77369867ebc307e&market=AllMarkets`)
    .reply(200, {
      answer: {
        eth: '145792.4216888684',
        gwei: '145792421688868.4',
        wei: '145792421688868400000000',
      },
      message: 'successful',
    })
}
