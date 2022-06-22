import type { AxiosResponse } from '@chainlink/types'

import { CredentialsLocation, RequestMethod } from './constants'
import { isJsonObject } from './helpers'
import type {
  AuthData,
  AuthorizationApiKey,
  AuthorizationBasicAuth,
  AuthorizationBearerToken,
  AuthorizationCustom,
  JSONValue,
  ResponseSchema,
} from './types'

export function getAuthDataAuthorizationApiKey(authorization: AuthorizationApiKey): AuthData {
  const headers: Record<string, string> = {}
  const params: Record<string, string> = {}
  if (authorization.credentialsLocation === CredentialsLocation.HEADERS) {
    headers[authorization.credentials.key] = authorization.credentials.key =
      authorization.credentials.value
  } else if (authorization.credentialsLocation === CredentialsLocation.PARAMS) {
    params[authorization.credentials.key] = authorization.credentials.value
  } else {
    throw new Error(`Unsupported credentials location: ${authorization.credentialsLocation}.`)
  }

  return {
    auth: {},
    headers,
    params,
    data: {},
  }
}

export function getAuthDataAuthorizationBasicAuth(authorization: AuthorizationBasicAuth): AuthData {
  return {
    auth: {
      username: authorization.credentials.username,
      password: authorization.credentials.password,
    },
    headers: {},
    params: {},
    data: {},
  }
}

export function getAuthDataAuthorizationBearerToken(
  authorization: AuthorizationBearerToken,
): AuthData {
  return {
    auth: {},
    headers: { Bearer: authorization.credentials.token },
    params: {},
    data: {},
  }
}

export function getAuthDataAuthorizationCustom(authorization: AuthorizationCustom): AuthData {
  return {
    auth: {},
    headers: authorization.headers,
    params: authorization.params,
    data: authorization.data,
  }
}

export function getAuthDataAuthorizationNoAuth(): AuthData {
  return {
    auth: {},
    headers: {},
    params: {},
    data: {},
  }
}

export function getEndpointResponse(response: ResponseSchema): Partial<AxiosResponse> {
  const result = response.data
  if (isJsonObject(result)) {
    return {
      data: { ...result, result },
    }
  }
  // NB: case response.data is anything but an object
  return {
    data: {
      data: result,
      result,
    },
  }
}

export function isWithCredentials(authData: AuthData): boolean {
  return (
    Object.keys(authData.auth).length !== 0 ||
    Object.keys(authData.headers).length !== 0 ||
    Object.keys(authData.params).length !== 0 ||
    Object.keys(authData.data).length !== 0
  )
}

export function validateInputParameterIsJsonObject(value: JSONValue, name: string): void {
  if (!isJsonObject(value)) {
    throw new Error(
      `Invalid '${name}': ${JSON.stringify(value)}. Expected value type is a JSON object`,
    )
  }
}

export function validateInputParameterMethod(method: RequestMethod): void {
  if (!Object.values(RequestMethod).includes(method)) {
    throw new Error(
      `Invalid 'method': ${method}. Supported values are: ${Object.values(RequestMethod).join()}`,
    )
  }
}

export function validateInputParameterUrl(url: JSONValue): void {
  if (typeof url !== 'string') {
    throw new Error(`Invalid 'url': ${JSON.stringify(url)}. Expected value type is a string`)
  }
}
