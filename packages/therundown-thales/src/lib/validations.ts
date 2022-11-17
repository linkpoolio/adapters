import { enums } from '@linkpool/shared'

import {
  GAME_ID_NUMBER_OF_CHARACTERS,
  MIN_LIMIT,
  Market,
  SportId,
  statusIdToStatus,
} from '../lib/const'
import type { SportIdToBookmakerIds } from '../lib/types'

export const validateAndGetBookmakerIdsBySportId = (
  sportId: SportId,
  sportIdToBookmakerIds: SportIdToBookmakerIds,
): number[] => {
  const keys = Object.keys(sportIdToBookmakerIds)
  // NB: sportId must have an Array of bookmaker IDs. Validator should prevent an empty object
  if (!keys.length || !keys.includes(sportId.toString())) {
    throw new Error(
      `Missing 'sportIdToBookmakerIds' entry for 'sportId': ${sportId}. Expected formats is an ` +
        `object with sportId as key and an Array of bookmaker IDs (Integer) as value. ` +
        `'sportIdToBookmakerIds' ${JSON.stringify(sportIdToBookmakerIds)}`,
    )
  }
  for (const [keySportId, bookmakerIds] of Object.entries(sportIdToBookmakerIds)) {
    if (!Object.values(SportId).includes(Number(keySportId) as SportId)) {
      throw new Error(
        `Unsupported 'sportId': ${keySportId}. 'sportIdToBookmakerIds': ${JSON.stringify(
          sportIdToBookmakerIds,
        )}`,
      )
    }
    if (
      !Array.isArray(bookmakerIds) ||
      !bookmakerIds.length ||
      bookmakerIds.some((bookmakerId) => !Number.isInteger(bookmakerId))
    ) {
      throw new Error(
        `Invalid bookmaker IDs by 'sportId' ${keySportId}: ${JSON.stringify(
          bookmakerIds,
        )}. Expected formats is an Array of Integer with at least one item. 'sportIdToBookmakerIds': ${JSON.stringify(
          sportIdToBookmakerIds,
        )}`,
      )
    }
  }
  return sportIdToBookmakerIds[sportId]
}

export const validateAndGetDate = (dateRaw: number): string => {
  if (isNaN(dateRaw)) {
    throw new Error(`Invalid 'date': ${dateRaw}. Expected formats is epoch`)
  }
  const date = new Date(dateRaw * 1000).toISOString().split('T')[0]
  return date
}

export const validateAndGetGameIds = (gameIdsRaw: string[]): string[] => {
  if (!gameIdsRaw) return []
  if (gameIdsRaw === null) return []
  gameIdsRaw.forEach((gameId: string) => {
    if (gameId.length !== GAME_ID_NUMBER_OF_CHARACTERS) {
      throw new Error(
        `Invalid 'gameIds': ${gameId}. Expected format is ${GAME_ID_NUMBER_OF_CHARACTERS} hex digits.`,
      )
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

export const validateLimit = (limit: number): void => {
  if (limit < MIN_LIMIT) {
    throw new Error(`Invalid 'limit': ${limit}. It has to be greater or equal than ${MIN_LIMIT}`)
  }
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
      `Invalid 'sportId': ${sportId}. Supported values are: ${enums.formatNumericEnumValuesPretty(
        SportId as unknown as Record<string, number>,
      )}`,
    )
  }
}

export const validateStartAfterGameId = (gameId: string): void => {
  if (gameId === null || gameId === undefined) return

  if (gameId.length !== GAME_ID_NUMBER_OF_CHARACTERS) {
    throw new Error(
      `Invalid 'startAfterGameId': ${gameId}. Expected format is ${GAME_ID_NUMBER_OF_CHARACTERS} hex digits`,
    )
  }
}
