import { InputParameters } from '@chainlink/types'

const inputParameters: InputParameters = {
  jobId: {
    description: 'The job idenifier',
    required: true,
    type: 'number',
  },
  parse: {
    description: 'Properties to return (comma separated)',
    required: false,
    type: 'string',
  },
}

export default inputParameters
