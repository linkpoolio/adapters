import { util } from '@chainlink/ea-bootstrap'

import Address from '../../models/address'
import type { IAddress } from '../../models/address'
import { Provider } from '../constants'
import type { AddressesGetInput, IAddresses } from '../types'

export default (fetch): IAddresses => ({
  get: async (input: AddressesGetInput): Promise<IAddress> => {
    const url = util.buildUrlPath(`everest-chainlink/status/:address`, {
      address: input.address.toLowerCase(),
    })
    const response = await fetch({ url })

    return Address.Single(response.data, Provider.EVEREST)
  },
})
