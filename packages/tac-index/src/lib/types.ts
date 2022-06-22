export interface RouteData {
  route_code: string
  usd: string
  euro: string
  local: string
}

export interface ResponseSchema {
  data: RouteData[]
  result?: number
}
