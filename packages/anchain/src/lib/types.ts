export interface Category {
  category: string[]
}

export interface Address {
  is_address_valid: boolean
  self: Category
}

export interface Data {
  [key: string]: Address
}

export interface ResponseSchemaSanctions {
  data: Data
}
