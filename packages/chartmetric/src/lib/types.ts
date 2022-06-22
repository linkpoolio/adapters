export interface CMStatistics {
  ycs_subscribers: number
  sp_monthly_listeners: number
  tiktok_followers: number
}

export interface Obj {
  cm_statistics: CMStatistics
}

export interface Statistics {
  youtube: number
  spotify: number
  tiktok: number
}

export interface ResponseSchemaAuth {
  token: string
  result?: string
}

export interface ResponseSchemaStatistics {
  obj: Obj
  result?: number
}
