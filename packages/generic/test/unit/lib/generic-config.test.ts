import { RequiredEnvError } from '@chainlink/ea-bootstrap'

import { AuthorizationType, CredentialsLocation } from '../../../src/lib/constants'
import { GenericConfigError } from '../../../src/lib/errors'
import {
  getAuthorizationApiKey,
  getAuthorizationBasicAuth,
  getAuthorizationBearerToken,
  parseAuthorizationCustomEnvVar,
  getAuthorizationNoAuth,
  getAuthorizationCustom,
  getGenericConfig,
} from '../../../src/lib/generic-config'
import type {
  AuthorizationApiKey,
  AuthorizationBasicAuth,
  AuthorizationBearerToken,
  AuthorizationCustom,
  AuthorizationNoAuth,
  GenericConfig,
} from '../../../src/lib/types'

let oldEnv: NodeJS.ProcessEnv

beforeEach(() => {
  oldEnv = JSON.parse(JSON.stringify(process.env))
})

afterEach(() => {
  process.env = oldEnv
})

describe('getAuthorizationApiKey()', () => {
  process.env.GENERIC_AUTH_CREDENTIALS_KEY = 'credentials_key'
  process.env.GENERIC_AUTH_CREDENTIALS_VALUE = 'credentials_value'
  process.env.GENERIC_AUTH_CREDENTIALS_LOCATION = CredentialsLocation.HEADERS

  const envVars = [
    `GENERIC_AUTH_CREDENTIALS_KEY`,
    `GENERIC_AUTH_CREDENTIALS_VALUE`,
    `GENERIC_AUTH_CREDENTIALS_KEY`,
  ]
  envVars.forEach((envVar) => {
    it(`throws an error when ${envVar} is not set`, async () => {
      delete process.env[envVar]

      expect(() => getAuthorizationApiKey()).toThrow(RequiredEnvError)
    })
  })

  it(`throws an error if GENERIC_AUTH_CREDENTIALS_LOCATION is not a CredentialsLocation member`, async () => {
    process.env.GENERIC_AUTH_CREDENTIALS_LOCATION = 'LinkPool' // Invalid CredentialsLocation

    expect(() => getAuthorizationApiKey()).toThrow(GenericConfigError)
  })

  it(`returns the expected AuthorizationApiKey object`, async () => {
    const autorizationApiKey = getAuthorizationApiKey()

    const expectedAuthorizationApiKey: AuthorizationApiKey = {
      type: AuthorizationType.API_KEY,
      credentials: {
        key: 'credentials_key',
        value: 'credentials_value',
      },
      credentialsLocation: CredentialsLocation.HEADERS,
    }
    expect(autorizationApiKey).toEqual(expectedAuthorizationApiKey)
  })
})

describe('getAuthorizationBasicAuth()', () => {
  process.env.GENERIC_AUTH_CREDENTIALS_USERNAME = 'credentials_username'
  process.env.GENERIC_AUTH_CREDENTIALS_PASSWORD = 'credentials_password'

  const envVars = [`GENERIC_AUTH_CREDENTIALS_USERNAME`, `GENERIC_AUTH_CREDENTIALS_PASSWORD`]
  envVars.forEach((envVar) => {
    it(`throws an error when ${envVar} is not set`, async () => {
      delete process.env[envVar]

      expect(() => getAuthorizationBasicAuth()).toThrow(RequiredEnvError)
    })
  })

  it(`returns the expected AuthorizationBasicAuth object`, async () => {
    const autorizationABasicAuth = getAuthorizationBasicAuth()

    const expectedAuthorizationBasicAuth: AuthorizationBasicAuth = {
      type: AuthorizationType.BASIC_AUTH,
      credentials: {
        username: 'credentials_username',
        password: 'credentials_password',
      },
    }
    expect(autorizationABasicAuth).toEqual(expectedAuthorizationBasicAuth)
  })
})

