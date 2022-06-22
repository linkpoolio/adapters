import { AdapterError, Requester, Validator } from '@chainlink/ea-bootstrap'
import type { ExecuteWithConfig } from '@chainlink/types'
import { join } from 'path'

import type { Config } from '../config'

export const supportedEndpoints = ['auth']

export interface ResponseSchema {
  data: {
    authToken: string
  }
  result?: string
}

export const execute: ExecuteWithConfig<Config> = async (request, _, config) => {
  const validator = new Validator(request)

  const jobRunID = validator.validated.id

  config.api.headers['Access-Key'] = config.apiKey
  const options = {
    ...config.api,
    method: 'post',
    url: `/api/v3/index/${config.apiCorpCode}/auth`,
  }
  const response = await Requester.request<ResponseSchema>(options)

  const result = response.data.data?.authToken
  if (result === undefined) {
    throw new AdapterError({
      jobRunID,
      statusCode: 200,
      message: `Missing 'authToken' in response 'data': ${JSON.stringify(response.data)}`,
      url: join(options.baseURL, options.url),
    })
  }
  response.data.result = result

  return Requester.success(jobRunID, response, config.verbose)
}
