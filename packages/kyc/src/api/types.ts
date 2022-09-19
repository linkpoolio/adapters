import { IAddress } from '../models/address'
import type {
  CiphertraceAddressesGetInput,
  CiphertraceAddressesGetPayload,
  Record as CiphertraceRecord,
} from './ciphertrace/types'

export type AddressesGetInput = CiphertraceAddressesGetInput | Record<string, never>

export interface IAddresses {
  get: (input: AddressesGetInput) => Promise<IAddress>
}

export interface Base {
  addresses: IAddresses
}

export type AddressesGetPayload = CiphertraceAddressesGetPayload
export type AddressesGetPayloadItem = CiphertraceRecord
