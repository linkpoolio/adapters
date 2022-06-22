import nock from 'nock'

const authToken = 'chartmetricAuthToken'

export const mockAuthResponseError = (): nock =>
  nock('https://api.chartmetric.com/api')
    .post(`/token`, { refreshtoken: 'fake-api-key' })
    .reply(500, {})

export const mockAuthResponseSuccessMalformed = (): nock =>
  nock('https://api.chartmetric.com/api')
    .post(`/token`, { refreshtoken: 'fake-api-key' })
    .reply(200, {
      //NB: Missing 'token'
      expires_in: 3600,
      refresh_token: 'REFRESH_TOKEN',
      scope: 'api',
    })

export const mockAuthResponseSuccess = (): nock =>
  nock('https://api.chartmetric.com/api')
    .post(`/token`, { refreshtoken: 'fake-api-key' })
    .reply(200, {
      token: authToken,
      expires_in: 3600,
      refresh_token: 'REFRESH_TOKEN',
      scope: 'api',
    })

export const mockStatisticsResponseError = (): nock =>
  nock('https://api.chartmetric.com/api', {
    encodedQueryParams: true,
    reqheaders: {
      Authorization: `Bearer ${authToken}`,
    },
  })
    .get(`/artist/439`)
    .reply(500, {})

export const mockStatisticsResponseSuccessMalformed = (): nock =>
  nock('https://api.chartmetric.com/api', {
    encodedQueryParams: true,
    reqheaders: {
      Authorization: `Bearer ${authToken}`,
    },
  })
    .get(`/artist/439`)
    .reply(200, {
      obj: {
        cm_statistics: {
          sp_followers: 'nope',
          ycs_subscribers: 'yup',
          tiktok_followers: 3200000,
        },
      },
    })

export const mockStatisticsResponseSuccess = (): nock =>
  nock('https://api.chartmetric.com/api', {
    encodedQueryParams: true,
    reqheaders: {
      Authorization: `Bearer ${authToken}`,
    },
  })
    .get(`/artist/439`)
    .reply(200, {
      obj: {
        cm_statistics: {
          sp_followers: 77777,
          ycs_subscribers: 777777,
          tiktok_followers: 777777,
        },
      },
    })
