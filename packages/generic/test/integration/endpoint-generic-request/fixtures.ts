import nock from 'nock'

import { CredentialsLocation } from '../../../src/lib/constants'
import { JSONValue } from '../../../src/lib/types'

export const mockResponseErrorApiKey = (): nock =>
  nock('https://test-base-url.com', {
    encodedQueryParams: true,
    reqheaders: {
      credentials_key: 'credentials_value',
    },
  })
    .get('/subpath')
    .reply(500, {})

export const mockResponseErrorBasicAuth = (): nock =>
  nock('https://test-base-url.com', {
    encodedQueryParams: true,
  })
    .get('/subpath')
    .basicAuth({ user: 'credentials_username', pass: 'credentials_password' })
    .reply(500, {})

export const mockResponseErrorBearerToken = (): nock =>
  nock('https://test-base-url.com', {
    encodedQueryParams: true,
    reqheaders: {
      Bearer: 'credentials_token',
    },
  })
    .get('/subpath')
    .reply(500, {})

export const mockResponseErrorCustom = (): nock =>
  nock('https://test-base-url.com', {
    encodedQueryParams: true,
    reqheaders: {
      'Header-1': 'hvalue1',
      'Header-2': 'hvalue2',
    },
  })
    .get('/subpath')
    .query({ param1: 'pvalue1', param2: 'pvalue2' })
    .reply(500, {})

export const mockResponseErrorNoAuth = (): nock =>
  nock('https://test-base-url.com', {
    encodedQueryParams: true,
  })
    .get('/subpath')
    .reply(500, {})

export const mockResponseSuccessApiKey = (
  credentialsLocation: CredentialsLocation,
  responseData: JSONValue,
): nock => {
  const reqheaders: Record<string, string> = {
    'Header-1': 'hvalue1',
    'Header-2': 'hvalue2',
  }
  const params: Record<string, string> = { param1: 'pvalue1', param2: 'pvalue2' }

  if (credentialsLocation === CredentialsLocation.HEADERS) {
    reqheaders['credentials_key'] = 'credentials_value'
  } else if (credentialsLocation === CredentialsLocation.PARAMS) {
    params['credentials_key'] = 'credentials_value'
  } else {
    throw new Error(`Unsupported 'credentialsLocation'" ${credentialsLocation}.`)
  }

  nock('https://test-base-url.com', {
    encodedQueryParams: true,
    reqheaders,
  })
    .post('/subpath', {
      data1: 'dvalue1',
      data2: ['dvalue2a', 'dvalue2b'],
    })
    .query(params)
    .reply(200, responseData)
}

export const mockResponseSuccessBasicAuth = (responseData: JSONValue): nock => {
  nock('https://test-base-url.com', {
    encodedQueryParams: true,
    reqheaders: {
      'Header-1': 'hvalue1',
      'Header-2': 'hvalue2',
    },
  })
    .post('/subpath', {
      data1: 'dvalue1',
      data2: ['dvalue2a', 'dvalue2b'],
    })
    .query({ param1: 'pvalue1', param2: 'pvalue2' })
    .basicAuth({ user: 'credentials_username', pass: 'credentials_password' })
    .reply(200, responseData)
}

export const mockResponseSuccessBearerToken = (responseData: JSONValue): nock => {
  nock('https://test-base-url.com', {
    encodedQueryParams: true,
    reqheaders: {
      Bearer: 'credentials_token',
      'Header-1': 'hvalue1',
      'Header-2': 'hvalue2',
    },
  })
    .post('/subpath', {
      data1: 'dvalue1',
      data2: ['dvalue2a', 'dvalue2b'],
    })
    .query({ param1: 'pvalue1', param2: 'pvalue2' })
    .reply(200, responseData)
}

export const mockResponseSuccessCustom = (responseData: JSONValue): nock => {
  nock('https://test-base-url.com', {
    encodedQueryParams: true,
    reqheaders: {
      'Header-1': 'hvalue1',
      'Header-2': 'hvalue2',
      'Header-3': 'hvalue3',
      'Header-4': 'hvalue4',
    },
  })
    .post('/subpath', {
      data1: 'dvalue1',
      data2: 'dvalue2',
      data3: 'dvalue3',
      data4: ['dvalue4a', 'dvalue4b'],
    })
    .query({
      param1: 'pvalue1',
      param2: 'pvalue2',
      param3: 'pvalue3',
      param4: 'pvalue4',
    })
    .reply(200, responseData)
}

export const mockResponseSuccessNoAuth = (responseData: JSONValue): nock => {
  nock('https://test-base-url.com', {
    encodedQueryParams: true,
    reqheaders: {
      'Header-1': 'hvalue1',
      'Header-2': 'hvalue2',
    },
  })
    .post('/subpath', {
      data1: 'dvalue1',
      data2: ['dvalue2a', 'dvalue2b'],
    })
    .query({
      param1: 'pvalue1',
      param2: 'pvalue2',
    })
    .reply(200, responseData)
}
