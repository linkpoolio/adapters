import { AdapterError, util } from '@chainlink/ea-bootstrap'

import ciphertrace from './ciphertrace'

export default () => {
  const provider = util.getEnv('API_PROVIDER')

  switch (provider) {
    case 'ciphertrace':
      return ciphertrace()
    default:
      throw new AdapterError({
        statusCode: 200,
        message: 'Data provider not specified',
        cause: 'Data provider not specified',
      })
  }
}
