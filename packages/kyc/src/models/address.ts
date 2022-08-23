import { AdapterError } from '@chainlink/ea-bootstrap'

import { CiphertraceAddressGetPayload } from '../api/ciphertrace/types'
import { Provider } from '../api/constants'

export interface IAddress {
  network: string
  address: string
  isMalicious: boolean
}

const transformer = {
  [Provider.CIPHERTRACE]: (payload: CiphertraceAddressGetPayload[]): IAddress[] => {
    return payload.map((payloadAddress) => {
      return {
        network: payloadAddress.Blockchain.toUpperCase() ?? null,
        address: payloadAddress.Address.toLowerCase() ?? null,
        isMalicious: payloadAddress.Address === undefined ? false : true,
      }
    })
  },
}

const List = (payload: CiphertraceAddressGetPayload[], provider: Provider): IAddress[] => {
  let addresses: IAddress[]
  try {
    addresses = transformer[provider](payload)
  } catch (error) {
    throw new AdapterError({
      cause: error,
      message: `Unexpected error transforming the ${provider} payload: ${JSON.stringify(
        payload,
      )}. Reason: ${error}`,
      statusCode: 200,
    })
  }
  return addresses
}

export default {
  List,
}
