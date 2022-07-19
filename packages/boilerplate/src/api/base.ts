import { ICoin } from '../models/coin'
import { IMarket } from '../models/market'

export interface ICoins {
  list: () => Promise<ICoin[]>
  market: (props: any) => Promise<IMarket[]>
}

export interface Base {
  coins: ICoins
}
