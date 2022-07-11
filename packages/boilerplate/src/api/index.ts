import { AdapterError, util } from '@chainlink/ea-bootstrap'
import { Config } from '@chainlink/types'

import coingecko from './coingecko'
import coinmarketcap from './coinmarketcap'

export default (config: Config) => {
  const provider = util.getEnv('API_PROVIDER')

  switch (provider) {
    case 'coinmarketcap':
      return coinmarketcap(config)
    case 'coingecko':
      return coingecko(config)
    default:
      throw new AdapterError({
        statusCode: 200,
        message: `Data provider not specified`,
        cause: 'Data provider not specified',
      })
  }
}
