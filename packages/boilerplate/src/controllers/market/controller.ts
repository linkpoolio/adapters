import { AdapterError, Requester, Validator } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig, AdapterRequest } from '@chainlink/types'
import { reducers } from '@linkpool/shared'

import api from '../../api'
import input from './input'
import type { IMarket } from '../../models/market'

const controller: ExecuteWithConfig<Config> = async (request: AdapterRequest, _, config) => {
  const validator = new Validator(request, input)
  const client = api(config)

  const jobRunID = validator.validated.id
  const id = validator.validated.data.id
  const currency = validator.validated.data.currency

  try {
    let result = await client.coins.market({ id, currency })

    const parse = validator.validated.data.parse
    if (parse) {
      result = reducers.reduceByKeys(result, parse.split(',')) as IMarket[]
    }

    return Requester.success(jobRunID, { data: result }, true)
  } catch (error) {
    throw new AdapterError({
      jobRunID,
      statusCode: 200,
      message: `Unexpected error returning market endpoint with id: ${id}. Reason: ${error}`,
      cause: error,
    })
  }
}

export default controller
