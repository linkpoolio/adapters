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
  jobId: {
    description: 'The job identifier',
    required: true,
    type: 'number',
  },
}

export const inputParameters: InputParameters = {
  ...getSingleInputParameters,
}
