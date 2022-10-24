import type { InputParameters } from '@chainlink/types'

import { Asset } from '../constants'
import { sharedInputParameters } from '../input'

export const getSingleInputParameters: InputParameters = {
  ...sharedInputParameters,
  asset: {
    description: 'The name of the asset.',
    required: true,
    type: 'string',
    options: [Asset.ETH, Asset.BTC],
  },
}

export const inputParameters: InputParameters = {
  ...getSingleInputParameters,
}