describe('getAuthorizationBearerToken()', () => {
  process.env.GENERIC_AUTH_CREDENTIALS_TOKEN = 'credentials_token'

  it(`throws an error when GENERIC_AUTH_CREDENTIALS_TOKEN is not set`, async () => {
    delete process.env['GENERIC_AUTH_CREDENTIALS_TOKEN']

    expect(() => getAuthorizationBearerToken()).toThrow(RequiredEnvError)
  })

  it(`returns the expected AuthorizationBearerToken object`, async () => {
    const autorizationBearerToken = getAuthorizationBearerToken()

    const expectedAuthorizationBearerToken: AuthorizationBearerToken = {
      type: AuthorizationType.BEARER_TOKEN,
      credentials: {
        token: 'credentials_token',
      },
    }
    expect(autorizationBearerToken).toEqual(expectedAuthorizationBearerToken)
  })
})

describe('getAuthorizationCustom()', () => {
  const errorTestCases = [
    {
      name: `credentials in GENERIC_AUTH_HEADERS are not a stringified JSON object`,
      testData: {
        headersRaw: JSON.stringify('LinkPool'),
      },
    },
    {
      name: `credentials in GENERIC_AUTH_PARAMS are not a stringified JSON object`,
      testData: {
        paramsRaw: JSON.stringify('LinkPool'),
      },
    },
    {
      name: `credentials in GENERIC_AUTH_DATA are not a stringified JSON object`,
      testData: {
        dataRaw: JSON.stringify('LinkPool'),
      },
    },
  ]
  errorTestCases.forEach((testCase) => {
    it(`throws an error when ${testCase.name}`, async () => {
      if (testCase.testData.headersRaw) {
        process.env.GENERIC_AUTH_HEADERS = testCase.testData.headersRaw
      }
      if (testCase.testData.paramsRaw) {
        process.env.GENERIC_AUTH_PARAMS = testCase.testData.paramsRaw
      }
      if (testCase.testData.dataRaw) {
        process.env.GENERIC_AUTH_DATA = testCase.testData.dataRaw
      }

      expect(() => getAuthorizationCustom()).toThrow(GenericConfigError)
    })
  })

  const testCases = [
    {
      name: `credentials in GENERIC_AUTH_HEADERS`,
      testData: {
        headersRaw: JSON.stringify({ key1: 'hvalue1', key2: 'hvalue2' }),
        paramsRaw: null,
        dataRaw: null,
        expectedAuthorzationCustom: {
          type: AuthorizationType.CUSTOM,
          headers: { key1: 'hvalue1', key2: 'hvalue2' },
          params: {},
          data: {},
        },
      },
    },
    {
      name: `credentials in GENERIC_AUTH_PARAMS`,
      testData: {
        headersRaw: null,
        paramsRaw: JSON.stringify({ key1: 'pvalue1', key2: 'pvalue2' }),
        dataRaw: null,
        expectedAuthorzationCustom: {
          type: AuthorizationType.CUSTOM,
          headers: {},
          params: { key1: 'pvalue1', key2: 'pvalue2' },
          data: {},
        },
      },
    },
    {
      name: `credentials in GENERIC_AUTH_DATA`,
      testData: {
        headersRaw: null,
        paramsRaw: null,
        dataRaw: JSON.stringify({ key1: 'dvalue1', key2: 'dvalue2' }),
        expectedAuthorzationCustom: {
          type: AuthorizationType.CUSTOM,
          headers: {},
          params: {},
          data: { key1: 'dvalue1', key2: 'dvalue2' },
        },
      },
    },
    {
      name: `credentials in GENERIC_AUTH_HEADERS, GENERIC_AUTH_PARAMS, GENERIC_AUTH_DATA`,
      testData: {
        headersRaw: JSON.stringify({ key1: 'hvalue1', key2: 'hvalue2' }),
        paramsRaw: JSON.stringify({ key1: 'pvalue1', key2: 'pvalue2' }),
        dataRaw: JSON.stringify({ key1: 'dvalue1', key2: 'dvalue2' }),
        expectedAuthorzationCustom: {
          type: AuthorizationType.CUSTOM,
          headers: { key1: 'hvalue1', key2: 'hvalue2' },
          params: { key1: 'pvalue1', key2: 'pvalue2' },
          data: { key1: 'dvalue1', key2: 'dvalue2' },
        },
      },
    },
    {
      name: `no credentials`,
      testData: {
        headersRaw: null,
        paramsRaw: null,
        dataRaw: null,
        expectedAuthorzationCustom: {
          type: AuthorizationType.CUSTOM,
          headers: {},
          params: {},
          data: {},
        },
      },
    },
  ]
  testCases.forEach((testCase) => {
    it(`returns the expected AuthorizationCustom object when ${testCase.name}`, async () => {
      if (testCase.testData.headersRaw) {
        process.env.GENERIC_AUTH_HEADERS = testCase.testData.headersRaw
      }
      if (testCase.testData.paramsRaw) {
        process.env.GENERIC_AUTH_PARAMS = testCase.testData.paramsRaw
      }
      if (testCase.testData.dataRaw) {
        process.env.GENERIC_AUTH_DATA = testCase.testData.dataRaw
      }

      const endpointResponse = getAuthorizationCustom()

      expect(endpointResponse).toEqual(
        testCase.testData.expectedAuthorzationCustom as AuthorizationCustom,
      )
    })
  })
})

