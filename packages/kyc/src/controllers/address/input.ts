import { InputParameters } from '@chainlink/types'

import { RequestMethod } from '../constants'

export const sharedInputParameters: InputParameters = {
  method: {
    description: 'The endpoint request method',
    required: true,
    type: 'string',
    options: [RequestMethod.GET],
  },
  parse: {
    description: 'Properties to return (comma separated)',
    required: false,
    type: 'string',
  },
}

export const getSingleInputParameters: InputParameters = {
  ...sharedInputParameters,
  lookupAddress: {
    description: 'The address to check if sanctioned.',
    required: true,
    type: 'string',
  },
  // NB: Ciphertrace currently only supports: ethereum, bitcoin
  network: {
    description: 'The network name, e.g. ETH, BTC',
    required: true,
    type: 'string',
  },
}

export const inputParameters: InputParameters = {
  ...getSingleInputParameters,
}
