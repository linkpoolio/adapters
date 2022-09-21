export interface SportIdToBookmakerIds {
  [key: string]: number[]
}

export interface Team {
  name: string
  mascot: string
  is_away: boolean
  is_home: boolean
}

export interface Score {
  score_away: number
  score_home: number
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
