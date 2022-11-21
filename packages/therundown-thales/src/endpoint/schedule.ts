import { AdapterError, Requester, Validator, util } from '@chainlink/ea-bootstrap'
import type { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'
import { join } from 'path'

import {
  Endpoint,
  Market,
  THERUNDOWN_API_MAX_LIMIT,
  marketToStatus,
  marketsRequireBookmakerIds,
} from '../lib/const'
import { encodeGameCreate, encodeGameResolve } from '../lib/encoders'
import { getGameCreate, getGameResolve } from '../lib/eventProcessors'
import { filterByEventId, filterEventStatus } from '../lib/filters'
import { sharedInputParameters } from '../lib/inputParameters'
import { getEventsPageData } from '../lib/pagination'
import type { Event, GameCreate, GameResolve, ResponseSchema } from '../lib/types'
import {
  validateAndGetDate,
  validateAndGetStatusIds,
  validateBookmakerIds,
  validateGameIds,
  validateLimit,
  validateMarket,
  validateSportId,
  validateStartAfterGameId,
} from '../lib/validations'

export const supportedEndpoints = [Endpoint.SCHEDULE]
export const inputParameters: InputParameters = {
  ...sharedInputParameters,
  // Filtering params
  market: {
    description: 'Choose to create or resolve market.',
    required: true,
    type: 'string',
    options: [Market.CREATE, Market.RESOLVE],
  },
  statusIds: {
    description:
      'The statuses of the games to query in this moment. Examples: `["1","2","3"]. ' +
      'Bear in mind that the status of an unfinished game can change on the Data Provider side',
    required: false,
    default: [],
  },
  // Result format params
  hasScoresByPeriod: {
    description:
      'The scores are returned for each team as 2 uint8 arrays. ' +
      'Each element of the array represents the score from each period.',
    required: false,
    default: false,
    type: 'boolean',
  },
}

export const execute: ExecuteWithConfig<Config> = async (request, _, config) => {
  const validator = new Validator(request, inputParameters)

  const jobRunID = validator.validated.id
  const market = validator.validated.data.market
  const sportId = validator.validated.data.sportId
  const dateRaw = validator.validated.data.date
  const gameIds = validator.validated.data.gameIds
  const statusIdsRaw = validator.validated.data.statusIds
  const bookmakerIds = validator.validated.data.bookmakerIds
  const hasScoresByPeriod = validator.validated.data.hasScoresByPeriod
  const limit = validator.validated.data.limit
  const startAfterGameId = validator.validated.data.startAfterGameId

  let statusIds: string[] = []
  let date: string
  try {
    validateMarket(market as Market)
    validateSportId(sportId)
    date = validateAndGetDate(dateRaw)
    validateGameIds(gameIds)
    statusIds = validateAndGetStatusIds(statusIdsRaw)
    if (marketsRequireBookmakerIds.has(market)) {
      validateBookmakerIds(bookmakerIds)
    }
    validateLimit(limit)
    validateStartAfterGameId(startAfterGameId)
  } catch (error) {
    const message = (error as Error).message
    throw new AdapterError({
      jobRunID,
      statusCode: 400,
      message,
      cause: error,
    })
  }

  const url = util.buildUrlPath('sports/:sportId/events/:date?include=:include&limit=:limit', {
    sportId,
    date,
    include: 'scores',
    limit: THERUNDOWN_API_MAX_LIMIT,
  })
  const reqConfig = {
    ...config.api,
    headers: {
      ...config.api.headers,
      'x-rapidapi-key': config.apiKey,
    },
    url,
  }
  const response = await Requester.request<ResponseSchema>(reqConfig)

  const events: Event[] = response.data.events
  if (!Array.isArray(events)) {
    throw new AdapterError({
      jobRunID,
      message: `Unexpected 'events' format in data: ${events}. Expected array.`,
      url: join(reqConfig.baseURL, reqConfig.url),
    })
  }
  if (events.length === 0) {
    response.data.result = {
      hasMore: false,
      remainder: 0,
      games: [],
    }
    return Requester.success(jobRunID, response, config.verbose)
  }
  // NB: make sure events are sorted by `event_date` in ascending mode
  events.sort(
    (eventA, eventB) =>
      new Date(eventA.event_date).getTime() - new Date(eventB.event_date).getTime(),
  )
  if (market === Market.CREATE) {
    const statuses = marketToStatus.get(Market.CREATE) as string[]
    // NB: make sure to filter first all the events and know in advance the remainder. We must
    // prevent the case where an extra request would get 0 games back. Filtering the list twice is
    // less expensive than paying an extra Chainlink request.
    const filteredEvents = events.filter((event: Event) => {
      return filterByEventId(event, gameIds) && filterEventStatus(event, statuses)
    })
    const { events: pageEvents, remainder } = getEventsPageData(filteredEvents, {
      limit,
      startAfterGameId,
    })
    let gameCreateList: GameCreate[]
    let encodedGameCreateList: string[]
    try {
      gameCreateList = pageEvents.map((event: Event) => getGameCreate(event, sportId, bookmakerIds))
      encodedGameCreateList = gameCreateList.map((gameCreate: GameCreate) =>
        encodeGameCreate(gameCreate),
      )
    } catch (error) {
      const message = (error as Error).message
      throw new AdapterError({
        jobRunID,
        message,
        cause: error,
        url: join(reqConfig.baseURL, reqConfig.url),
      })
    }
    response.data.result = {
      hasMore: !!remainder,
      remainder,
      games: encodedGameCreateList,
    }
    return Requester.success(jobRunID, response, config.verbose)
  }

  if (market === Market.RESOLVE) {
    let statuses: string[]
    if (statusIds.length !== 0) {
      statuses = statusIds.filter(
        (statusId: string) => !(marketToStatus.get(Market.CREATE) as string[]).includes(statusId),
      )
    } else {
      statuses = marketToStatus.get(Market.RESOLVE) as string[]
    }
    // NB: make sure to filter first all the events and know in advance the remainder. We must
    // prevent the case where an extra request would get 0 games back. Filtering the list twice is
    // less expensive than paying an extra Chainlink request.
    const filteredEvents = events.filter((event: Event) => {
      return filterByEventId(event, gameIds) && filterEventStatus(event, statuses)
    })
    const { events: pageEvents, remainder } = getEventsPageData(filteredEvents, {
      limit,
      startAfterGameId,
    })
    let gameResolveList: GameResolve[]
    let encodedGameResolveList: string[]
    try {
      gameResolveList = pageEvents.map((event: Event) => getGameResolve(event, sportId))
      encodedGameResolveList = gameResolveList.map((gameResolve: GameResolve) =>
        encodeGameResolve(gameResolve, hasScoresByPeriod),
      )
    } catch (error) {
      const message = (error as Error).message
      throw new AdapterError({
        jobRunID,
        message,
        cause: error,
        url: join(reqConfig.baseURL, reqConfig.url),
      })
    }
    response.data.result = {
      hasMore: !!remainder,
      remainder,
      games: encodedGameResolveList,
    }
    return Requester.success(jobRunID, response, config.verbose)
  }

  throw new Error(`Unsupported market: ${market}`)
}
