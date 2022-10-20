import { AdapterError, util } from '@chainlink/ea-bootstrap'
import { Config } from '@chainlink/types'

import bitscrunch from './bitscrunch'
import { Provider } from './constants'
import nftperp from './nftperp'
import rarify from './rarify'

export default (config: Config) => {
  const provider = util.getRequiredEnv('API_PROVIDER')

  switch (provider) {
    case Provider.BITSCRUNCH:
      return bitscrunch(config)
    case Provider.NFTPERP:
      return nftperp(config)
    case Provider.RARIFY:
      return rarify(config)
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
