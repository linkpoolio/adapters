import { datetime, errors, uuid } from '@linkpool/shared'

import { statusToStatusId } from './constants'

import type { Game, GameCreate, GameResolve } from './types'

export function getGameCreate(game: Game): GameCreate {
  const { home, away } = game
  const gameCreate = {
    gameId: uuid.uuidToBytes32(game.id),
    startTime: datetime.iso8061ToTimestamp(game.scheduled),
    homeTeam: `${home.market} ${home.name}`,
    awayTeam: `${away.market} ${away.name}`,
  }
  Object.entries(gameCreate).forEach(([key, value]) => {
    value ??
      errors.throwError(
        `'${key}' is null or undefined: ${JSON.stringify(gameCreate)}. Game: ${JSON.stringify(
          game,
        )}`,
      )
  })
  return gameCreate
}

export function getGameResolve(game: Game): GameResolve {
  const { home, away } = game
  const gameResolve = {
    gameId: uuid.uuidToBytes32(game.id),
    homeScore: home.runs,
    awayScore: away.runs,
    status: statusToStatusId.get(game.status) as number,
  }
  Object.entries(gameResolve).forEach(([key, value]) => {
    value ??
      errors.throwError(
        `'${key}' is null or undefined: ${JSON.stringify(gameResolve)}. Game: ${JSON.stringify(
          game,
        )}`,
      )
  })
  return gameResolve
}

export function stringToHex(id: string): string {
  const bytes = Buffer.from(id.replace(/-/g, ''))
  if (bytes.length === 32) {
    return `0x${bytes.toString('hex')}`
  }
  throw new Error(`Unexpected 'id': ${id}. The data type bytes32 expected length is 32.`)
}
