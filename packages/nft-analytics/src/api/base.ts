import { IFloorPrice } from '../models/floorprice'

export interface IFloorPrices {
  get: (props: any) => Promise<IFloorPrice>
}

export interface Base {
  floorprices: IFloorPrices
}
