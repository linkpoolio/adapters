export interface Team {
  name: string
  market: string
  runs: number
}

export interface Game {
  id: string
  status: string
  scheduled: string
  home: Team
  away: Team
}

export interface GameElement {
  game: Game
}

export interface League {
  games: GameElement[]
}

export interface ResponseSchema {
  league: League
  result?: string[]
}

export interface GameCreate {
  gameId: string
  startTime: number
  homeTeam: string
  awayTeam: string
}

export interface GameResolve {
  gameId: string
  homeScore: number
  awayScore: number
  status: number
}
