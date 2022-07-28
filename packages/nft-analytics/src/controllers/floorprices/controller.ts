import { AdapterError, Requester, Validator } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig, AdapterRequest } from '@chainlink/types'
import { reducers } from '@linkpool/shared'

import api from '../../api'
import { RequestMethod } from '../constants'
import { getSingleInputParameters, inputParameters } from './input'

const controller: ExecuteWithConfig<Config> = async (request: AdapterRequest, _, config) => {
  const validator = new Validator(request, inputParameters)
  const client = api(config)

  const jobRunID = validator.validated.id
  const method = validator.validated.data.method
  const parse = validator.validated.data.parse

  let result: Record<string, any> | Record<string, any>[]
  try {
    switch (method) {
      case RequestMethod.GET: {
        const getSingleValidator = new Validator(request, getSingleInputParameters)
        const collectionAddress = (
          getSingleValidator.validated.data.collectionAddress as string
        ).toLowerCase()
        const network = (getSingleValidator.validated.data.network as string).toLowerCase()
        result = (await client.floorprices.get({ collectionAddress, network })) as Record<
          string,
          any
        >
        break
      }
      default:
        throw new AdapterError({
          jobRunID,
          message: `Unsupported 'method' requesting the 'floorprices' endpoint: ${method}`,
          statusCode: 200,
        })
    }
  } catch (error) {
    ;(
      error as Error
    ).message = `Unexpected error requesting the 'floorprices' endpoint. Reason: ${error}`
    throw error
  }

  if (parse) {
    try {
      switch (method) {
        case RequestMethod.GET: {
          result = reducers.reduceByKeys([result], parse.split(','))[0]
          break
        }
        default:
          throw new AdapterError({
            jobRunID,
            message: `Unsupported 'method' reducing the 'floorprices' endpoint result: ${method}`,
            statusCode: 200,
          })
      }
    } catch (error) {
      throw new AdapterError({
        cause: error,
        jobRunID,
        message: `Unexpected error reducing the 'floorprices' endpoint result. Reason: ${error}. Result: ${JSON.stringify(
          result,
        )}`,
        statusCode: 200,
      })
    }
  }

  return Requester.success(jobRunID, { data: result }, true)
}

export default controller
