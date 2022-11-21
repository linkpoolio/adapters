export interface Team {
  name: string
  mascot: string
  is_away: boolean
  is_home: boolean
}

export interface Score {
  score_away: number
  score_home: number
  score_home_by_period: number[]
  score_away_by_period: number[]
  winner_away: number
  winner_home: number
  event_status: string
  updated_at: string
}

export interface Moneyline {
  moneyline_away: number
  moneyline_home: number
  moneyline_draw: number
}

export interface Line {
  moneyline: Moneyline
}

export interface Event {
  score: Score
  teams_normalized: Team[]
  event_id: string
  event_date: string
  lines: Line[]
}

export interface HomeAwayName {
  homeName: string
  awayName: string
}

export interface GameCreate {
  homeTeam: string
  awayTeam: string
  startTime: number
  homeOdds: number
  awayOdds: number
  drawOdds: number
  gameId: string
}

export interface GameResolve {
  homeScore: number
  awayScore: number
  homeScoreByPeriod: number[]
  awayScoreByPeriod: number[]
  gameId: string
  statusId: number
  updatedAt: number
}

export interface GameCreateOdds {
  homeOdds: number
  awayOdds: number
  drawOdds: number
}

export interface GameOdds {
  homeOdds: number
  awayOdds: number
  drawOdds: number
  gameId: string
}

export interface Odds {
  homeOdds: number
  awayOdds: number
  drawOdds: number
}

export interface OddsEndpointResult {
  hasMore: boolean
  remainder: number
  games: string[]
}

export interface ScheduleEndpointResult {
  hasMore: boolean
  remainder: number
  games: string[]
}

export type ExternalAdapterResult = OddsEndpointResult | ScheduleEndpointResult
export interface ResponseSchema {
  events: Event[]
  result?: ExternalAdapterResult
}

export interface PaginationConfig {
  limit?: number
  startAfterGameId?: string
}

export interface EventsPageData {
  events: Event[]
  remainder: number
}
