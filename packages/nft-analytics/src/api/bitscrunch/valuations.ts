import { util } from '@chainlink/ea-bootstrap'

import type { IValuation } from '../../models/valuation'
import Valuation from '../../models/valuation'
import { Provider } from '../constants'

export default (fetch) => ({
  get: async ({ chainId, collectionAddress, tokenId }): Promise<IValuation> => {
    const url = util.buildUrlPath(
      `api/v1/nft/:chainId/:collectionAddress/:tokenId/price-estimate`,
      {
        chainId,
        collectionAddress,
        tokenId,
      },
    )
    const response = await fetch({ url })
    return Valuation.Single(response.data, Provider.BITSCRUNCH)
  },
})
