import { enums } from '@linkpool/shared'

import {
  GAME_ID_NUMBER_OF_CHARACTERS,
  MIN_LIMIT,
  Market,
  SportId,
  statusIdToStatus,
} from '../lib/const'

export const validateAndGetDate = (dateRaw: number): string => {
  if (isNaN(dateRaw)) {
    throw new Error(`Invalid 'date': ${dateRaw}. Expected formats is epoch`)
  }
  const date = new Date(dateRaw * 1000).toISOString().split('T')[0]
  return date
}

export const validateAndGetStatusIds = (statusIdsRaw: string[]): string[] => {
  if (!Array.isArray(statusIdsRaw)) {
    throw new Error(
      `Invalid 'statusIds': ${JSON.stringify(
        statusIdsRaw,
      )}. Expected format is an Array of numbers`,
    )
  }
  const statusIds = statusIdsRaw.map(
    (statusId: string) => statusIdToStatus.get(Number(statusId)) as string,
  )
  statusIdsRaw.forEach((statusIdRaw: string) => {
    if (!statusIdToStatus.has(Number(statusIdRaw))) {
      throw new Error(
        `Invalid item in 'statusIds': ${statusIdRaw}. Valid status ID are ${[
          ...statusIdToStatus.keys(),
        ].join()}.}`,
      )
    }
  })

  return statusIds
}

export const validateBookmakerIds = (bookmakerIds: number[]): void => {
  if (
    !Array.isArray(bookmakerIds) ||
    !bookmakerIds.length ||
    bookmakerIds.some((bookmakerId) => !Number.isInteger(bookmakerId))
  ) {
    throw new Error(
      `Invalid 'bookmakerIDs': ${JSON.stringify(
        bookmakerIds,
      )}. Expected formats is an Array of integers with at least one item`,
    )
  }
}

export const validateGameIds = (gameIds: string[]): void => {
  if (!Array.isArray(gameIds)) {
    throw new Error(
      `Invalid 'gameIds': ${JSON.stringify(
        gameIds,
      )}. Expected format is an Array of ${GAME_ID_NUMBER_OF_CHARACTERS} hex digits items`,
    )
  }
  gameIds.forEach((gameId: string) => {
    if (gameId.length !== GAME_ID_NUMBER_OF_CHARACTERS) {
      throw new Error(
        `Invalid item in 'gameIds': ${gameId}. Expected format is ${GAME_ID_NUMBER_OF_CHARACTERS} hex digits`,
      )
    }
  })
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
