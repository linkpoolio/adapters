import nock from 'nock'

import { DEV_BASE_URL } from '../../src/config'

// *** endpoint: auth ***

const authToken = 'wavebridgeAuthToken'

export const mockAuthResponseError = (): nock =>
  nock(DEV_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'Access-Key': process.env.API_KEY,
    },
  })
    .post(`/api/v3/index/${process.env.API_CORP_CODE}/auth`, {})
    .reply(500, {})

export const mockAuthResponseSuccessMalformed = (): nock =>
  nock(DEV_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'Access-Key': process.env.API_KEY,
    },
  })
    .post(`/api/v3/index/${process.env.API_CORP_CODE}/auth`, {})
    .reply(200, {
      data: {
        linkpoolToken: 'LPL',
      },
    })

export const mockAuthResponseSuccess = (): nock =>
  nock(DEV_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'Access-Key': process.env.API_KEY,
    },
  })
    .post(`/api/v3/index/${process.env.API_CORP_CODE}/auth`, {})
    .reply(200, {
      data: {
        authToken,
      },
    })

// *** endpoint: cmx-daily ***

export const mockCmxDailyResponseError = (): nock =>
  nock(DEV_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'Auth-Token': authToken,
    },
  })
    .get(`/api/v3/index/${process.env.API_CORP_CODE}/market/CMX10`)
    .reply(500, {})

export const mockCmxDailyResponseSuccessMalformed1 = (): nock =>
  nock(DEV_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'Auth-Token': authToken,
    },
  })
    .get(`/api/v3/index/${process.env.API_CORP_CODE}/market/CMX10`)
    .reply(
      200,
      {
        success: true,
        statusCode: 200,
        status: '',
        message: '',
        data: ['item_1', 'item_2'], // NB: multiple items
      },
      [
        'Date',
        'Tue, 25 Jan 2022 18:01:16 GMT',
        'Content-Type',
        'application/json',
        'Transfer-Encoding',
        'chunked',
        'Connection',
        'close',
        'Server',
        'nginx/1.20.0',
        'Vary',
        'Origin',
        'Vary',
        'Access-Control-Request-Method',
        'Vary',
        'Access-Control-Request-Headers',
      ],
    )

export const mockCmxDailyResponseSuccessMalformed2 = (): nock =>
  nock(DEV_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'Auth-Token': authToken,
    },
  })
    .get(`/api/v3/index/${process.env.API_CORP_CODE}/market/CMX10`)
    .reply(
      200,
      {
        success: true,
        statusCode: 200,
        status: '',
        message: '',
        data: [
          {
            type: 'market',
            indexSymbol: 'CMX10',
            index: 'linkpool', // NB: not a number
            date: '2022-01-24T23:59:00.000+00:00',
            composition: [
              { name: 'BTC', rank: 1, weight: 57.248883 },
              { name: 'ETH', rank: 2, weight: 23.932082 },
              { name: 'BNB', rank: 3, weight: 5.115494 },
              { name: 'SOL', rank: 4, weight: 2.458589 },
              { name: 'ADA', rank: 5, weight: 2.991151 },
              { name: 'XRP', rank: 6, weight: 2.407212 },
              { name: 'LUNA', rank: 7, weight: 1.97885 },
              { name: 'DOT', rank: 8, weight: 1.474918 },
              { name: 'DOGE', rank: 9, weight: 1.50895 },
              { name: 'MATIC', rank: 10, weight: 0.883871 },
            ],
            rate: 0.88778923,
            generateTime: 1643069420187,
          },
        ],
      },
      [
        'Date',
        'Tue, 25 Jan 2022 18:01:16 GMT',
        'Content-Type',
        'application/json',
        'Transfer-Encoding',
        'chunked',
        'Connection',
        'close',
        'Server',
        'nginx/1.20.0',
        'Vary',
        'Origin',
        'Vary',
        'Access-Control-Request-Method',
        'Vary',
        'Access-Control-Request-Headers',
      ],
    )

