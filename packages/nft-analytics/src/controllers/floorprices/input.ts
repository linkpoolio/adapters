import type { InputParameters } from '@chainlink/types'

import { sharedInputParameters } from '../input'

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
