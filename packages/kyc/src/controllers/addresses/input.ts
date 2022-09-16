import type { InputParameters } from '@chainlink/types'

import { sharedInputParameters } from '../input'

export const getSingleInputParameters: InputParameters = {
  ...sharedInputParameters,
  lookupAddress: {
    aliases: ['address'],
    description: 'The address to check whether is sanctioned',
    required: true,
    type: 'string',
  },
  network: {
    description: 'The network name, e.g. ETH, BTC',
    required: true,
    type: 'string',
  },
}

export const inputParameters: InputParameters = {
  ...getSingleInputParameters,
}
