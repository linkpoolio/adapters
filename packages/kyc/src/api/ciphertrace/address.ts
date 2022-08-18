import Address, { IAddress } from '../../models/address'
import { IAddresses } from '../base'
import { Provider } from '../constants'

export default (fetch): IAddresses => ({
  get: async (): Promise<IAddress> => {
    const response = await fetch()
  
    return Address.Single(response.data, Provider.CIPHERTRACE)
  },
})
