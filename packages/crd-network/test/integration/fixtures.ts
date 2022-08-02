import nock from 'nock'

import { DEV_BASE_URL } from '../../src/config'

// *** endpoint: address-info ***

export const mockResponseError = (): nock =>
  nock(DEV_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      Authorization: 'test_api_key',
    },
  })
    .post('/public/address-info', { address: '0xde78d3e8e46d0184841874da003928ecd89533a9' })
    .reply(500, {})

export const mockResponseSuccessMalformed = (): nock =>
  nock(DEV_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      Authorization: 'test_api_key',
    },
  })
    .post('/public/address-info', { address: '0xde78d3e8e46d0184841874da003928ecd89533a9' })
    .reply(
      201,
      {
        object: '0xde78d3e8e46d0184841874da003928ecd89533a9',
        kycId: null, // NB: null instead of empty string or a short uuid
        kycLevel: 0,
        objectType: 'address',
      },
      [
        'Server',
        'nginx/1.20.0',
        'Date',
        'Wed, 17 Nov 2021 12:54:09 GMT',
        'Content-Type',
        'application/json; charset=utf-8',
        'Content-Length',
        '102',
        'Connection',
        'close',
        'X-Powered-By',
        'Express',
        'Access-Control-Allow-Origin',
        '*',
        'ETag',
        'W/"66-BLabsdMalV8m54LF/q5wVDDRx6Y"',
        'X-Frame-Options',
        'DENY',
        'X-Content-Type-Options',
        'nosniff',
      ],
    )

export const mockResponseSuccess = (): nock =>
  nock(DEV_BASE_URL, {
    encodedQueryParams: true,
    headers: {
      Authorization: 'test_api_key',
    },
  })
    .post('/public/address-info', { address: '0xff71f5d9b8f8b4886eb7224af5d03000839bc527' })
    .reply(
      201,
      {
        object: '0xff71f5d9b8f8b4886eb7224af5d03000839bc527',
        kycId: 'LAlfLGjYRsi28KdxaS2ffw',
        kycLevel: 0,
        objectType: 'address',
      },
      [
        'Server',
        'nginx/1.20.0',
        'Date',
        'Wed, 17 Nov 2021 12:54:09 GMT',
        'Content-Type',
        'application/json; charset=utf-8',
        'Content-Length',
        '102',
        'Connection',
        'close',
        'X-Powered-By',
        'Express',
        'Access-Control-Allow-Origin',
        '*',
        'ETag',
        'W/"66-BLabsdMalV8m54LF/q5wVDDRx6Y"',
        'X-Frame-Options',
        'DENY',
        'X-Content-Type-Options',
        'nosniff',
      ],
    )
