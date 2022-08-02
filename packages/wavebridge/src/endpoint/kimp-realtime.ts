import { AdapterError, Requester, Validator } from '@chainlink/ea-bootstrap'
import type { ExecuteWithConfig } from '@chainlink/types'
import { join } from 'path'

import type { Config } from '../config'
import { execute as executeAuth } from './auth'

export const supportedEndpoints = ['kimp-realtime']

export interface KimpIndex {
  index: number
}

export interface ResponseSchema {
  data: KimpIndex[]
  result?: number
}

export const execute: ExecuteWithConfig<Config> = async (request, context, config) => {
  const validator = new Validator(request)

  const jobRunID = validator.validated.id

  const responseAuth = await executeAuth(request, context, config)

  config.api.headers['Auth-Token'] = responseAuth.data.result
  const options = {
    ...config.api,
    url: `/api/v3/index/${config.apiCorpCode}/market/KIMP_BTC_RTX`,
  }
  const response = await Requester.request<ResponseSchema>(options)

  const kimpData = response.data.data
  if (!Array.isArray(kimpData) || kimpData.length !== 1) {
    throw new AdapterError({
      jobRunID,
      statusCode: 200,
      message: `Unexpected response 'data': ${JSON.stringify(
        response.data,
      )}. Expected an array with an item.`,
      url: join(options.baseURL, options.url),
    })
  }
  const result = kimpData[0].index
  if (isNaN(Number(result))) {
    throw new AdapterError({
      jobRunID,
      statusCode: 200,
      message: `Invalid result: ${result}. It is not a number`,
      url: join(options.baseURL, options.url),
    })
  }
  response.data.result = result

  return Requester.success(jobRunID, response, config.verbose)
}
