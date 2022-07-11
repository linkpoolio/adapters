import { InputParameters } from '@chainlink/types'

const inputParameters: InputParameters = {
  parse: {
    description: 'Properties to return (comma separated)',
    required: false,
    type: 'string',
  },
  filter: {
    description: 'Filter by symbol (comma separated)',
    required: false,
    type: 'string',
  },
}

export default inputParameters
