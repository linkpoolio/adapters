import { AdapterError, Requester, Validator } from '@chainlink/ea-bootstrap'
import { AdapterRequest, Config, ExecuteWithConfig } from '@chainlink/types'
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
        const chainId = getSingleValidator.validated.data.chainId as number
        const tokenId = getSingleValidator.validated.data.tokenId as number
        result = (await client.valuations.get({ chainId, collectionAddress, tokenId })) as Record<
          string,
          any
        >
        break
      }
      default:
        throw new AdapterError({
          jobRunID,
          message: `Unsupported 'method' requesting the 'valuations' endpoint: ${method}`,
          statusCode: 500,
        })
    }
  } catch (error) {
    ;(
      error as Error
    ).message = `Unexpected error requesting the 'valuations' endpoint. Reason: ${error}`
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
            message: `Unsupported 'method' reducing the 'valuations' endpoint result: ${method}`,
            statusCode: 500,
          })
      }
    } catch (error) {
      throw new AdapterError({
        cause: error,
        jobRunID,
        message: `Unexpected error reducing the 'valuations' endpoint result. Reason: ${error}. Result: ${JSON.stringify(
          result,
        )}`,
        statusCode: 500,
      })
    }
  }

  return Requester.success(jobRunID, { data: result }, true)
}

export default controller
