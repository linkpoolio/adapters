export type Prices = Array<Array<number>>

export interface Dataset {
  data: Prices
}

export interface ResponseSchemaPrice {
  dataset: Dataset
  result?: number
}

export interface FormattedPrices {
  firstHalfPrice: number
  secondHalfPrice: number
}
