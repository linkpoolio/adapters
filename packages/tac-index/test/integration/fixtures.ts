import nock from 'nock'

export const mockPriceResponseError = (): nock =>
  nock('https://api.tacindex.com', {
    encodedQueryParams: true,
  })
    .get('/freight/price/?format=json')
    .basicAuth({ user: 'test_api_username', pass: 'test_api_password' })
    .reply(500, {})

export const mockPriceResponseSuccess = (): nock =>
  nock('https://api.tacindex.com', {
    encodedQueryParams: true,
  })
    .get('/freight/price/?format=json')
    .basicAuth({ user: 'test_api_username', pass: 'test_api_password' })
    .reply(
      200,

      [
        {
          route_code: 'HKG-SIN',
          route_type: 'origin-destination',
          route_description: 'Hong Kong to Singapore',
          origin: {
            code: 'HKG',
            name: 'Hong Kong',
            type: 'city',
          },
          destination: {
            code: 'SIN',
            name: 'Singapore',
            type: 'city',
          },
          date: '2022-02-21',
          index_name: 'ANP MAWB',
          usd: '2.88',
          euro: '2.54',
          local: '22.47',
          local_currency: 'HKD',
        },
      ],
    )

export const mockPriceResponseSuccessMalformed = (): nock =>
  nock('https://api.tacindex.com', {
    encodedQueryParams: true,
  })
    .get('/freight/price/?format=json')
    .basicAuth({ user: 'test_api_username', pass: 'test_api_password' })
    .reply(
      200,

      [
        {
          route_code: 7, // SHOULD BE 'HKG-SIN'
          route_type: 'origin-destination',
          route_description: 'Hong Kong to Singapore',
          origin: {
            code: 'HKG',
            name: 'Hong Kong',
            type: 'city',
          },
          destination: {
            code: 'SIN',
            name: 'Singapore',
            type: 'city',
          },
          date: '2022-02-21',
          index_name: 'ANP MAWB',
          usd: '2.88',
          euro: '2.54',
          local: '22.47',
          local_currency: 'HKD',
        },
      ],
    )
