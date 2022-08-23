import { Logger } from '@chainlink/ea-bootstrap'
import { datetime } from '@linkpool/shared'
import { utils } from 'ethers'

import {
  EVENT_ODDS_EXPONENT,
  Market,
  NO_EVENT_ODDS,
  SportId,
  noDrawOddsSportIds,
  sportIdsRequireMascot,
  statusIdToStatus,
  statusToStatusId,
} from '../lib/const'
import type {
  Event,
  GameCreate,
  GameOdds,
  GameResolve,
  HomeAwayName,
  Odds,
  SportIdToBookmakers,
  Team,
} from '../lib/types'

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

export const getOdds = (event: Event, sportId: number, bookmakers: number[]): Odds => {
  let homeOdds = 0
  let awayOdds = 0
  let drawOdds = 0
  const lines = event.lines
  for (const [index, bookmakerId] of bookmakers.entries()) {
    const fallbackMsg =
      index === bookmakers.length - 1
        ? 'No bookmakers to fall back, returning default odds'
        : `Falling back to bookmaker with ID: ${bookmakers[index + 1]}`
    if (!lines || !lines[bookmakerId]?.moneyline) {
      Logger.warn(
        { event, sportId, bookmakers },
        `No lines found in event for bookmaker: ${bookmakerId}. ${fallbackMsg}`,
      )
      continue
    }
    const rawOdds = event.lines[bookmakerId].moneyline
    const isNoDrawOddsSport = noDrawOddsSportIds.has(sportId)
    homeOdds =
      rawOdds.moneyline_home !== NO_EVENT_ODDS ? rawOdds.moneyline_home * EVENT_ODDS_EXPONENT : 0
    awayOdds =
      rawOdds.moneyline_away !== NO_EVENT_ODDS ? rawOdds.moneyline_away * EVENT_ODDS_EXPONENT : 0
    drawOdds =
      rawOdds.moneyline_draw !== NO_EVENT_ODDS && !isNoDrawOddsSport
        ? rawOdds.moneyline_draw * EVENT_ODDS_EXPONENT
        : 0

    if (isNoDrawOddsSport) {
      if (homeOdds && awayOdds) break
    } else {
      if (homeOdds && drawOdds && awayOdds) break
    }
    Logger.warn(
      { event, sportId, bookmakers, isNoDrawOddsSport },
      `No odds found in bookmaker with ID: ${bookmakerId}. ${fallbackMsg}`,
    )
  }
  return { homeOdds, awayOdds, drawOdds }
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

export const getGameCreate = (event: Event, sportId: SportId, bookmakers: number[]): GameCreate => {
  const homeAwayName = getHomeAwayName(event, sportId)
  const odds = getOdds(event, sportId, bookmakers)

  const gameCreate = {
    homeTeam: homeAwayName.homeName,
    awayTeam: homeAwayName.awayName,
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
    lastUpdated: datetime.iso8061ToTimestamp(event.score?.updated_at),
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

export const getGameOdds = (event: Event, sportId: SportId, bookmakers: number[]): GameOdds => {
  const odds = getOdds(event, sportId, bookmakers)

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
      [
        'tuple(bytes32 gameId, uint8 homeScore, uint8 awayScore, uint8 statusId, uint40 lastUpdated)',
      ],
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

export const validateSportIdToBookmakers = (
  sportIdToBookmakers: SportIdToBookmakers,
  sportId: SportId,
): number[] => {
  if (typeof sportIdToBookmakers !== 'object' || Object.keys(sportIdToBookmakers).length === 0) {
    throw new Error(
      `Invalid 'sportIdToBookmakers': ${JSON.stringify(
        sportIdToBookmakers,
      )}. Expected formats is an object with string sport ID keys and bookmaker ID array values.`,
    )
  }
  if (!Object.keys(sportIdToBookmakers).includes(sportId.toString() as string)) {
    throw new Error(
      `The 'sportId': ${sportId} does not match with any key in 'sportIdToBookmakers': ${JSON.stringify(
        sportIdToBookmakers,
      )}`,
    )
  }
  for (const [sportId, bookmakerIds] of Object.entries(sportIdToBookmakers)) {
    if (!Object.values(SportId).includes(Number(sportId) as SportId)) {
      throw new Error(
        `Unsupported 'sportId': ${sportId}. 'sportIdToBookmakers': ${JSON.stringify(
          sportIdToBookmakers,
        )}`,
      )
    }
    if (
      !Array.isArray(bookmakerIds) ||
      bookmakerIds.some((bookmakerId) => isNaN(bookmakerId) || bookmakerId === null)
    ) {
      throw new Error(
        `Invalid 'bookmakerIds' by 'sportId' ${sportId}: ${JSON.stringify(
          bookmakerIds,
        )}. 'sportIdToBookmakers': ${JSON.stringify(
          sportIdToBookmakers,
        )}. Expected formats is an Array of bookmaker IDs (integers)`,
      )
    }
  }
  return sportIdToBookmakers[sportId]
}
