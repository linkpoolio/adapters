import nock from 'nock'

import { DEFAULT_BASE_URL } from '../../src/config'

export const mockPriceResponseError = (): nock => {
  nock(DEFAULT_BASE_URL)
    .get(
      `/api/v3/datasets/ECONOMIST/BIGMAC_LBN.json?api_key=fake-api-key&&start_date=2020-01-01&end_date=2020-12-31`,
    )
    .reply(500, {})
}

export const mockPriceSuccessResponse = (): nock => {
  nock(DEFAULT_BASE_URL)
    .get(
      `/api/v3/datasets/ECONOMIST/BIGMAC_LBN.json?api_key=fake-api-key&&start_date=2020-01-01&end_date=2020-12-31`,
    )
    .reply(200, {
      dataset: {
        data: [
          [
            '2020-07-31',
            9000.0,
            1512.0,
            5.95238095238095,
            1576.1821366024512,
            4.245,
            null,
            null,
            null,
            null,
            null,
          ],
          [
            '2020-01-31',
            6500.0,
            1514.0,
            4.29326287978864,
            1146.384479717813,
            -24.281,
            null,
            null,
            null,
            null,
            null,
          ],
        ],
        collapse: null,
        order: null,
        database_id: 5330,
      },
    })
}
