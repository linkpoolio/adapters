import { AdapterError, Requester, Validator } from '@chainlink/ea-bootstrap'
import {
  Config,
  ExecuteWithConfig,
  InputParameters,
  AxiosResponse,
  AdapterRequest,
} from '@chainlink/types'

export const supportedEndpoints = ['base64-decoder']

export const endpointResultPaths = {}

export const description = 'This is endpoint decodes from base64.'

export const inputParameters: InputParameters = {
  input: {
    description: 'Base64 to be decoded and returned.',
    required: true,
    type: 'string',
  },
}

export const execute: ExecuteWithConfig<Config> = async (request: AdapterRequest) => {
  const validator = new Validator(request, inputParameters)

  const jobRunID = validator.validated.id
  const input = validator.validated.data.input

  let result: string

  try {
    result = `0x${Buffer.from(input, 'base64').toString('hex')}`
  } catch (error) {
    throw new AdapterError({
      jobRunID,
      statusCode: 200,
      message: `Unexpected error decoding the input: ${input}. Reason: ${error}`,
      cause: error,
    })
  }

  const responseData: Partial<AxiosResponse> = {
    data: {
      result,
    },
  }

  return Requester.success(jobRunID, responseData, true)
}
