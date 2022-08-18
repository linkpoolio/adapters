import { CiphertraceAddressGetPayload } from '../api/ciphertrace/types'
import { Provider } from '../api/constants'

export interface IAddress {
  address: Address
}

export interface Address {
  network: string
  address: string
  malicious: boolean
}

const transformer = {
  [Provider.CIPHERTRACE]: (payload: CiphertraceAddressGetPayload): IAddress => {
    return {
      address: {
        network: payload.Network ?? null,
        address: payload.Address ?? null,
        malicious: payload.Address === undefined ? false : true,
      },
    }
  },
}

const Single = (payload: CiphertraceAddressGetPayload, provider: Provider): IAddress =>
  transformer[provider](payload)

export default {
  Single,
}
