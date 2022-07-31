import { InputParameters } from '@chainlink/types'

export const inputParameters: InputParameters = {
  type: {
    description: 'which market to use',
    required: true,
    type: 'string',
  },
  rundown: {
    description: 'rundown DP data',
    required: false,
    type: 'array',
  },
  theap: {
    description: 'theAP DP data',
    required: false,
    type: 'array',
  },
  sdio: {
    description: 'sportsdataio DP data',
    required: false,
    type: 'array',
  },
}
