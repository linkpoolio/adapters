import { IFloorPrice } from '../models/floorprice'
import { ITwap } from '../models/twap'

export interface IFloorPrices {
  get: (props: any) => Promise<IFloorPrice>
}

export interface ITwaps {
  get: (props: any) => Promise<ITwap>
}

export interface Base {
  floorprices: IFloorPrices
  twaps: ITwaps
}
