export interface GameByDate {
  GameID: number
  Status: string
  DateTimeUTC: string
  AwayTeam: string
  HomeTeam: string
  AwayTeamRuns: number
  HomeTeamRuns: number
}

export type ResponseSchema = GameByDate[]

export interface GameCreate {
  gameId: number
  startTime: number
  homeTeam: string
  awayTeam: string
}

export interface GameResolve {
  gameId: number
  homeScore: number
  awayScore: number
  status: string
}
