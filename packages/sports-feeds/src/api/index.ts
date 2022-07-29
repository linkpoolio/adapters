import { AdapterError, util } from '@chainlink/ea-bootstrap'
import { Config } from '@chainlink/types'

import therundown from './therundown'
import sportsdataio from './sportsdataio'
import theAP from './theAP'

export default (config: Config) => {
  const provider = util.getEnv('API_PROVIDER')

  switch (provider) {
    case 'therundown':
      return therundown(config)
    case 'sportsdataio':
      return sportsdataio(config)
    case 'theAP':
      return theAP(config)
    default:
      throw new AdapterError({
        statusCode: 200,
        message: 'Data provider not specified',
        cause: 'Data provider not specified',
      })
  }
}
