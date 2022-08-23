import { IAddress } from '../models/address'

export interface IAddresses {
  get: () => Promise<IAddress[]>
}

export interface Base {
  address: IAddresses
}