export const mockCmxDailyResponseSuccess1 = (): nock =>
  nock(DEV_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'Auth-Token': authToken,
    },
  })
    .get(`/api/v3/index/${process.env.API_CORP_CODE}/market/CMX10`)
    .reply(
      200,
      {
        success: true,
        statusCode: 200,
        status: '',
        message: '',
        data: [
          {
            type: 'market',
            indexSymbol: 'CMX10',
            index: 6788.998389966489,
            date: '2022-01-24T23:59:00.000+00:00',
            composition: [
              { name: 'BTC', rank: 1, weight: 57.248883 },
              { name: 'ETH', rank: 2, weight: 23.932082 },
              { name: 'BNB', rank: 3, weight: 5.115494 },
              { name: 'SOL', rank: 4, weight: 2.458589 },
              { name: 'ADA', rank: 5, weight: 2.991151 },
              { name: 'XRP', rank: 6, weight: 2.407212 },
              { name: 'LUNA', rank: 7, weight: 1.97885 },
              { name: 'DOT', rank: 8, weight: 1.474918 },
              { name: 'DOGE', rank: 9, weight: 1.50895 },
              { name: 'MATIC', rank: 10, weight: 0.883871 },
            ],
            rate: 0.88778923,
            generateTime: 1643069420187,
          },
        ],
      },
      [
        'Date',
        'Tue, 25 Jan 2022 18:01:16 GMT',
        'Content-Type',
        'application/json',
        'Transfer-Encoding',
        'chunked',
        'Connection',
        'close',
        'Server',
        'nginx/1.20.0',
        'Vary',
        'Origin',
        'Vary',
        'Access-Control-Request-Method',
        'Vary',
        'Access-Control-Request-Headers',
      ],
    )

export const mockCmxDailyResponseSuccess2 = (): nock =>
  nock(DEV_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'Auth-Token': authToken,
    },
  })
    .get(`/api/v3/index/${process.env.API_CORP_CODE}/market/CMX10`)
    .query({ startDateEpoch: '1642636800000', endDateEpoch: '1642723200000' })
    .reply(
      200,
      {
        success: true,
        statusCode: 200,
        status: '',
        message: '',
        data: [
          {
            type: 'market',
            indexSymbol: 'CMX10',
            index: 7905.795728282094,
            date: '2022-01-20T23:59:00.000+00:00',
            composition: [
              { name: 'BTC', rank: 1, weight: 54.873713 },
              { name: 'ETH', rank: 2, weight: 25.502233 },
              { name: 'BNB', rank: 3, weight: 5.24509 },
              { name: 'SOL', rank: 4, weight: 2.845259 },
              { name: 'ADA', rank: 5, weight: 3.005794 },
              { name: 'XRP', rank: 6, weight: 2.442481 },
              { name: 'LUNA', rank: 7, weight: 1.988302 },
              { name: 'DOT', rank: 8, weight: 1.626205 },
              { name: 'DOGE', rank: 9, weight: 1.472873 },
              { name: 'MATIC', rank: 10, weight: 0.998051 },
            ],
            rate: 0.88778923,
            generateTime: 1643069420187,
          },
        ],
      },
      [
        'Date',
        'Tue, 25 Jan 2022 18:01:16 GMT',
        'Content-Type',
        'application/json',
        'Transfer-Encoding',
        'chunked',
        'Connection',
        'close',
        'Server',
        'nginx/1.20.0',
        'Vary',
        'Origin',
        'Vary',
        'Access-Control-Request-Method',
        'Vary',
        'Access-Control-Request-Headers',
      ],
    )

// *** endpoint: kimp-daily ***

export const mockKimpDailyResponseError = (): nock =>
  nock(DEV_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'Auth-Token': authToken,
    },
  })
    .get(`/api/v3/index/${process.env.API_CORP_CODE}/market/KIMP_BTC_DX`)
    .reply(500, {})

