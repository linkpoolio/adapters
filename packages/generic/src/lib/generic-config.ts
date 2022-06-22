import { util } from '@chainlink/ea-bootstrap'

import { AuthorizationType, CredentialsLocation } from './constants'
import { GenericConfigError } from './errors'
import { isJsonObject } from './helpers'
import type {
  Authorization,
  AuthorizationApiKey,
  AuthorizationBasicAuth,
  AuthorizationBearerToken,
  AuthorizationCustom,
  AuthorizationNoAuth,
  GenericConfig,
} from './types'

export function getAuthorizationApiKey(prefix = ''): AuthorizationApiKey {
  const key = util.getRequiredEnv('GENERIC_AUTH_CREDENTIALS_KEY', prefix)
  const value = util.getRequiredEnv('GENERIC_AUTH_CREDENTIALS_VALUE', prefix)
  const credentialsLocation = util.getRequiredEnv(
    'GENERIC_AUTH_CREDENTIALS_LOCATION',
    prefix,
  ) as CredentialsLocation

  if (!Object.values(CredentialsLocation).includes(credentialsLocation)) {
    throw new GenericConfigError({
      message: `Invalid credentials location': ${credentialsLocation}. Supported values are: ${Object.values(
        CredentialsLocation,
      ).join()}`,
      envVar: 'GENERIC_AUTH_CREDENTIALS_LOCATION',
      prefix,
    })
  }

  return {
    type: AuthorizationType.API_KEY,
    credentials: { key, value },
    credentialsLocation,
  }
}

export function getAuthorizationBasicAuth(prefix = ''): AuthorizationBasicAuth {
  const username = util.getRequiredEnv('GENERIC_AUTH_CREDENTIALS_USERNAME', prefix)
  const password = util.getRequiredEnv('GENERIC_AUTH_CREDENTIALS_PASSWORD', prefix)

  return {
    type: AuthorizationType.BASIC_AUTH,
    credentials: { username, password },
  }
}

export function getAuthorizationBearerToken(prefix = ''): AuthorizationBearerToken {
  const token = util.getRequiredEnv('GENERIC_AUTH_CREDENTIALS_TOKEN', prefix)

  return {
    type: AuthorizationType.BEARER_TOKEN,
    credentials: { token },
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseAuthorizationCustomEnvVar(value: string): Record<string, any> {
  const credentials = JSON.parse(value)
  if (!isJsonObject(credentials)) {
    throw new Error(`Invalid credentials: ${value}. Expected format is a JSON object as string`)
  }

  return credentials
}

export function getAuthorizationCustom(prefix = ''): AuthorizationCustom {
  const headersRaw = util.getEnv('GENERIC_AUTH_HEADERS', prefix) as string
  const paramsRaw = util.getEnv('GENERIC_AUTH_PARAMS', prefix) as string
  const dataRaw = util.getEnv('GENERIC_AUTH_DATA', prefix) as string

  let headers: Record<string, string>
  let params: Record<string, string>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: Record<string, any>
  try {
    headers = headersRaw
      ? (parseAuthorizationCustomEnvVar(headersRaw) as Record<string, string>)
      : {}
  } catch (error) {
    throw new GenericConfigError({
      message: `${error}. Headers: ${headersRaw}`,
      envVar: 'GENERIC_AUTH_HEADERS',
      prefix,
    })
  }
  try {
    params = paramsRaw ? (parseAuthorizationCustomEnvVar(paramsRaw) as Record<string, string>) : {}
  } catch (error) {
    throw new GenericConfigError({
      message: `${error}. Params: ${paramsRaw}`,
      envVar: 'GENERIC_AUTH_PARAMS',
      prefix,
    })
  }
  try {
    data = dataRaw ? parseAuthorizationCustomEnvVar(dataRaw) : {}
  } catch (error) {
    throw new GenericConfigError({
      message: `${error}. Data: ${dataRaw}`,
      envVar: 'GENERIC_AUTH_DATA',
      prefix,
    })
  }

  return {
    type: AuthorizationType.CUSTOM,
    headers,
    params,
    data,
  }
}

export function getAuthorizationNoAuth(): AuthorizationNoAuth {
  return { type: AuthorizationType.NO_AUTH }
}

export function getGenericConfig(prefix = ''): GenericConfig {
  const baseURL = util.getRequiredEnv('GENERIC_BASE_URL', prefix)
  const authorizationType =
    (util.getEnv('GENERIC_AUTH_TYPE', prefix) as AuthorizationType) ?? AuthorizationType.NO_AUTH

  if (!Object.values(AuthorizationType).includes(authorizationType)) {
    throw new GenericConfigError({
      message: `Invalid authorization type: ${authorizationType}. Supported values are: ${Object.values(
        AuthorizationType,
      ).join()}`,
      envVar: 'GENERIC_AUTH_TYPE',
      prefix,
    })
  }
  let authorization: Authorization

  switch (authorizationType) {
    case AuthorizationType.API_KEY:
      authorization = getAuthorizationApiKey(prefix)
      break
    case AuthorizationType.BASIC_AUTH:
      authorization = getAuthorizationBasicAuth(prefix)
      break
    case AuthorizationType.BEARER_TOKEN:
      authorization = getAuthorizationBearerToken(prefix)
      break
    case AuthorizationType.CUSTOM:
      authorization = getAuthorizationCustom(prefix)
      break
    case AuthorizationType.NO_AUTH:
      authorization = getAuthorizationNoAuth()
      break
    default:
      throw new Error(`Unsupported authorization type: ${authorizationType}.`)
  }

  return {
    baseURL,
    authorization,
  }
}
