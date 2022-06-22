import { AdapterError, Requester, Validator } from '@chainlink/ea-bootstrap'
import { AxiosResponse, Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'
import { utils } from 'ethers'

export const supportedEndpoints = ['contains-most-visited-location']

export interface ResponseSchema {
  res: boolean
  valid: boolean
  message: string
}

const DEFAULT_DAYS = 1
const MAX_DAYS = 21
const reCountryCode = new RegExp(/^[A-Za-z]{2}$/) // ISO 3166 alpha-2

export const inputParameters: InputParameters = {
  address: true,
  countryCodes: ['ccs', 'countryCodes'],
  days: false,
}

// NB: Solipay Internal Error on Successful response
const customError = (data: ResponseSchema) => data.res === false

export const validateCountryCodes = (countryCodes: string): void => {
  const countryCodeItems = countryCodes.split('-')
  countryCodeItems.forEach((countryCode) => {
    if (!reCountryCode.test(countryCode)) {
      throw new Error(
        `Invalid country code: ${countryCode}. Only suppoted two letter country codes separated by dashes`,
      )
    }
  })
}

export const execute: ExecuteWithConfig<Config> = async (request, _, config) => {
  const validator = new Validator(request, inputParameters)

  const jobRunID = validator.validated.id
  const address = validator.validated.data.address
  const countryCodes = validator.validated.data.countryCodes
  const days = validator.validated.data.days || DEFAULT_DAYS

  // Custom params validations
  // Wallet address
  let checksumAddress: string
  try {
    checksumAddress = utils.getAddress(address)
  } catch (error) {
    throw new AdapterError({
      jobRunID,
      message: `Invalid 'address': '${address}'. Reason: ${error}.`,
      statusCode: 400,
    })
  }
  // Country codes
  try {
    validateCountryCodes(countryCodes)
  } catch (error) {
    throw new AdapterError({
      jobRunID,
      message: `Invalid 'countryCodes' list: '${countryCodes}'. Reason: ${error}.`,
      statusCode: 400,
    })
  }
  // Days of location verification
  if (!Number.isInteger(Number(days)) || Number(days) < DEFAULT_DAYS || Number(days) > MAX_DAYS) {
    throw new AdapterError({
      jobRunID,
      message: `Invalid 'days': '${days}'. Reason: supported values are integers from 1 to 21, both included.`,
      statusCode: 400,
    })
  }
  const data = {
    country_list: countryCodes.toUpperCase(),
    secret_key: config.apiKey,
    wallet_address: checksumAddress.toLowerCase(), // NB: temporary patch whilst Solipay adds checksum support
    days_of_location_verification: days,
  }
  const options = {
    ...config.api,
    method: 'post',
    data,
  }
  const response = await Requester.request<ResponseSchema>(options, customError)

  const responseData: Partial<AxiosResponse> = {
    data: {
      ...response.data,
      result: response.data,
    },
  }

  return Requester.success(jobRunID, responseData, config.verbose)
}
