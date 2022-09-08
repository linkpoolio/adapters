import { util } from '@chainlink/ea-bootstrap'

import Twap from '../../models/twap'
import type { ITwap } from '../../models/twap'
import { Provider } from '../constants'

export default (fetch) => ({
  get: async ({ collectionName }): Promise<ITwap> => {
    const url = util.buildUrlPath(`twap?slug=:collectionName`, {
      collectionName,
    })
    const response = await fetch({ url })
    return Twap.Single(response.data, Provider.NFTPERP)
  },
})
