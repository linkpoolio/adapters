import type { InputParameters } from '@chainlink/types'

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
  collectionAddress: {
    description: 'The contract address',
    required: true,
    type: 'string',
  },
  // NB: rarify currently only supports: ethereum, polygon
  network: {
    description: 'The network name, e.g. ethereum, polygon',
    required: true,
    type: 'string',
  },
}

export const inputParameters: InputParameters = {
  ...getSingleInputParameters,
}
