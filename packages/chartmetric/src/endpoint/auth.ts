import { AdapterError, Requester, Validator } from '@chainlink/ea-bootstrap'
import type { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'
import { join } from 'path'

import type { ResponseSchemaAuth as ResponseSchema } from '../lib/types'

export const supportedEndpoints = ['auth']

export const endpointResultPaths = {}

export const description = 'This endpoint returns bearer token in order to authorize the request.'

export const inputParameters: InputParameters = {}

export const execute: ExecuteWithConfig<Config> = async (request, _, config) => {
  const validator = new Validator(request, inputParameters)

  const jobRunID = validator.validated.id

  const data = { refreshtoken: config.apiKey }

  const options = {
    ...config.api,
    method: 'post',
    url: `/token`,
    data,
  }
  const response = await Requester.request<ResponseSchema>(options)

  const result = response.data.token

  if (result === undefined) {
    throw new AdapterError({
      jobRunID,
      statusCode: 200,
      message: `Missing 'refreshtoken' in response 'data': ${JSON.stringify(response.data)}`,
      url: join(options.baseURL, options.url),
    })
  }

  return Requester.success(jobRunID, Requester.withResult(response, result), config.verbose)
}
