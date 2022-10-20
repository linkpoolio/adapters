import { IFloorPrice } from '../models/floorprice'
import { ITwap } from '../models/twap'
import { IValuation } from '../models/valuation'

export interface IFloorPrices {
  get: (props: any) => Promise<IFloorPrice>
}

export interface ITwaps {
  get: (props: any) => Promise<ITwap>
}

export interface IValuations {
  get: (props: any) => Promise<IValuation>
}

export interface Base {
  floorprices: IFloorPrices
  twaps: ITwaps
  valuations: IValuations
}
