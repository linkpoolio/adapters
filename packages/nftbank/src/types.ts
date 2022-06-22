export interface AssetInfo {
  contract_address: string
  name: string
  symbol: string
}

export interface AssetDappInfo {
  id: string
  image_url: string
  name: string
}

export interface AssetEstimate {
  currency_symbol: string
  estimate_price: number
}

export interface AssetData {
  _id: string
  asset_contract: string
  asset_info: AssetInfo
  chain_id: string
  dapp_info: AssetDappInfo
  estimate: AssetEstimate[]
  estimated_at: string
  item_id: string
}

export interface EstimateAssetData extends AssetData {
  token_id: string
}

export interface EstimateResponseSchema {
  data: EstimateAssetData[]
  result?: {
    item_found: boolean
    estimate: number
  }
}

export interface AssetFloorPrice {
  currency_symbol: string
  floor_price: number
}

export interface FloorPriceAssetData extends AssetData {
  floor_price: AssetFloorPrice[]
}

export interface FloorPriceResponseSchema {
  data: FloorPriceAssetData[]
  result?: number
}
