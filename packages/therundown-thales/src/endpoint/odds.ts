import { Requester, Validator, AdapterError, util } from '@chainlink/ea-bootstrap'
import type { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'
import type { GameOdds, Event } from '../lib/types'
import { SportId, Market, maxLimit, marketToStatus } from '../lib/const'
import {
  filterByEventId,
  filterEventStatus,
  getGameOdds,
  validateAndGetGameIds,
  validateSportId,
  validateDate,
  encodeGameOdds,
} from '../lib/utils'

import { join } from 'path'

export const supportedEndpoints = ['odds']

export const inputParameters: InputParameters = {
  sportId: {
    description: 'The ID of the sport to query',
    required: true,
    type: 'number',
    options: [
      SportId.NFL,
      SportId.MLB,
      SportId.NBA,
      SportId.NHL,
      SportId.NCAA_Football,
      SportId.NCAA_Basketball,
      SportId.WNBA,
      SportId.MLS,
      SportId.EPL,
      SportId.FRA1,
      SportId.GER1,
      SportId.ESP1,
      SportId.ITA1,
      SportId.UEFACHAMP,
    ],
  },
  date: {
    description: 'The date of the games to query as a Unix timestamp seconds.',
    required: true,
    type: 'number',
  },
  gameIds: {
    description:
      'The IDs of games to query. Example: `["23660869053591173981da79133fe4c2","fb78cede8c9aa942b2569b048e649a3f"]`',
    required: false,
  },
}

export const execute: ExecuteWithConfig<Config> = async (request, _, config) => {
  const validator = new Validator(request, inputParameters)

  const jobRunID = validator.validated.id
  const sportId = validator.validated.data.sportId
  const dateRaw = validator.validated.data.date
  const gameIdsRaw = validator.validated.data.gameIds

  let gameIds: string[] = []
  let date: string
  try {
    validateSportId(sportId)
    date = validateDate(dateRaw)
    gameIds = validateAndGetGameIds(gameIdsRaw)
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
      statusCode: 200,
      message: `Unexpected 'events' format in data: ${events}. Expected array.`,
      url: join(reqConfig.baseURL, reqConfig.url),
    })
  }
  if (events.length === 0) {
    response.data.result = []

    return Requester.success(jobRunID, response, config.verbose)
  }

  const statuses = marketToStatus.get(Market.CREATE) as string[]

  const filteredEvents = events.filter((event: Event) => {
    return filterByEventId(event, gameIds) && filterEventStatus(event, statuses)
  })
  let oddsList: GameOdds[]
  let encodedOddsList: string[]
  try {
    oddsList = filteredEvents.map((event: Event) => getGameOdds(event))
    encodedOddsList = oddsList.map((gameOdds: GameOdds) => encodeGameOdds(gameOdds))
  } catch (error) {
    const message = (error as Error).message
    throw new AdapterError({
      jobRunID,
      statusCode: 200,
      message,
      cause: error,
      url: join(reqConfig.baseURL, reqConfig.url),
    })
  }
  response.data.result = encodedOddsList

  return Requester.success(jobRunID, response, config.verbose)
}
