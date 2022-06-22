import { AdapterError, Requester, Validator } from '@chainlink/ea-bootstrap'
import type {
  AdapterRequest,
  AxiosResponse,
  Config,
  ExecuteWithConfig,
  InputParameters,
} from '@chainlink/types'

export const supportedEndpoints = ['request-params-controller']

export const inputParameters: InputParameters = {
  params: {
    description:
      'A map containing the request parameters (i.e. the JSON object returned by the `cborparse` task)',
    required: true,
    type: 'object', // NB: only supports 'cborparse' outputs (JSON object)
  },
  optionalParams: {
    description:
      'An array that contains the optional request parameters names. These will be set to the `default` value if they are not present in `params`',
    required: true,
    type: 'array',
    // default: [], // NB: '[]' is currently not accepted as a default value
  },
  default: {
    description:
      'The value an optional parameter will be set to if it is not present in `params`. Defaults to `null`',
    required: false,
    // default: null, // NB: 'null' is currently not accepted as a default value
  },
}

export const execute: ExecuteWithConfig<Config> = async (request: AdapterRequest) => {
  const validator = new Validator(request, inputParameters)

  const jobRunID = validator.validated.id
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params = validator.validated.data.params as Record<string, any>
  const optionalParams = validator.validated.data.optionalParams as string[]
  const defaultValue = validator.validated.data.default || null

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: Record<string, any> = { ...params }
  optionalParams.forEach((optionalParam: string) => {
    if (typeof optionalParam !== 'string') {
      throw new AdapterError({
        jobRunID,
        statusCode: 400,
        message: `Unsupported type '${typeof optionalParam}' for optional parameter: ${optionalParam}. Supported types are: string`,
      })
    }
    if (!(optionalParam in params)) {
      result[optionalParam] = defaultValue
    }
  })
  const responseData: Partial<AxiosResponse> = {
    data: {
      ...result, // NB: 'result' property omitted in purpose
    },
  }
  return Requester.success(jobRunID, responseData, true)
}
