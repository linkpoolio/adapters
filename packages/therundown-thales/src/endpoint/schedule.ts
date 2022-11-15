import { AdapterError, Requester, Validator, util } from '@chainlink/ea-bootstrap'
import type { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'
import { join } from 'path'

import { Market, marketToStatus, maxLimit, supportedSportIdSchedule } from '../lib/const'
import type { Event, GameCreate, GameResolve } from '../lib/types'
import {
  encodeGameCreate,
  encodeGameResolve,
  filterByEventId,
  filterEventStatus,
  getGameCreate,
  getGameResolve,
  validateAndGetBookmakerIdsBySportId,
  validateAndGetDate,
  validateAndGetGameIds,
  validateAndGetStatusIds,
  validateLimit,
  validateMarket,
  validateSportId,
  validateStartAfterGameId,
} from '../lib/utils'

export const supportedEndpoints = ['schedule']

export const inputParameters: InputParameters = {
  // Filtering params
  market: {
    description: 'Choose to create or resolve market.',
    required: true,
    type: 'string',
    options: [Market.CREATE, Market.RESOLVE],
  },
  sportId: {
    description: 'The ID of the sport to query.',
    required: true,
    type: 'number',
    options: supportedSportIdSchedule,
  },
  date: {
    description: 'The date of the games to query as a Unix timestamp seconds.',
    required: true,
    type: 'number',
  },
  gameIds: {
    description:
      'The IDs of games to query. Example: `["23660869053591173981da79133fe4c2","fb78cede8c9aa942b2569b048e649a3f"]`.',
    required: false,
  },
  statusIds: {
    description:
      'The statuses of the games to query in this moment. Examples: `["1","2","3"]. ' +
      'Bear in mind that the status of an unfinished game can change on the Data Provider side',
    required: false,
  },
  // Odds logic params
  sportIdToBookmakerIds: {
    description:
      `A JSON object with sportId as key and an Array of bookmaker IDs (Integer) as value. ` +
      `The order of the bookmaker IDs sets the priority for where to fetch the game odds.`,
    required: true,
  },
  // Result format params
  hasScoresByPeriod: {
    description:
      'The scores are returned for each team as 2 uint8 arrays. ' +
      'Each element of the array represents the score from each period.',
    required: false,
    type: 'boolean',
  },
  // Pagination params
  // NB: do not default `limit` as it will vary depending on the combination of sportId, market and network
  limit: {
    description: `The maximum number of results to be returned. The minumum value is \`1\``,
    required: true,
    type: 'number',
  },
  startAfterGameId: {
    description:
      'A cursor for use in pagination. It is the game ID that defines your place in the ' +
      'list and after which game start fetching new results.',
    required: false,
    type: 'string',
  },
}

export const execute: ExecuteWithConfig<Config> = async (request, _, config) => {
  const validator = new Validator(request, inputParameters)

  const jobRunID = validator.validated.id
  const market = validator.validated.data.market
  const sportId = validator.validated.data.sportId
  const dateRaw = validator.validated.data.date
  const gameIdsRaw = validator.validated.data.gameIds
  const statusIdsRaw = validator.validated.data.statusIds
  const sportIdToBookmakerIds = validator.validated.data.sportIdToBookmakerIds
  const hasScoresByPeriod = validator.validated.data.hasScoresByPeriod
  const limit = validator.validated.data.limit
  const startAfterGameId = validator.validated.data.startAfterGameId

  let gameIds: string[] = []
  let statusIds: string[] = []
  let date: string
  let bookmakerIds: number[]

  try {
    validateMarket(market as Market)
    validateSportId(sportId)
    date = validateAndGetDate(dateRaw)
    gameIds = validateAndGetGameIds(gameIdsRaw)
    statusIds = validateAndGetStatusIds(statusIdsRaw)
    bookmakerIds = validateAndGetBookmakerIdsBySportId(sportId, sportIdToBookmakerIds)
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
    limit: maxLimit,
  })

  const reqConfig = {
    ...config.api,
    headers: {
      ...config.api.headers,
      'x-rapidapi-key': config.apiKey,
    },

    url,
  }

  const response = await Requester.request(reqConfig)

  const events: Event[] = response.data.events

  if (!Array.isArray(events)) {
    throw new AdapterError({
      jobRunID,
      message: `Unexpected 'events' format in data: ${events}. Expected array.`,
      url: join(reqConfig.baseURL, reqConfig.url),
    })
  }
  if (events.length === 0) {
    response.data.result = []

    return Requester.success(jobRunID, response, config.verbose)
  }

  // TODO: sort items by date and something else?
  // TODO: filter by startAfterGameId (if exists), and break at limit (if exists). Create a proper
  // filtering function... requires breaking for..of loop.
  // TODO: shape the response including 'hasMore', also add in the JSON result the latest gameId.
  if (market === Market.CREATE) {
    const statuses = marketToStatus.get(Market.CREATE) as string[]
    const filteredEvents = events.filter((event: Event) => {
      return filterByEventId(event, gameIds) && filterEventStatus(event, statuses)
    })
    let gameCreateList: GameCreate[]
    let encodedGameCreateList: string[]
    try {
      gameCreateList = filteredEvents.map((event: Event) =>
        getGameCreate(event, sportId, bookmakerIds),
      )
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
    response.data.result = encodedGameCreateList

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

    const filteredEvents = events.filter((event: Event) => {
      return filterByEventId(event, gameIds) && filterEventStatus(event, statuses)
    })
    let gameResolveList: GameResolve[]
    let encodedGameResolveList: string[]
    try {
      gameResolveList = filteredEvents.map((event: Event) => getGameResolve(event, sportId))
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
    response.data.result = encodedGameResolveList

    return Requester.success(jobRunID, response, config.verbose)
  }

  throw new Error(`Unsupported market: ${market}`)
}
