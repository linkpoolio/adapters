import { utils } from 'ethers'
import { IResolve, ISchedule, IGame } from '../models/schedule'
import { ISportsDataioMLB, IapMLB } from '../models/types'
import { statusIdToStatus } from '../controllers/schedules/input'

export const validateDate = (dateRaw: number): string => {
  if (isNaN(dateRaw)) {
    throw new Error(`Invalid 'date': ${dateRaw}. Expected formats is epoch.`)
  }
  const date = new Date(dateRaw * 1000).toISOString().split('T')[0]
  return date
}

export const maxLimit = 300

export const convertEventId = (eventId: string): string => {
  const eventIdBytes = Buffer.from(eventId)
  if (eventIdBytes.length === 32) {
    return `0x${eventIdBytes.toString('hex')}`
  }
  throw new Error(`Unexpected 'event_id': ${eventId}. Expected format is 32 bytes long.`)
}

export const createEventId = (date: string, teams: string[]): string => {
  let dateString = String(Math.floor(new Date(date).getTime() / 1000))
  teams.forEach((x) => (dateString = dateString + x))
  const eventBytes = Buffer.from(dateString)
  if (eventBytes.length <= 32) {
    return utils.formatBytes32String(dateString)
  }
  throw new Error(
    `Unexpected 'event_id': ${dateString}. Expected format is 32 bytes long but got ${
      eventBytes.length
    } : 0x${eventBytes.toString('hex')}`,
  )
}

export const encodeGameCreate = (gameCreate: ISchedule): string => {
  let encodedGameCreate: string
  try {
    encodedGameCreate = utils.defaultAbiCoder.encode(
      ['tuple(bytes32 gameId, uint256 startTime, string homeTeam, string awayTeam)'],
      [gameCreate],
    )
  } catch (error) {
    throw new Error(
      `Unexpected error encoding result: '${JSON.stringify(gameCreate)}'. Reason: ${error}.`,
    )
  }

  return encodedGameCreate
}

export const encodeGameResolve = (gameResolve: IResolve): string => {
  let encodedGameResolve: string
  try {
    encodedGameResolve = utils.defaultAbiCoder.encode(
      ['tuple(bytes32 gameId, uint8 homeScore, uint8 awayScore, uint8 statusId)'],
      [gameResolve],
    )
  } catch (error) {
    throw new Error(
      `Unexpected error encoding result: '${JSON.stringify(gameResolve)}' . Reason: ${error}.`,
    )
  }

  return encodedGameResolve
}

// findScore checks the sportsdataio return object type since it changes dependent on sport
export const findScore = (object: any): number[] => {
  const score: number[] = []
  switch (true) {
    case isSDMLB(object):
      score[0] = object.HomeTeamRuns as number
      score[1] = object.AwayTeamRuns as number
      break
    case isAPMLB(object):
      score[0] = object.game.home.runs as number
      score[1] = object.game.away.runs as number
      break
    default:
      throw Error('Invalid object')
  }
  return score
}

function isSDMLB(object: unknown): object is ISportsDataioMLB {
  return Object.prototype.hasOwnProperty.call(object, 'AwayTeamRuns')
}

function isAPMLB(object: unknown): object is IapMLB {
  return Object.prototype.hasOwnProperty.call(object, 'game')
}

export const filterEventStatus = (event: IGame, statuses: string[]): boolean => {
  return statuses.includes(statusIdToStatus.get(event.statusId) as string)
}

export const convertTeam = (team: string): string => {
  if (team === 'CHW') {
    return 'CWS'
  } else {
    return team
  }
}
interface Game {
  gameId: string
}

export function validateGames<T extends Game>(...gamesList: T[][]): boolean {
  const list = new Map<string, number>()
  for (const games of gamesList) {
    for (const game of games as T[]) {
      list.set(game.gameId, (list.get(game.gameId) ?? 0) + 1)
    }
  }
  for (const v of list.values()) {
    if (v !== gamesList.length) {
      throw Error('Game aggregation failed!')
    }
  }

  return true
}
