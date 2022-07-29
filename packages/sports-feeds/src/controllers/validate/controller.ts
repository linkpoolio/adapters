import { AdapterError, Requester, Validator } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig, AdapterRequest } from '@chainlink/types'
import { validateDate } from '../../lib/utils'

import api from '../../api'
import { inputParameters, Market, marketToStatus, validateAndGetStatusIds } from './input'

const controller: ExecuteWithConfig<Config> = async (request: AdapterRequest, _, config) => {
  const validator = new Validator(request, inputParameters)

  const jobRunID = validator.validated.id
  const sportId = validator.validated.data.sportId
  const dateRaw = validator.validated.data.date
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