export const mockKimpDailyResponseSuccessMalformed1 = (): nock =>
  nock(DEV_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'Auth-Token': authToken,
    },
  })
    .get(`/api/v3/index/${process.env.API_CORP_CODE}/market/KIMP_BTC_DX`)
    .reply(
      200,
      {
        success: true,
        statusCode: 200,
        status: '',
        message: '',
        data: ['item_1', 'item_2'], // NB: multiple items
      },
      [
        'Date',
        'Tue, 25 Jan 2022 18:01:16 GMT',
        'Content-Type',
        'application/json',
        'Transfer-Encoding',
        'chunked',
        'Connection',
        'close',
        'Server',
        'nginx/1.20.0',
        'Vary',
        'Origin',
        'Vary',
        'Access-Control-Request-Method',
        'Vary',
        'Access-Control-Request-Headers',
      ],
    )

export const mockKimpDailyResponseSuccessMalformed2 = (): nock =>
  nock(DEV_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'Auth-Token': authToken,
    },
  })
    .get(`/api/v3/index/${process.env.API_CORP_CODE}/market/KIMP_BTC_DX`)
    .reply(
      200,
      {
        success: true,
        statusCode: 200,
        status: '',
        message: '',
        data: [
          {
            type: 'market',
            indexSymbol: 'KIMP_BTC_DX',
            index: 'linkpool', // NB: not a number
            date: '2022-01-24T23:59:00.000+00:00',
            composition: [{ name: 'BTCKRW_RX' }, { name: 'BTCUSD_RX' }],
            rate: 1194.2,
            generateTime: 1643069420187,
          },
        ],
      },
      [
        'Date',
        'Tue, 25 Jan 2022 18:01:16 GMT',
        'Content-Type',
        'application/json',
        'Transfer-Encoding',
        'chunked',
        'Connection',
        'close',
        'Server',
        'nginx/1.20.0',
        'Vary',
        'Origin',
        'Vary',
        'Access-Control-Request-Method',
        'Vary',
        'Access-Control-Request-Headers',
      ],
    )

export const mockKimpDailyResponseSuccess1 = (): nock =>
  nock(DEV_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'Auth-Token': authToken,
    },
  })
    .get(`/api/v3/index/${process.env.API_CORP_CODE}/market/KIMP_BTC_DX`)
    .reply(
      200,
      {
        success: true,
        statusCode: 200,
        status: '',
        message: '',
        data: [
          {
            type: 'market',
            indexSymbol: 'KIMP_BTC_DX',
            index: 2.271584,
            date: '2022-01-24T23:59:00.000+00:00',
            composition: [{ name: 'BTCKRW_RX' }, { name: 'BTCUSD_RX' }],
            rate: 1194.2,
            generateTime: 1643069420187,
          },
        ],
      },
      [
        'Date',
        'Tue, 25 Jan 2022 18:01:16 GMT',
        'Content-Type',
        'application/json',
        'Transfer-Encoding',
        'chunked',
        'Connection',
        'close',
        'Server',
        'nginx/1.20.0',
        'Vary',
        'Origin',
        'Vary',
        'Access-Control-Request-Method',
        'Vary',
        'Access-Control-Request-Headers',
      ],
    )

export const mockKimpDailyResponseSuccess2 = (): nock =>
  nock(DEV_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'Auth-Token': authToken,
    },
  })
    .get(`/api/v3/index/${process.env.API_CORP_CODE}/market/KIMP_BTC_DX`)
    .query({ startDateEpoch: '1642636800000', endDateEpoch: '1642723200000' })
    .reply(
      200,
      {
        success: true,
        statusCode: 200,
        status: '',
        message: '',
        data: [
          {
            type: 'market',
            indexSymbol: 'KIMP_BTC_DX',
            index: 2.733898,
            date: '2022-01-20T23:59:00.000+00:00',
            composition: [{ name: 'BTCKRW_RX' }, { name: 'BTCUSD_RX' }],
            rate: 1190.4,
            generateTime: 1643069420187,
          },
        ],
      },
      [
        'Date',
        'Tue, 25 Jan 2022 18:01:16 GMT',
        'Content-Type',
        'application/json',
        'Transfer-Encoding',
        'chunked',
        'Connection',
        'close',
        'Server',
        'nginx/1.20.0',
        'Vary',
        'Origin',
        'Vary',
        'Access-Control-Request-Method',
        'Vary',
        'Access-Control-Request-Headers',
      ],
    )

