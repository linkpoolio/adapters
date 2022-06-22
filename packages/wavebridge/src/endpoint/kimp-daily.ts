import { AdapterError, Requester, Validator } from '@chainlink/ea-bootstrap'
import type { ExecuteWithConfig, InputParameters } from '@chainlink/types'
import { join } from 'path'

import { execute as executeAuth } from './auth'
import type { Config } from '../config'
import { validateDate } from '../lib/validations'
import { ONE_DAY_IN_MILLISECONDS } from '../lib/constants'

export const supportedEndpoints = ['kimp-daily']

export interface KimpIndex {
  index: number
}

export interface ResponseSchema {
  data: KimpIndex[]
  result?: number
}

export const inputParameters: InputParameters = {
  date: {
    description:
      'The date of the Index (as `YYYY-MM-DD`). Set to yesterday by the API if it is not present',
    // type: 'string', // NB: disabled to allow sending null (via request-params-controller)
    required: false,
  },
}

export const execute: ExecuteWithConfig<Config> = async (request, context, config) => {
  const validator = new Validator(request, inputParameters)

  const jobRunID = validator.validated.id
  const date = validator.validated.data.date

  let startDateEpoch: number | undefined = undefined
  let endDateEpoch: number | undefined = undefined

  if (date) {
    try {
      validateDate(date)
    } catch (error) {
      const message = (error as Error).message
      throw new AdapterError({
        jobRunID,
        message,
        statusCode: 400,
      })
    }
    startDateEpoch = new Date(date).getTime()
    endDateEpoch = startDateEpoch + ONE_DAY_IN_MILLISECONDS
  }

  const responseAuth = await executeAuth(request, context, config)

  let params = {}
  if (startDateEpoch !== undefined && endDateEpoch !== undefined) {
    params = {
      startDateEpoch,
      endDateEpoch,
    }
  }
  config.api.headers['Auth-Token'] = responseAuth.data.result
  const options = {
    ...config.api,
    params,
    url: `/api/v3/index/${config.apiCorpCode}/market/KIMP_BTC_DX`,
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
