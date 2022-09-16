import { AdapterError } from '@chainlink/ea-bootstrap'

import type { AddressesGetPayload, AddressesGetPayloadItem } from '../api/base'
import type { Record } from '../api/ciphertrace/types'
import { Provider } from '../api/constants'

export interface IAddress {
  network: string
  address: string
  isMalicious: boolean
}

const transformer = {
  [Provider.CIPHERTRACE]: (record: Record): IAddress => ({
    network: record.Blockchain.toUpperCase() ?? null,
    address: record.Address.toLowerCase() ?? null,
    isMalicious: record.Address === undefined ? false : true,
  }),
}

const Single = (payloadItem: AddressesGetPayloadItem, provider: Provider): IAddress => {
  let address: IAddress
  try {
    address = transformer[provider](payloadItem)
  } catch (error) {
    throw new AdapterError({
      cause: error,
      message: `Unexpected error transforming the ${provider} payload item: ${JSON.stringify(
        payloadItem,
      )}. Reason: ${error}`,
      statusCode: 500,
    })
  }
  return address
}

const List = (payload: AddressesGetPayload, provider: Provider): IAddress[] =>
  payload.map((payloadItem: AddressesGetPayloadItem) => Single(payloadItem, provider))

export default {
  List,
  Single,
}
