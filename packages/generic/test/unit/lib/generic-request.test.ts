import type { AxiosResponse } from '@chainlink/types'

import { AuthorizationType, CredentialsLocation } from '../../../src/lib/constants'
import {
  getAuthDataAuthorizationApiKey,
  getAuthDataAuthorizationBasicAuth,
  getAuthDataAuthorizationBearerToken,
  getAuthDataAuthorizationCustom,
  getAuthDataAuthorizationNoAuth,
  getEndpointResponse,
  isWithCredentials,
} from '../../../src/lib/generic-request'
import type {
  AuthData,
  AuthorizationApiKey,
  AuthorizationBasicAuth,
  AuthorizationBearerToken,
  AuthorizationCustom,
  ResponseSchema,
} from '../../../src/lib/types'

describe('getAuthDataAuthorizationApiKey()', () => {
  it(`throws an error if credentialsLocation is unsupported`, async () => {
    const authorization = {
      type: AuthorizationType.API_KEY,
      credentials: { key: 'key1', value: 'value1' },
      credentialsLocation: 'linkpool', // Invalid CredentialsLocation
    }
    expect(() => getAuthDataAuthorizationApiKey(authorization as AuthorizationApiKey)).toThrow()
  })

  const testCases = [
    {
      name: `credentials location is '${CredentialsLocation.HEADERS}'`,
      testData: {
        authorization: {
          type: AuthorizationType.API_KEY,
          credentials: { key: 'key1', value: 'value1' },
          credentialsLocation: CredentialsLocation.HEADERS,
        },
        expectedAuthData: {
          auth: {},
          headers: { key1: 'value1' },
          params: {},
          data: {},
        },
      },
    },
    {
      name: `credentials location is '${CredentialsLocation.PARAMS}'`,
      testData: {
        authorization: {
          type: AuthorizationType.API_KEY,
          credentials: { key: 'key1', value: 'value1' },
          credentialsLocation: CredentialsLocation.PARAMS,
        },
        expectedAuthData: {
          auth: {},
          headers: {},
          params: { key1: 'value1' },
          data: {},
        },
      },
    },
  ]
  testCases.forEach((testCase) => {
    it(`returns the expected AuthData object when ${testCase.name}`, async () => {
      const authData = getAuthDataAuthorizationApiKey(
        testCase.testData.authorization as AuthorizationApiKey,
      )

      expect(authData).toEqual(testCase.testData.expectedAuthData)
    })
  })
})

describe('getAuthDataAuthorizationBasicAuth()', () => {
  it(`returns the expected AuthData object`, async () => {
    const authorization: AuthorizationBasicAuth = {
      type: AuthorizationType.BASIC_AUTH,
      credentials: { username: 'uvalue1', password: 'pvalue1' },
    }
    const authData = getAuthDataAuthorizationBasicAuth(authorization)

    const expectedAuthData: AuthData = {
      auth: {
        username: authorization.credentials.username,
        password: authorization.credentials.password,
      },
      headers: {},
      params: {},
      data: {},
    }
    expect(authData).toEqual(expectedAuthData)
  })
})

describe('getAuthDataAuthorizationBearerToken()', () => {
  it(`returns the expected AuthData object`, async () => {
    const authorization: AuthorizationBearerToken = {
      type: AuthorizationType.BEARER_TOKEN,
      credentials: { token: 'tvalue1' },
    }
    const authData = getAuthDataAuthorizationBearerToken(authorization)

    const expectedAuthData: AuthData = {
      auth: {},
      headers: { Bearer: authorization.credentials.token },
      params: {},
      data: {},
    }
    expect(authData).toEqual(expectedAuthData)
  })
})

describe('getAuthDataAuthorizationCustom()', () => {
  it(`returns the expected AuthData object`, async () => {
    const authorization: AuthorizationCustom = {
      type: AuthorizationType.CUSTOM,
      headers: { header1: 'hvalue1', header2: 'hvalue2' },
      params: { param1: 'pvalue1', param2: 'pvalue2' },
      data: { data1: 'dvalue1', data2: 'dvalue2' },
    }
    const authData = getAuthDataAuthorizationCustom(authorization)

    const expectedAuthData: AuthData = {
      auth: {},
      headers: authorization.headers,
      params: authorization.params,
      data: authorization.data,
    }
    expect(authData).toEqual(expectedAuthData)
  })
})

describe('getEndpointResponse()', () => {
  it(`returns the expected object when response.data is a JSON object`, async () => {
    const response: ResponseSchema = {
      data: { key: 'value' },
    }
    const endpointResponse = getEndpointResponse(response)

    const expectedEndpointResponse: Partial<AxiosResponse> = {
      data: {
        key: 'value',
        result: {
          key: 'value',
        },
      },
    }
    expect(endpointResponse).toEqual(expectedEndpointResponse)
  })

  const testCases = [
    {
      name: `null`,
      testData: {
        response: {
          data: null,
        },
      },
    },
    {
      name: `boolean`,
      testData: {
        response: {
          data: true,
        },
      },
    },
    {
      name: `number`,
      testData: {
        response: {
          data: 42.777,
        },
      },
    },
    {
      name: `string`,
      testData: {
        response: {
          data: 'LinkPool',
        },
      },
    },
    {
      name: `Array`,
      testData: {
        response: {
          data: ['Linkpilled', 'OKLG'],
        },
      },
    },
  ]
  testCases.forEach((testCase) => {
    it(`returns the expected object when the response.data is a JSON ${testCase.name}`, async () => {
      const endpointResponse = getEndpointResponse(testCase.testData.response as ResponseSchema)

      const expectedEndpointResponse = {
        data: {
          data: testCase.testData.response.data,
          result: testCase.testData.response.data,
        },
      }
      expect(endpointResponse).toEqual(expectedEndpointResponse)
    })
  })
})

describe('getAuthDataAuthorizationNoAuth()', () => {
  it(`returns the expected AuthData object`, async () => {
    const authData = getAuthDataAuthorizationNoAuth()

    const expectedAuthData: AuthData = {
      auth: {},
      headers: {},
      params: {},
      data: {},
    }
    expect(authData).toEqual(expectedAuthData)
  })

  describe('isWithCredentials()', () => {
    const testCases = [
      {
        name: `auth is not empty`,
        testData: {
          authData: {
            auth: { key: 'value' },
            headers: {},
            params: {},
            data: {},
          },
          expectedResult: true,
        },
      },
      {
        name: `headers is not empty`,
        testData: {
          authData: {
            auth: {},
            headers: { key: 'value' },
            params: {},
            data: {},
          },
          expectedResult: true,
        },
      },
      {
        name: `params is not empty`,
        testData: {
          authData: {
            auth: {},
            headers: {},
            params: { key: 'value' },
            data: {},
          },
          expectedResult: true,
        },
      },
      {
        name: `data is not empty`,
        testData: {
          authData: {
            auth: {},
            headers: {},
            params: {},
            data: { key: 'value' },
          },
          expectedResult: true,
        },
      },
      {
        name: `all properties are empty`,
        testData: {
          authData: {
            auth: {},
            headers: {},
            params: {},
            data: {},
          },
          expectedResult: false,
        },
      },
    ]
    testCases.forEach((testCase) => {
      it(`returns ${testCase.testData.expectedResult} when ${testCase.name}`, async () => {
        const result = isWithCredentials(testCase.testData.authData as AuthData)

        expect(result).toBe(testCase.testData.expectedResult)
      })
    })
  })
})
