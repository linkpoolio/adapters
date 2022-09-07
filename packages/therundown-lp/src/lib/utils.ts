import { utils } from 'ethers'

import {
  Market,
  SportId,
  sportIdsRequireMascot,
  statusIdToStatus,
  statusToStatusId,
} from '../lib/const'
import { Event, GameCreate, GameResolve, HomeAwayName, Team } from '../lib/types'

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

export const getHomeAwayName = (event: Event, sportId: SportId): HomeAwayName => {
  const teams =
    event.teams_normalized ??
    throwError(`Missing 'teams_normalized' in event: ${JSON.stringify(event)}`)
  const homeTeam =
    (teams.find((team) => team.is_home) as Team) ??
    throwError(`Missing home team in event: ${JSON.stringify(event)}`)
  const awayTeam =
    (teams.find((team) => team.is_away) as Team) ??
    throwError(`Missing away team in event: ${JSON.stringify(event)}`)

  let homeName: string
  let awayName: string
  if (sportIdsRequireMascot.includes(sportId)) {
    homeName = `${homeTeam.name} ${homeTeam.mascot}`
    awayName = `${awayTeam.name} ${awayTeam.mascot}`
  } else {
    homeName = homeTeam.name
    awayName = awayTeam.name
  }
  return { homeName, awayName }
}

export const getGameCreate = (event: Event, sportId: SportId): GameCreate => {
  const homeAwayName = getHomeAwayName(event, sportId)

  const gameCreate = {
    homeTeam: homeAwayName.homeName,
    awayTeam: homeAwayName.awayName,
    startTime: Math.floor(new Date(event.event_date).getTime() / 1000),
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

export const getGameResolve = (event: Event, sportId: SportId): GameResolve => {
  let homeScore: number
  let awayScore: number
  if ([SportId.MMA].includes(sportId)) {
    homeScore = event.score?.winner_home
    awayScore = event.score?.winner_away
  } else {
    homeScore = event.score?.score_home
    awayScore = event.score?.score_away
  }
  const gameResolve = {
    homeScore,
    awayScore,
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

export const encodeGameCreate = (gameCreate: GameCreate): string => {
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
