import { AdapterError, util } from '@chainlink/ea-bootstrap'
import { Config } from '@chainlink/types'

import binance from './binance'
import bybit from './bybit'
import { Provider } from './constants'
import ftx from './ftx'

export default (config: Config) => {
  const provider = util.getRequiredEnv('API_PROVIDER')

  switch (provider) {
    case Provider.BINANCE:
      return binance(config)
    case Provider.BYBIT:
      return bybit(config)
    case Provider.FTX:
      return ftx(config)
    default: {
      const message = `Unsupported provider: ${provider}. Check API_PROVIDER env var`
      throw new AdapterError({
        statusCode: 500,
        message,
        cause: message,
      })
    }
  }
}
