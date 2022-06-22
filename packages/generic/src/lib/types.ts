import type { Config as ChainlinkConfig } from '@chainlink/types'

import { AuthorizationType, CredentialsLocation } from './constants'

export type JSONValue = string | number | boolean | null | JSONObject | JSONArray

export interface JSONObject {
  [x: string]: JSONValue
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JSONArray extends Array<JSONValue> {}

export interface ResponseSchema {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>
}

export interface CredentialsBasicAuth {
  username: string
  password: string
}

export interface AuthData {
  auth: CredentialsBasicAuth | Record<never, never>
  headers: Record<string, string> | Record<never, never>
  params: Record<string, string> | Record<never, never>
  data: Record<string, string> | Record<never, never>
}

export interface Authorization {
  type: AuthorizationType
}

export interface AuthorizationApiKey extends Authorization {
  type: AuthorizationType.API_KEY
  credentials: {
    key: string
    value: string
  }
  credentialsLocation: CredentialsLocation
}

export interface AuthorizationBasicAuth extends Authorization {
  type: AuthorizationType.BASIC_AUTH
  credentials: CredentialsBasicAuth
}

export interface AuthorizationBearerToken extends Authorization {
  type: AuthorizationType.BEARER_TOKEN
  credentials: {
    token: string
  }
}

export interface AuthorizationCustom extends Authorization {
  type: AuthorizationType.CUSTOM
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers: Record<string, string>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Record<string, string>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>
}

export interface AuthorizationNoAuth extends Authorization {
  type: AuthorizationType.NO_AUTH
}

export interface GenericConfig {
  authorization: Authorization
  baseURL: string
}

export type Config = ChainlinkConfig & {
  genericConfig?: GenericConfig
}
