export interface Team {
  name: string
  mascot: string
}

export interface Score {
  score_away: number
  score_home: number
  event_status: string
}

export interface Event {
  score: Score
  teams_normalized: Team[]
  event_id: string
  event_date: string
}

export interface GameCreate {
  homeTeam: string
  awayTeam: string
  startTime: number
  gameId: string
}

export interface GameResolve {
  homeScore: number
  awayScore: number
  gameId: string
  statusId: number
}
