import { utils } from 'ethers'
import { IResolve, ISchedule } from '../models/schedule'

export const validateDate = (dateRaw: number): string => {
  if (isNaN(dateRaw)) {
    throw new Error(`Invalid 'date': ${dateRaw}. Expected formats is epoch.`)
  }
  const date = new Date(dateRaw * 1000).toISOString().split('T')[0]
  return date
}

export const maxLimit = 500

export const convertEventId = (eventId: string): string => {
  const eventIdBytes = Buffer.from(eventId)
  if (eventIdBytes.length === 32) {
    return `0x${eventIdBytes.toString('hex')}`
  }
  throw new Error(`Unexpected 'event_id': ${eventId}. Expected format is 32 bytes long.`)
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

export const filterEventStatus = (event: Event, statuses: string[]): boolean => {
  return statuses.includes(event.score.event_status)
}
