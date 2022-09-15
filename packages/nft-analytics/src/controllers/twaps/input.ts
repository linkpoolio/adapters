import type { InputParameters } from '@chainlink/types'

import { sharedInputParameters } from '../input'

export const getSingleInputParameters: InputParameters = {
  ...sharedInputParameters,
  collectionName: {
    description: 'The NFT collection name.',
    required: true,
    type: 'string',
  },
}

export const inputParameters: InputParameters = {
  ...getSingleInputParameters,
}
