import nock from 'nock'
import { DEFAULT_BASE_URL } from '../../src/config'

export const mockCategoryResponseError = (): nock =>
  nock(DEFAULT_BASE_URL, {
    encodedQueryParams: true,
  })
    .get(
      '/api/address_label?proto=eth&address=0xed5af388653567af2f388e6224dc7c4b3241c544&apikey=fake-api-key',
    )
    .reply(500, {})

export const mockCategoryResponseSuccessMalformed = (): nock =>
  nock(DEFAULT_BASE_URL, {
    encodedQueryParams: true,
  })
    .get(
      '/api/address_label?proto=eth&address=0xed5af388653567af2f388e6224dc7c4b3241c544&apikey=fake-api-key',
    )
    .reply(200, {
      status: 200,
      err_msg: '',
      data: {
        '0xed5af388653567af2f388e6224dc7c4b3241c544': {
          self: {
            category: 77, // Should be an array of categories
            detail: ['token:Azuki (AZUKI)', 'wallet:Azuki'],
          },
          is_address_valid: true,
        },
      },
    })

export const mockCategoryResponseSuccess = (): nock =>
  nock(DEFAULT_BASE_URL, {
    encodedQueryParams: true,
  })
    .get(
      '/api/address_label?proto=eth&address=0xed5af388653567af2f388e6224dc7c4b3241c544&apikey=fake-api-key',
    )
    .reply(200, {
      status: 200,
      err_msg: '',
      data: {
        '0xed5af388653567af2f388e6224dc7c4b3241c544': {
          self: {
            category: ['token', 'wallet'],
            detail: ['token:Azuki (AZUKI)', 'wallet:Azuki'],
          },
          is_address_valid: true,
        },
      },
    })
