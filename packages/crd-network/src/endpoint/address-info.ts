import { AdapterError, Requester, Validator } from '@chainlink/ea-bootstrap'
import { AxiosResponse, Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'
import { utils } from 'ethers'
import { join } from 'path'

export const supportedEndpoints = ['address-info']

export interface ResponseSchema {
  object: string
  kycId: string
  kycLevel: number
  objectType: string
}

export const inputParameters: InputParameters = {
  address: true,
}

const KYCID_BYTES_LENGTH = 22
const url = `public/address-info`

export const formatResponseData = (responseData: ResponseSchema): ResponseSchema => {
  const formattedResponseData = { ...responseData }
  // NB: when an address has KYC data `kycId` is a short uuid (22 bytes), otherwise `kycId` is an empty string "".
  // Eitherway convert always to bytes22.
  formattedResponseData.kycId = utils.hexZeroPad(
    `0x${Buffer.from(formattedResponseData.kycId).toString('hex')}`,
    KYCID_BYTES_LENGTH,
  )

  return formattedResponseData
}

export const execute: ExecuteWithConfig<Config> = async (request, _, config) => {
  const validator = new Validator(request, inputParameters)

  const jobRunID = validator.validated.id
  const address = validator.validated.data.address.toLowerCase()

  const options = {
    ...config.api,
    data: { address },
    method: 'post',
    url,
  }

  const response = await Requester.request<ResponseSchema>(options)

  let formattedResponseData
  try {
    formattedResponseData = formatResponseData(response.data)
  } catch (error) {
    throw new AdapterError({
      jobRunID,
      statusCode: 200,
      message: `Unexpected error formatting the response data: ${response.data}. Reason: ${error}`,
      cause: error,
      url: join(options.baseURL, options.url),
    })
  }
  const responseData: Partial<AxiosResponse> = {
    data: {
      ...response.data,
      result: formattedResponseData,
    },
  }

  return Requester.success(jobRunID, responseData, config.verbose)
}
