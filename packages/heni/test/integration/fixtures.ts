import nock from 'nock'

export const mockPriceResponseError = (): nock =>
  nock('https://api.nftoracle.heni.com', {
    encodedQueryParams: true,
    reqheaders: {
      'x-api-key': process.env.API_KEY,
    },
  })
    .get(`/price`)
    .reply(500, {})

export const mockPriceResponseSuccessMalformed = (): nock =>
  nock('https://api.nftoracle.heni.com', {
    encodedQueryParams: true,
    reqheaders: {
      'x-api-key': process.env.API_KEY,
    },
  })
    .get(`/price`)
    .reply(200, {
      price: 'linkpool',
      last_updated: '2022-02-04T13:55:27+00:00',
      last_sale_time: '2022-02-04T10:47:07+00:00',
      GITSHA: '171b8a4feff9ae020efab1ad96c784d51be95c34',
    })

export const mockPriceResponseSuccess = (): nock =>
  nock('https://api.nftoracle.heni.com', {
    encodedQueryParams: true,
    reqheaders: {
      'x-api-key': process.env.API_KEY,
    },
  })
    .get(`/price`)
    .reply(200, {
      price: '5.069164497',
      last_updated: '2022-02-04T13:55:27+00:00',
      last_sale_time: '2022-02-04T10:47:07+00:00',
      GITSHA: '171b8a4feff9ae020efab1ad96c784d51be95c34',
    })
