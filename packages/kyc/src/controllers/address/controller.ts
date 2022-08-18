import { AdapterError, Requester, Validator } from '@chainlink/ea-bootstrap'
import { AdapterRequest, Config, ExecuteWithConfig } from '@chainlink/types'
import { selectors } from '@linkpool/shared'

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
        result = (await client.addresses.get()) as Record<string, any>
        break
      }
      default:
        throw new AdapterError({
          jobRunID,
          message: `Unsupported 'method' requesting the 'addresses' endpoint: ${method}`,
          statusCode: 200,
        })
    }
  } catch (error) {
    ;(
      error as Error
    ).message = `Unexpected error requesting the 'addresses' endpoint. Reason: ${error}`
    throw error
  }

  if (parse) {
    try {
      switch (method) {
        case RequestMethod.GET: {
          const getSingleValidator = new Validator(request, getSingleInputParameters)
          const lookupAddress = (
            getSingleValidator.validated.data.lookupAddress.toLowerCase() as string
          ).toLowerCase()
          const network = (getSingleValidator.validated.data.network as string).toUpperCase()
          const filterByAddress = selectors.filterKeyValueInArray(result, 'Address', lookupAddress)
          result = selectors.filterKeyValueInArray(filterByAddress, 'Blockchain', network)
          break
        }
        default:
          throw new AdapterError({
            jobRunID,
            message: `Unsupported 'method' reducing the 'addresses' endpoint result: ${method}`,
            statusCode: 200,
          })
      }
    } catch (error) {
      throw new AdapterError({
        cause: error,
        jobRunID,
        message: `Unexpected error reducing the 'addresses' endpoint result. Reason: ${error}. Result: ${JSON.stringify(
          result,
        )}`,
        statusCode: 200,
      })
    }
  }

  return Requester.success(jobRunID, { data: result }, true)
}

export default controller
