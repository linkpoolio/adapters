import { utils } from 'ethers'
import { Logger } from '@chainlink/ea-bootstrap'

import type { GameResolve, GameCreate, Event, GameOdds, Odds } from '../lib/types'
import {
  SportId,
  Market,
  statusIdToStatus,
  statusToStatusId,
  EVENT_ODDS_EXPONENT,
  NO_EVENT_ODDS,
} from '../lib/const'

export const throwError = (message: string): never => {
  throw new Error(message)
}

export const formatNumericEnumValuesPretty = (data: Record<string, number>): string =>
  Object.values(data)
    .filter((v) => !isNaN(Number(v)))
    .join(', ')

/* *** Filtering *** */

export const filterByEventId = (event: Event, eventIds: string[]): boolean => {
  return eventIds.length === 0 || eventIds.includes(event.event_id)
}
export const filterEventStatus = (event: Event, statuses: string[]): boolean => {
  return statuses.includes(event.score.event_status)
}

/* *** Conversions, encoding and formatting *** */

export const convertEventId = (eventId: string): string => {
  const eventIdBytes = Buffer.from(eventId)
  if (eventIdBytes.length === 32) {
    return `0x${eventIdBytes.toString('hex')}`
  }
  throw new Error(`Unexpected 'event_id': ${eventId}. Expected format is 32 bytes long.`)
}

export const getOdds = (event: Event): Odds => {
  let homeOdds = 0
  let awayOdds = 0
  let drawOdds = 0
  const lines = event.lines
  if (!lines || !lines[3]?.moneyline) {
    Logger.warn({ event }, 'No lines found in event. Defaulting odds to 0.')
    return { homeOdds, awayOdds, drawOdds }
  }
  const rawOdds = event.lines[3]?.moneyline
  homeOdds =
    rawOdds.moneyline_home !== NO_EVENT_ODDS ? rawOdds.moneyline_home * EVENT_ODDS_EXPONENT : 0
  awayOdds =
    rawOdds.moneyline_away !== NO_EVENT_ODDS ? rawOdds.moneyline_away * EVENT_ODDS_EXPONENT : 0
  drawOdds =
    rawOdds.moneyline_draw !== NO_EVENT_ODDS ? rawOdds.moneyline_draw * EVENT_ODDS_EXPONENT : 0
  return { homeOdds, awayOdds, drawOdds }
}

export const getGameCreate = (event: Event): GameCreate => {
  const teams =
    event.teams_normalized ??
    throwError(`Missing 'teams_normalized' in event: ${JSON.stringify(event)}`)

  const odds = getOdds(event)

  const gameCreate = {
    homeTeam: `${teams[1].name} ${teams[1].mascot}`,
    awayTeam: `${teams[0].name} ${teams[0].mascot}`,
    startTime: Math.floor(new Date(event.event_date).getTime() / 1000),
    homeOdds: odds.homeOdds,
    awayOdds: odds.awayOdds,
    drawOdds: odds.drawOdds,
    gameId: convertEventId(event.event_id),
  }
  Object.entries(gameCreate).forEach(([key, value]) => {
    value ??
      throwError(
        `'${key}' is null or undefined: ${JSON.stringify(gameCreate)}. Event: ${JSON.stringify(
          event,
        )}`,
      )
  })

  return gameCreate
}

export const getGameResolve = (event: Event): GameResolve => {
  const gameResolve = {
    homeScore: event.score?.score_home,
    awayScore: event.score?.score_away,
    gameId: convertEventId(event.event_id),
    statusId: statusToStatusId.get(event.score?.event_status) as number,
  }
  Object.entries(gameResolve).forEach(([key, value]) => {
    value ??
      throwError(
        `'${key}' is null or undefined: ${JSON.stringify(gameResolve)}. Event: ${JSON.stringify(
          event,
        )}`,
      )
  })

  return gameResolve
}

export const getGameOdds = (event: Event): GameOdds => {
  const odds = getOdds(event)

  const gameOdds = {
    homeOdds: odds.homeOdds,
    awayOdds: odds.awayOdds,
    drawOdds: odds.drawOdds,
    gameId: convertEventId(event.event_id),
  }
  Object.entries(gameOdds).forEach(([key, value]) => {
    value ??
      throwError(
        `'${key}' is null or undefined: ${JSON.stringify(gameOdds)}. Event: ${JSON.stringify(
          event,
        )}`,
      )
  })
  return gameOdds
}

export const encodeGameCreate = (gameCreate: GameCreate): string => {
  let encodedGameCreate: string
  try {
    encodedGameCreate = utils.defaultAbiCoder.encode(
      [
        'tuple(bytes32 gameId, uint256 startTime, int24 homeOdds, int24 awayOdds, int24 drawOdds, string homeTeam, string awayTeam)',
      ],
      [gameCreate],
    )
  } catch (error) {
    throw new Error(
      `Unexpected error encoding result: '${JSON.stringify(gameCreate)}'. Reason: ${error}.`,
    )
  }

  return encodedGameCreate
}

export const encodeGameResolve = (gameResolve: GameResolve): string => {
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

export const encodeGameOdds = (gameOdds: GameOdds): string => {
  let encodedGameOdds: string
  try {
    encodedGameOdds = utils.defaultAbiCoder.encode(
      ['tuple(bytes32 gameId, int24 homeOdds, int24 awayOdds, int24 drawOdds)'],
      [gameOdds],
    )
  } catch (error) {
    throw new Error(
      `Unexpected error encoding result: '${JSON.stringify(gameOdds)}' . Reason: ${error}.`,
    )
  }
  return encodedGameOdds
}

/* *** Validations *** */

export const validateAndGetGameIds = (gameIdsRaw: string[]): string[] => {
  if (!gameIdsRaw) return []
  if (gameIdsRaw === null) return []
  gameIdsRaw.forEach((gameId: string) => {
    if (gameId.length !== 32) {
      throw new Error(`Invalid 'gameIds': ${gameId}. Expected format is 32 hex digits.`)
    }
  })

  return gameIdsRaw
}

export const validateAndGetStatusIds = (statusIdsRaw: string[]): string[] => {
  if (!statusIdsRaw) return []
  if (statusIdsRaw === null) return []
  const statusIds = statusIdsRaw.map(
    (statusId: string) => statusIdToStatus.get(Number(statusId)) as string,
  )
  statusIdsRaw.forEach((statusIdRaw: string) => {
    if (!statusIdToStatus.has(Number(statusIdRaw))) {
      throw new Error(
        `Invalid 'statusIds': ${statusIdRaw}. Valid status ID are ${[
          ...statusIdToStatus.keys(),
        ].join()}.}`,
      )
    }
  })

  return statusIds
}

export const validateMarket = (market: Market): void => {
  if (!Object.values(Market).includes(market)) {
    throw new Error(
      `Invalid 'market': ${market}. Supported values are: ${Object.values(Market).join(', ')}`,
    )
  }
}

export const validateSportId = (sportId: number): void => {
  if (!Object.values(SportId).includes(sportId as SportId)) {
    throw new Error(
      `Invalid 'sportId': ${sportId}. Supported values are: ${formatNumericEnumValuesPretty(
        SportId as unknown as Record<string, number>,
      )}`,
    )
  }
}

export const validateDate = (dateRaw: number): string => {
  if (isNaN(dateRaw)) {
    throw new Error(`Invalid 'date': ${dateRaw}. Expected formats is epoch.`)
  }
  const date = new Date(dateRaw * 1000).toISOString().split('T')[0]
  return date
}
