import { datetime } from '@linkpool/shared'
import { LeagueId } from './constants'

import type { GameByDate, GameCreate, GameResolve } from './types'

export function getGameCreate(game: GameByDate): GameCreate {
  return {
    gameId: game.GameID,
    startTime: datetime.iso8061ToTimestamp(`${game.DateTimeUTC}+00:00`),
    homeTeam: `0x${Buffer.from(game.HomeTeam).toString('hex')}`,
    awayTeam: `0x${Buffer.from(game.AwayTeam).toString('hex')}`,
  }
}

export function getGameResolve(game: GameByDate, leagueId: LeagueId): GameResolve {
  let homeScore: number
  let awayScore: number
  switch (leagueId) {
    case LeagueId.MLB:
      homeScore = game.HomeTeamRuns
      awayScore = game.AwayTeamRuns
      break
    default:
      throw new Error(`Unsupported 'leagueId': ${leagueId}`)
  }
  if (isNaN(homeScore)) throw new Error(`Invalid home score: ${homeScore}. It is not a number`)
  if (isNaN(awayScore)) throw new Error(`Invalid away score: ${awayScore}. It is not a number`)

  return {
    gameId: game.GameID,
    homeScore,
    awayScore,
    status: `0x${Buffer.from(game.Status).toString('hex')}`,
  }
}
