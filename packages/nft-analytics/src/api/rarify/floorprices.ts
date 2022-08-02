import { util } from '@chainlink/ea-bootstrap'

import FloorPrice from '../../models/floorprice'
import type { IFloorPrice } from '../../models/floorprice'
import type { IFloorPrices } from '../base'
import { Provider } from '../constants'

export default (fetch): IFloorPrices => ({
  get: async ({ network, collectionAddress }): Promise<IFloorPrice> => {
    const url = util.buildUrlPath(`data/contracts/:network::collectionAddress/smart-floor-price`, {
      network,
      collectionAddress,
    })
    const response = await fetch({ url })
    return FloorPrice.Single(response.data, Provider.RARIFY)
  },
})
