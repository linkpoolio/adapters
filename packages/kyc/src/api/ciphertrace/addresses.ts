import Address from '../../models/address'
import type { IAddress } from '../../models/address'
import { Provider, addressesGetNotFoundResult } from '../constants'
import type { AddressesGetInput, IAddresses } from '../types'
import type { CiphertraceAddressesGetPayload } from './types'

export default (fetch): IAddresses => ({
  get: async (input: AddressesGetInput): Promise<IAddress> => {
    const response = await fetch()
    if (!('Payload' in response)) {
      throw new Error(
        `Unexpected S3Client response: missing 'Payload'. Response: ${JSON.stringify(response)}`,
      )
    }

    const records = []
    try {
      for await (const val of response.Payload) {
        // TODO: missing types
        // @ts-expect-error: error TS2345: Argument of type 'any' is not assignable to parameter of type 'never'
        if (val.Records) records.push(val.Records?.Payload)
      }
    } catch (error) {
      ;(error as Error).message = `Unexpected error processing S3Client response. Reason: ${error}`
      throw error
    }
    let payloadString = Buffer.concat(records as Uint8Array[]).toString('utf8')
    payloadString = `[${payloadString.substring(0, payloadString.length - 1)}]`
    const payload = JSON.parse(payloadString) as CiphertraceAddressesGetPayload

    const addresses = Address.List(payload, Provider.CIPHERTRACE)
    const filteredAddresses = addresses.filter(
      (address: IAddress) => address.address === input.address && address.network === input.network,
    )
    return filteredAddresses.length ? filteredAddresses[0] : addressesGetNotFoundResult
  },
})
