import { AdapterError, util } from '@chainlink/ea-bootstrap'
import { Config } from '@chainlink/types'

import rarify from './rarify'
import { Provider } from './constants'

export default (config: Config) => {
  const provider = util.getEnv('API_PROVIDER')

  switch (provider) {
    case Provider.RARIFY:
      return rarify(config)
    default: {
      const message = `Unsupported provider: ${provider}. Check API_PROVIDER env var`
      throw new AdapterError({
        statusCode: 200,
        message,
        cause: message,
      })
    }
  }
}
