import { InputParameters } from '@chainlink/types'

const inputParameters: InputParameters = {
  id: {
    description: 'Crypto to query',
    required: true,
    type: 'string',
  },
  currency: {
    description: 'Currency to compare',
    required: true,
    type: 'string',
  },
  parse: {
    description: 'Properties to return (comma separated)',
    required: false,
    type: 'string',
  },
}

export default inputParameters
