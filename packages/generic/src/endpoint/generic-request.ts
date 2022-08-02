import { AdapterError, Logger, Requester, Validator } from '@chainlink/ea-bootstrap'
import type { ExecuteWithConfig, InputParameters, RequestConfig } from '@chainlink/types'

import { AuthorizationType, RequestMethod } from '../lib/constants'
import {
  getAuthDataAuthorizationApiKey,
  getAuthDataAuthorizationBasicAuth,
  getAuthDataAuthorizationBearerToken,
  getAuthDataAuthorizationCustom,
  getAuthDataAuthorizationNoAuth,
  getEndpointResponse,
  isWithCredentials,
  validateInputParameterIsJsonObject,
  validateInputParameterMethod,
  validateInputParameterUrl,
} from '../lib/generic-request'
import type {
  AuthData,
  AuthorizationApiKey,
  AuthorizationBasicAuth,
  AuthorizationBearerToken,
  AuthorizationCustom,
  Config,
  ResponseSchema,
} from '../lib/types'

export const supportedEndpoints = ['generic-request']

export const DEFAULT_URL = '/'
export const inputParameters: InputParameters = {
  method: false,
  url: false,
  headers: false,
  params: false,
  data: false,
}

export const execute: ExecuteWithConfig<Config> = async (
  request: RequestConfig,
  _,
  config: Config,
) => {
  if (!config.genericConfig) throw new Error(`Missing 'config.genericConfig'.`)

  const validator = new Validator(request, inputParameters)

  const jobRunID = validator.validated.id

  // NB: `null` is not defaulted in purpose in terms of providing an accurate feedback on a failed validation
  const method =
    validator.validated.data.method === undefined
      ? RequestMethod.GET
      : validator.validated.data.method
  const url = validator.validated.data.url === undefined ? '' : validator.validated.data.url
  const inputHeaders =
    validator.validated.data.headers === undefined ? {} : validator.validated.data.headers
  const inputParams =
    validator.validated.data.params === undefined ? {} : validator.validated.data.params
  const inputData = validator.validated.data.data === undefined ? {} : validator.validated.data.data

  try {
    validateInputParameterMethod(method)
    validateInputParameterUrl(url)
    validateInputParameterIsJsonObject(inputHeaders, 'headers')
    validateInputParameterIsJsonObject(inputParams, 'params')
    validateInputParameterIsJsonObject(inputData, 'data')
  } catch (error) {
    const message = (error as Error).message
    throw new AdapterError({
      jobRunID,
      message,
      statusCode: 400,
      cause: error,
    })
  }

  const authorization = config.genericConfig.authorization
  let authData: AuthData
  try {
    switch (authorization.type) {
      case AuthorizationType.API_KEY:
        authData = getAuthDataAuthorizationApiKey(authorization as AuthorizationApiKey)
        break
      case AuthorizationType.BASIC_AUTH:
        authData = getAuthDataAuthorizationBasicAuth(authorization as AuthorizationBasicAuth)
        break
      case AuthorizationType.BEARER_TOKEN:
        authData = getAuthDataAuthorizationBearerToken(authorization as AuthorizationBearerToken)
        break
      case AuthorizationType.CUSTOM:
        authData = getAuthDataAuthorizationCustom(authorization as AuthorizationCustom)
        break
      case AuthorizationType.NO_AUTH:
        authData = getAuthDataAuthorizationNoAuth()
        break
      default:
        throw new Error(`Unsupported authorization type: ${authorization.type}.`)
    }
  } catch (error) {
    throw new Error(
      `Unexpected error getting the autorization data. Authorization type: ${
        authorization.type
      }. Authorization: ${JSON.stringify(authorization)}. Reason: ${error}`,
    )
  }

  const options: Partial<RequestConfig> = {
    url,
    method,
    baseURL: config.genericConfig.baseURL,
    headers: { ...config.api.headers, ...inputHeaders, ...authData.headers },
    params: { ...inputParams, ...authData.params },
    data: { ...inputData, ...authData.data },
    timeout: config.api.timeout,
    withCredentials: isWithCredentials(authData),
  }
  // NB: this will set an `Authorization` header, overwriting any existing `Authorization` custom
  // headers you have set using `headers`. See: https://axios-http.com/docs/req_config
  if (authorization.type === AuthorizationType.BASIC_AUTH) {
    options.auth = authData.auth
  }
  Logger.debug('Request options', { options, jobRunID })

  const response = await Requester.request<ResponseSchema>(options)

  const endpointResponse = getEndpointResponse(response)

  return Requester.success(jobRunID, endpointResponse, config.verbose)
}