// *** endpoint: kimp-realtime ***

export const mockKimpRealtimeResponseError = (): nock =>
  nock(DEV_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'Auth-Token': authToken,
    },
  })
    .get(`/api/v3/index/${process.env.API_CORP_CODE}/market/KIMP_BTC_RTX`)
    .reply(500, {})

export const mockKimpRealtimeResponseSuccessMalformed1 = (): nock =>
  nock(DEV_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'Auth-Token': authToken,
    },
  })
    .get(`/api/v3/index/${process.env.API_CORP_CODE}/market/KIMP_BTC_RTX`)
    .reply(
      200,
      {
        success: true,
        statusCode: 200,
        status: '',
        message: '',
        data: ['item_1', 'item_2'],
      },
      [
        'Date',
        'Thu, 27 Jan 2022 14:12:09 GMT',
        'Content-Type',
        'application/json',
        'Transfer-Encoding',
        'chunked',
        'Connection',
        'close',
        'Server',
        'nginx/1.20.0',
        'Vary',
        'Origin',
        'Vary',
        'Access-Control-Request-Method',
        'Vary',
        'Access-Control-Request-Headers',
      ],
    )

export const mockKimpRealtimeResponseSuccessMalformed2 = (): nock =>
  nock(DEV_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'Auth-Token': authToken,
    },
  })
    .get(`/api/v3/index/${process.env.API_CORP_CODE}/market/KIMP_BTC_RTX`)
    .reply(
      200,
      {
        success: true,
        statusCode: 200,
        status: '',
        message: '',
        data: [
          {
            type: 'market',
            indexSymbol: 'KIMP_BTC_RTX',
            index: 'linkpool', // NB: not a number
            date: '2022-01-27T14:12:09.000+00:00',
            composition: [{ name: 'BTCUSD_RTX' }, { name: 'BTCKRW_RTX' }],
            rate: 1203.5,
            generateTime: 1643292729001,
          },
        ],
      },
      [
        'Date',
        'Thu, 27 Jan 2022 14:12:09 GMT',
        'Content-Type',
        'application/json',
        'Transfer-Encoding',
        'chunked',
        'Connection',
        'close',
        'Server',
        'nginx/1.20.0',
        'Vary',
        'Origin',
        'Vary',
        'Access-Control-Request-Method',
        'Vary',
        'Access-Control-Request-Headers',
      ],
    )

export const mockKimpRealtimeResponseSuccess = (): nock =>
  nock(DEV_BASE_URL, {
    encodedQueryParams: true,
    reqheaders: {
      'Auth-Token': authToken,
    },
  })
    .get(`/api/v3/index/${process.env.API_CORP_CODE}/market/KIMP_BTC_RTX`)
    .reply(
      200,
      {
        success: true,
        statusCode: 200,
        status: '',
        message: '',
        data: [
          {
            type: 'market',
            indexSymbol: 'KIMP_BTC_RTX',
            index: 2.09032,
            date: '2022-01-27T14:12:09.000+00:00',
            composition: [{ name: 'BTCUSD_RTX' }, { name: 'BTCKRW_RTX' }],
            rate: 1203.5,
            generateTime: 1643292729001,
          },
        ],
      },
      [
        'Date',
        'Thu, 27 Jan 2022 14:12:09 GMT',
        'Content-Type',
        'application/json',
        'Transfer-Encoding',
        'chunked',
        'Connection',
        'close',
        'Server',
        'nginx/1.20.0',
        'Vary',
        'Origin',
        'Vary',
        'Access-Control-Request-Method',
        'Vary',
        'Access-Control-Request-Headers',
      ],
    )
