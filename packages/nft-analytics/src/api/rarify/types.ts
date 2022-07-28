export interface RarifyFloorPricesGetPayload {
  data: {
    id: string
    type: string
    attributes: {
      payment_asset: {
        code: string
        image_url: string
      }
      price: string
    }
  }
  included: Record<string, any>[]
}