describe('getAuthorizationNoAuth()', () => {
  it(`returns the expected AuthorizationNoAuth object`, async () => {
    const autorizationNoAuth = getAuthorizationNoAuth()

    const expectedAuthorizationNoAuth: AuthorizationNoAuth = {
      type: AuthorizationType.NO_AUTH,
    }
    expect(autorizationNoAuth).toEqual(expectedAuthorizationNoAuth)
  })
})

describe('parseAuthorizationCustomEnvVar()', () => {
  it(`parses the stringified credentials (as a JSON object)`, async () => {
    const credentials = { key1: null, key3: false, key4: 0, key5: '', key6: [], key7: {} }
    const credentialsStringified = JSON.stringify(credentials)

    const credentialsParsed = parseAuthorizationCustomEnvVar(credentialsStringified)

    expect(credentialsParsed).toEqual(credentials)
  })

  const testCases = [
    {
      name: `null`,
      testData: {
        credentialsStringified: JSON.stringify(null),
      },
    },
    {
      name: `boolean`,
      testData: {
        credentialsStringified: JSON.stringify(true),
      },
    },
    {
      name: `number`,
      testData: {
        credentialsStringified: JSON.stringify(42.777),
      },
    },
    {
      name: `string`,
      testData: {
        credentialsStringified: JSON.stringify('LinkPool'),
      },
    },
    {
      name: `Array`,
      testData: {
        credentialsStringified: JSON.stringify(['Linkpilled', 'OKLG']),
      },
    },
  ]
  testCases.forEach((testCase) => {
    it(`throws an error when credentials are not a stringified JSON object. Credentials are a JSON ${testCase.name}`, async () => {
      expect(() =>
        parseAuthorizationCustomEnvVar(testCase.testData.credentialsStringified),
      ).toThrow()
    })
  })
})

