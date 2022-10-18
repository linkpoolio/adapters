import { IAddress } from '../models/address'
import type {
  CiphertraceAddressesGetInput,
  CiphertraceAddressesGetPayload,
  Record as CiphertraceRecord,
} from './ciphertrace/types'
import type { EverestAddressesGetInput, EverestAddressesGetPayload } from './everest/types'

export type AddressesGetInput =
  | CiphertraceAddressesGetInput
  | EverestAddressesGetInput
  | Record<string, never>

export interface IAddresses {
  get: (input: AddressesGetInput) => Promise<IAddress>
}

export interface Base {
  addresses: IAddresses
}

export type AddressesGetPayloadList = CiphertraceAddressesGetPayload
export type AddressesGetPayloadSingle = CiphertraceRecord | EverestAddressesGetPayload
