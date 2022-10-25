import type { InputParameters } from '@chainlink/types'

import { sharedInputParameters } from '../input'

export const getSingleInputParameters: InputParameters = {
  ...sharedInputParameters,
  chainId: {
    description: 'The ID of the blockchain where the NFT collection belongs.',
    required: true,
    type: 'number',
  },
  collectionAddress: {
    description: 'The contract address of the NFT collection.',
    required: true,
    type: 'string',
  },
  tokenId: {
    description: 'The ID of the token.',
    required: true,
    type: 'number',
  },
}

export const inputParameters: InputParameters = {
  ...getSingleInputParameters,
}
