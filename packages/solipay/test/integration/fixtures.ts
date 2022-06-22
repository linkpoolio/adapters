import nock from 'nock'

// *** endpoint: contains-most-visited-location ***

export const mockResponseError = (): nock =>
  nock('https://autocloud.solipay.tech')
    .post('/chainlink', {
      secret_key: 'test_api_key',
      wallet_address: '0x514910771af9ca656af840dff83e8264ecf986ca',
      country_list: 'PT-ES-FR-IT',
      days_of_location_verification: 1,
    })
    .reply(500, {})

export const mockResponseSuccessInternalError = (): nock =>
  nock('https://autocloud.solipay.tech')
    .post('/chainlink', {
      secret_key: 'test_api_key',
      wallet_address: '0x514910771af9ca656af840dff83e8264ecf986ca',
      country_list: 'PT-ES-FR-IT',
      days_of_location_verification: 1,
    })
    .reply(200, {
      res: false,
      valid: false,
      message: 'Internal Error',
    })

export const mockResponseSuccessInvalid = (message: string): nock =>
  nock('https://autocloud.solipay.tech')
    .post('/chainlink', {
      secret_key: 'test_api_key',
      wallet_address: '0x514910771af9ca656af840dff83e8264ecf986ca',
      country_list: 'PT-ES-FR-IT',
      days_of_location_verification: 1,
    })
    .reply(200, {
      res: true,
      valid: false,
      message,
    })

export const mockResponseSuccessValid = (): nock =>
  nock('https://autocloud.solipay.tech')
    .post('/chainlink', {
      secret_key: 'test_api_key',
      wallet_address: '0x896e90716f673e0003452f700a0ba44bbfc49c79',
      country_list: 'PT-ES-FR-IT-US',
      days_of_location_verification: 7,
    })
    .reply(200, {
      res: true,
      valid: true,
      message: 'Valid',
    })
