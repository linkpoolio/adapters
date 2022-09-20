import type { InputParameters } from '@chainlink/types'

import { sharedInputParameters } from '../input'

export const getSingleInputParameters: InputParameters = {
  ...sharedInputParameters,
  address: {
    description: 'The address to check',
    required: true,
    type: 'string',
  },
  // TODO: standardise supported network, although only CipherTrace requires it for now
  network: {
    description:
      'The network name, e.g. ETH, BTC. Only for the following API_PROVIDER: ciphertrace',
    required: false,
    type: 'string',
  },
}

export const inputParameters: InputParameters = {
  ...getSingleInputParameters,
}
