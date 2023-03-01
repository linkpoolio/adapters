export interface BitscrunchValuationsGetPayload {
  metric_values: {
    price_estimate: {
      value: number
      unit: string
    }
    price_estimate_upper_bound: {
      value: number
      unit: string
    }
    price_estimate_lower_bound: {
      value: number
      unit: string
    }
  }
}
