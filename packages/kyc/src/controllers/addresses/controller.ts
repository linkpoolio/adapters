import { AdapterError, Requester, Validator } from '@chainlink/ea-bootstrap'
import { AdapterRequest, Config, ExecuteWithConfig } from '@chainlink/types'
import { reducers } from '@linkpool/shared'

import api from '../../api'
import { Provider } from '../../api/constants'
import { SupportedApiProviderConfig } from '../../config/types'
import { RequestMethod } from '../constants'
import { validateInputNetwork } from './helpers'
import { getSingleInputParameters, inputParameters } from './input'

const controller: ExecuteWithConfig<Config> = async (request: AdapterRequest, _, config) => {
  const validator = new Validator(request, inputParameters)
  const client = api(config as SupportedApiProviderConfig)

  const jobRunID = validator.validated.id
  const method = validator.validated.data.method
  const parse = validator.validated.data.parse

  let result: Record<string, any> | Record<string, any>[]
  try {
    switch (method) {
      case RequestMethod.GET: {
        const getSingleValidator = new Validator(request, getSingleInputParameters)
        const address = getSingleValidator.validated.data.address as string
        const network = getSingleValidator.validated.data.network as string
        try {
          validateInputNetwork(
            (config as SupportedApiProviderConfig).apiProvider as Provider,
            network,
          )
        } catch (error) {
          throw new AdapterError({
            jobRunID,
            message: `${error}`,
            statusCode: 400,
          })
        }
        result = (await client.addresses.get({ network, address })) as Record<string, any>
        break
      }
      default:
        throw new AdapterError({
          jobRunID,
          message: `Unsupported 'method' requesting the 'addresses' endpoint: ${method}`,
          statusCode: 500,
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
          result = reducers.reduceByKeys([result], parse.split(','))[0]
          break
        }
        default:
          throw new AdapterError({
            jobRunID,
            message: `Unsupported 'method' reducing the 'addresses' endpoint result: ${method}`,
            statusCode: 500,
          })
      }
    } catch (error) {
      throw new AdapterError({
        cause: error,
        jobRunID,
        message: `Unexpected error reducing the 'addresses' endpoint result. Reason: ${error}. Result: ${JSON.stringify(
          result,
        )}`,
        statusCode: 500,
      })
    }
  }

  return Requester.success(jobRunID, { data: result }, true)
}

export default controller