describe('getGenericConfig()', () => {
  it(`throws an error when GENERIC_BASE_URL is not set`, async () => {
    expect(() => getGenericConfig()).toThrow(RequiredEnvError)
  })

  it(`throws an error when GENERIC_AUTH_TYPE is not an AuthorizationType member`, async () => {
    process.env.GENERIC_BASE_URL = 'https://test-base-url.com'
    process.env.GENERIC_AUTH_TYPE = 'LinkPool'

    expect(() => getGenericConfig()).toThrow(GenericConfigError)
  })

  describe('GENERIC_AUTH_TYPE is api_key', () => {
    it(`returns the expected AuthorizationApiKey object`, async () => {
      const prefix = 'NAAS'

      process.env.NAAS_GENERIC_BASE_URL = 'https://test-base-url.com'
      process.env.NAAS_GENERIC_AUTH_TYPE = 'api_key'
      process.env.NAAS_GENERIC_AUTH_CREDENTIALS_KEY = 'Based'
      process.env.NAAS_GENERIC_AUTH_CREDENTIALS_VALUE = 'LinkPool'
      process.env.NAAS_GENERIC_AUTH_CREDENTIALS_LOCATION = 'params'

      const genericConfig = getGenericConfig(prefix)

      const expectedGenericConfig: GenericConfig = {
        baseURL: 'https://test-base-url.com',
        authorization: {
          type: AuthorizationType.API_KEY,
          credentials: {
            key: 'Based',
            value: 'LinkPool',
          },
          credentialsLocation: CredentialsLocation.PARAMS,
        } as AuthorizationApiKey,
      }
      expect(genericConfig).toEqual(expectedGenericConfig)
    })
  })

  describe('GENERIC_AUTH_TYPE is basic_auth', () => {
    it(`returns the expected AuthorizationBasicAuth object`, async () => {
      const prefix = 'NAAS'

      process.env.NAAS_GENERIC_BASE_URL = 'https://test-base-url.com'
      process.env.NAAS_GENERIC_AUTH_TYPE = 'basic_auth'
      process.env.NAAS_GENERIC_AUTH_CREDENTIALS_USERNAME = 'ArseBlaster'
      process.env.NAAS_GENERIC_AUTH_CREDENTIALS_PASSWORD = '777'

      const genericConfig = getGenericConfig(prefix)

      const expectedGenericConfig: GenericConfig = {
        baseURL: 'https://test-base-url.com',
        authorization: {
          type: AuthorizationType.BASIC_AUTH,
          credentials: {
            username: 'ArseBlaster',
            password: '777',
          },
        } as AuthorizationBasicAuth,
      }
      expect(genericConfig).toEqual(expectedGenericConfig)
    })
  })

  describe('GENERIC_AUTH_TYPE is bearer_token', () => {
    it(`returns the expected AuthorizationBearerToken object`, async () => {
      const prefix = 'NAAS'

      process.env.NAAS_GENERIC_BASE_URL = 'https://test-base-url.com'
      process.env.NAAS_GENERIC_AUTH_TYPE = 'bearer_token'
      process.env.NAAS_GENERIC_AUTH_CREDENTIALS_TOKEN = 'RedPillMe42'

      const genericConfig = getGenericConfig(prefix)

      const expectedGenericConfig: GenericConfig = {
        baseURL: 'https://test-base-url.com',
        authorization: {
          type: AuthorizationType.BEARER_TOKEN,
          credentials: {
            token: 'RedPillMe42',
          },
        } as AuthorizationBearerToken,
      }
      expect(genericConfig).toEqual(expectedGenericConfig)
    })
  })

  describe('GENERIC_AUTH_TYPE is custom', () => {
    it(`returns the expected AuthorizationCustom object`, async () => {
      const prefix = 'NAAS'

      process.env.NAAS_GENERIC_BASE_URL = 'https://test-base-url.com'
      process.env.NAAS_GENERIC_AUTH_TYPE = 'custom'
      process.env.NAAS_GENERIC_AUTH_HEADERS = JSON.stringify({ key1: 'hvalue1', key2: 'hvalue2' })
      process.env.NAAS_GENERIC_AUTH_PARAMS = JSON.stringify({ key1: 'pvalue1', key2: 'pvalue2' })
      process.env.NAAS_GENERIC_AUTH_DATA = JSON.stringify({ key1: 'dvalue1', key2: 'dvalue2' })

      const genericConfig = getGenericConfig(prefix)

      const expectedGenericConfig: GenericConfig = {
        baseURL: 'https://test-base-url.com',
        authorization: {
          type: AuthorizationType.CUSTOM,
          headers: { key1: 'hvalue1', key2: 'hvalue2' },
          params: { key1: 'pvalue1', key2: 'pvalue2' },
          data: { key1: 'dvalue1', key2: 'dvalue2' },
        } as AuthorizationCustom,
      }
      expect(genericConfig).toEqual(expectedGenericConfig)
    })
  })

  describe('GENERIC_AUTH_TYPE is no_auth', () => {
    it(`returns the expected AuthorizationNoAuth object`, async () => {
      const prefix = 'NAAS'

      process.env.NAAS_GENERIC_BASE_URL = 'https://test-base-url.com'

      const genericConfig = getGenericConfig(prefix)

      const expectedGenericConfig: GenericConfig = {
        baseURL: 'https://test-base-url.com',
        authorization: {
          type: AuthorizationType.NO_AUTH,
        } as AuthorizationNoAuth,
      }
      expect(genericConfig).toEqual(expectedGenericConfig)
    })
  })
})
