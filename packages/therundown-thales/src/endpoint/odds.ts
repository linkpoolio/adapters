import { AdapterError, Requester, Validator, util } from '@chainlink/ea-bootstrap'
import type { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'
import { join } from 'path'

import { Market, THERUNDOWN_API_MAX_LIMIT, marketToStatus } from '../lib/const'
import { encodeGameOdds } from '../lib/encoders'
import { getGameOdds } from '../lib/eventProcessors'
import { filterByEventId, filterEventStatus } from '../lib/filters'
import { sharedInputParameters } from '../lib/inputParameters'
import { getEventsPageData } from '../lib/pagination'
import type { Event, GameOdds, ResponseSchema } from '../lib/types'
import {
  validateAndGetBookmakerIdsBySportId,
  validateAndGetDate,
  validateAndGetGameIds,
  validateLimit,
  validateSportId,
  validateStartAfterGameId,
} from '../lib/validations'

export const supportedEndpoints = ['odds']
export const inputParameters: InputParameters = { ...sharedInputParameters }

export const execute: ExecuteWithConfig<Config> = async (request, _, config) => {
  const validator = new Validator(request, inputParameters)

  const jobRunID = validator.validated.id
  const sportId = validator.validated.data.sportId
  const dateRaw = validator.validated.data.date
  const gameIdsRaw = validator.validated.data.gameIds
  const sportIdToBookmakerIds = validator.validated.data.sportIdToBookmakerIds
  const limit = validator.validated.data.limit
  const startAfterGameId = validator.validated.data.startAfterGameId

  let gameIds: string[] = []
  let date: string
  let bookmakerIds: number[]
  try {
    validateSportId(sportId)
    date = validateAndGetDate(dateRaw)
    gameIds = validateAndGetGameIds(gameIdsRaw)
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
  const statuses = marketToStatus.get(Market.CREATE) as string[]
  // NB: make sure to filter first all the events and know in advance the remainder. We must
  // prevent the case where an extra request would get 0 games back. Filtering the list twice is
  // less expensive than paying an extra Chainlink request.
  const filteredEvents = events.filter((event: Event) => {
    return filterByEventId(event, gameIds) && filterEventStatus(event, statuses)
  })
  const { events: pageEvents, remainder } = getEventsPageData(
    filteredEvents,
    limit,
    startAfterGameId,
  )
  let oddsList: GameOdds[]
  let encodedOddsList: string[]
  try {
    oddsList = pageEvents.map((event: Event) => getGameOdds(event, sportId, bookmakerIds))
    encodedOddsList = oddsList.map((gameOdds: GameOdds) => encodeGameOdds(gameOdds))
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
    games: encodedOddsList,
  }
  return Requester.success(jobRunID, response, config.verbose)
}
