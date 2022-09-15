import { AdapterError, util } from '@chainlink/ea-bootstrap'

import ciphertrace from './ciphertrace'

export default (config: Config) => {
  const provider = util.getRequiredEnv('API_PROVIDER')

  switch (provider) {
    case 'ciphertrace':
      return ciphertrace()
    default:
      throw new AdapterError({
        statusCode: 500,
        message,
        cause: message,
      })
  }
}
