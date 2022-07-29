import { InputParameters } from '@chainlink/types'

export const inputParameters: InputParameters = {
    test: {
      description: 'just to test',
      required: true,
      type: 'string',
    },
  }