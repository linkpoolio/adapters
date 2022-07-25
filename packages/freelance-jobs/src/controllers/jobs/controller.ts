import { AdapterError, Requester, Validator } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig, AdapterRequest } from '@chainlink/types'
import { reducers } from '@linkpool/shared'

import api from '../../api'
import input from './input'

const controller: ExecuteWithConfig<Config> = async (request: AdapterRequest, _, config) => {
  const validator = new Validator(request, input)
  const client = api(config)

  // TODO: given the case where each endpoint (e.g. jobs) may support multiple methods, e.g. single, list, patch
  // TODO: each nested method may require different set of input parameters, e.g. jobId, jobIds
  // TODO: each nested method may have different result format, e.g. single vs array
  // TODO: it would make sense a single controller per endpoint method, e.g. jobs/single, jobs/list
  const jobRunID = validator.validated.id
  const jobId = validator.validated.data.jobId
  const parse = validator.validated.data.parse

  let result: Record<string, any>
  try {
    result = await client.jobs.single({ jobId })
  } catch (error) {
    ;(error as Error).message = `Unexpected error requesting a job. Reason: ${error}`
    throw error
  }

  if (parse) {
    try {
      result = reducers.reduceByKeys([result], parse.split(','))[0]
    } catch (error) {
      throw new AdapterError({
        cause: error,
        jobRunID,
        message: `Unexpected error reducing the jobs result. Reason: ${error}. Result: ${JSON.stringify(
          result,
        )}`,
        statusCode: 200,
      })
    }
  }
  // TODO: add support for API_VERBOSE?
  return Requester.success(jobRunID, { data: result }, true)
}

export default controller
