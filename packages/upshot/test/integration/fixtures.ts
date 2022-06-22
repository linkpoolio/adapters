import nock from 'nock'
import { DEFAULT_BASE_URL } from '../../src/config'

// Statistics Endpoint

export const mockStatisticsResponseError = (): nock =>
  nock(DEFAULT_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'x-api-key': 'fake-api-key',
    },
  })
    .get(
      '/v1/collections/contractaddress/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb?includeStats=true',
    )
    .reply(500, {})

export const mockStatisticsResponseSuccessMalformed = (): nock =>
  nock(DEFAULT_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'x-api-key': 'fake-api-key',
    },
  })
    .get(
      '/v1/collections/contractaddress/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb?includeStats=true',
    )
    .reply(200, {
      status: true,
      message: 'collection retrieved successfully',
      data: {
        id: 1,
        name: 'CryptoPunks',
        description:
          'CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and became one of the inspirations for the ERC-721 standard. They have been featured in places like The New York Times, Christie’s of London, Art|Basel Miami, and The PBS NewsHour.',
        imageUrl:
          'https://lh3.googleusercontent.com/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE=s120',
        slug: 'cryptopunks',
        stats: [
          {
            floor: 'potato', //should be a number in string
            marketCap: 'hello', //should be a number in string
          },
        ],
      },
    })

export const mockStatisticsResponseSuccess = (): nock =>
  nock(DEFAULT_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'x-api-key': 'fake-api-key',
    },
  })
    .get(
      '/v1/collections/contractaddress/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb?includeStats=true',
    )
    .reply(200, {
      status: true,
      message: 'collection retrieved successfully',
      data: {
        id: 1,
        name: 'CryptoPunks',
        description:
          'CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and became one of the inspirations for the ERC-721 standard. They have been featured in places like The New York Times, Christie’s of London, Art|Basel Miami, and The PBS NewsHour.',
        imageUrl:
          'https://lh3.googleusercontent.com/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE=s120',
        slug: 'cryptopunks',
        stats: [
          {
            floor: '66500000000000000000',
            marketCap: '104534840290605916663324',
          },
        ],
      },
    })

// Asset-price Endpoint

export const mockAssetPriceResponseError = (): nock =>
  nock(DEFAULT_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'x-api-key': 'fake-api-key',
    },
  })
    .get('/v1/prices/latest?assetId=0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e/11')
    .reply(500, {})

export const mockAssetPriceResponseSuccessMalformed = (): nock =>
  nock(DEFAULT_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'x-api-key': 'fake-api-key',
    },
  })
    .get('/v1/prices/latest?assetId=0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e/11')
    .reply(200, {
      status: true,
      message: 'Current Price gotten successfully for assets in query',
      data: [
        {
          assetId: '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e/11',
          currentPricing: {
            assetId: '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e/11',
            estimatedPrice: 'potato',
          },
        },
      ],
    })

export const mockAssetPriceResponseSuccess = (): nock =>
  nock(DEFAULT_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'x-api-key': 'fake-api-key',
    },
  })
    .get('/v1/prices/latest?assetId=0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e/11')
    .reply(200, {
      status: true,
      message: 'Current Price gotten successfully for assets in query',
      data: [
        {
          assetId: '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e/11',
          currentPricing: {
            assetId: '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e/11',
            estimatedPrice: '23772203809000000000',
          },
        },
      ],
    })
