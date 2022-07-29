import { AdapterError, Requester, Validator } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig, AdapterRequest } from '@chainlink/types'

import { inputParameters } from './input'

const controller: ExecuteWithConfig<Config> = async (request: AdapterRequest, _, __) => {
  const validator = new Validator(request, inputParameters)

  const jobRunID = validator.validated.id
  const test = validator.validated.data.test

  console.log(test)

  try {
    
    return Requester.success(jobRunID, { data: [] }, true)
  } catch (error) {
    throw new AdapterError({
      jobRunID,
      statusCode: 200,
      message: `Unexpected error returning validate endpoint. Reason: ${error}`,
      cause: error,
    })
  }
}

export default controller
