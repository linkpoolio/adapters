import { AdapterError, Requester, Validator, util } from '@chainlink/ea-bootstrap'
import type { AdapterRequest, Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'
import { datetime, enums, response as responseUtils } from '@linkpool/shared'
import { utils } from 'ethers'
import { join } from 'path'

import { Market, StatusType, marketResultEncode } from '../lib/constants'
import { getGameCreate, getGameResolve } from '../lib/schedule'
import type { GameCreate, GameResolve, ResponseSchema } from '../lib/types'

export const supportedEndpoints = ['schedule']

export const description =
  'Request events (games) data for markets to be either created or resolved'

export const inputParameters: InputParameters = {
  market: {
    required: true,
    type: 'number',
    description:
      'The context of the games data to be requested: `0` (markets to be created), `1` (markets to be resolved)',
    options: enums.getNumericEnumValues(Market as unknown as Record<string, number>),
  },
  leagueId: {
    required: true,
    type: 'number',
    description: 'The tournament ID',
  },
  date: {
    required: true,
    type: 'number',
    description: 'The date to request events by, as UNIX timestamp in seconds',
  },
  gameIds: {
    required: false,
    description: 'The list of game IDs to filter by for market `1`, otherwise the value is ignored',
  },
}

const customError = (data: ResponseSchema) => {
  return !(
    (Array.isArray(data.events) && !data.events.length) ||
    (typeof data.events === 'object' && !Array.isArray(data.events) && data.events !== null)
  )
}

export const execute: ExecuteWithConfig<Config> = async (
  request: AdapterRequest,
  _,
  config: Config,
) => {
  const validator = new Validator(request, inputParameters)

  const jobRunID = validator.validated.id
  const market = validator.validated.data.market as Market
  const leagueId = validator.validated.data.leagueId as number
  const gameIds = (validator.validated.data.gameIds || []) as number[]
  for (const gameId of gameIds) {
    if (typeof gameId !== 'number') {
      throw new AdapterError({
        jobRunID,
        statusCode: 400,
        message: `Invalid game ID in 'gameIds': ${gameId}. Reason: invalid type. 'gameIds' is an array of numbers`,
      })
    }
  }
  let date: string
  try {
    date = datetime.timestampToIso8061(validator.validated.data.date).split('T')[0]
  } catch (error) {
    throw new AdapterError({
      jobRunID,
      statusCode: 400,
      message: `Invalid 'date': ${validator.validated.data.date}. Reason: ${error}`,
      cause: error,
    })
  }

  const url = util.buildUrlPath('event/daily/')
  const params = {
    ...config.api.params, // NB: API credentials: username & token
    date,
    tournament_templateFK: leagueId,
  }
  const options = { ...config.api, params, url }

  const response = await Requester.request<ResponseSchema>(options, customError)
  const events = response.data.events

  if (Array.isArray(events) && !events.length) {
    const endpointResponse = responseUtils.generateAxiosResponse(events, response.status)
    return Requester.success(jobRunID, endpointResponse, config.verbose)
  }

  if (market == Market.CREATE) {
    const gameCreateList = Object.values(events)
      .filter((event) => event.status_type === StatusType.NOT_STARTED)
      .map((event) => {
        let gameCreate: GameCreate
        try {
          gameCreate = getGameCreate(event)
        } catch (error) {
          throw new AdapterError({
            jobRunID,
            statusCode: 200,
            message: `Unexpected error getting the game to be created from event: ${JSON.stringify(
              event,
            )}. Reason: ${error}`,
            cause: error,
            url: join(options.baseURL, options.url),
          })
        }
        return gameCreate
      })
    const encodedGameCreateList = gameCreateList.map((gameCreate) => {
      let encodedGameCreate: string
      try {
        encodedGameCreate = utils.solidityPack(marketResultEncode.get(market) as string[], [
          gameCreate.gameId,
          gameCreate.startTime,
          gameCreate.homeTeam.length,
          gameCreate.homeTeam,
          gameCreate.awayTeam,
        ])
      } catch (error) {
        throw new AdapterError({
          jobRunID,
          statusCode: 200,
          message: `Unexpected error encoding the game to be created: ${JSON.stringify(
            gameCreate,
          )}. Reason: ${error}`,
          cause: error,
          url: join(options.baseURL, options.url),
        })
      }
      return encodedGameCreate
    })
    response.data.result = encodedGameCreateList

    return Requester.success(jobRunID, response, config.verbose)
  }

  if (market == Market.RESOLVE) {
    const gameResolveList = Object.values(events)
      .filter(
        (event) =>
          event.status_type !== StatusType.NOT_STARTED &&
          (gameIds.length ? gameIds.includes(Number(event.id)) : true),
      )
      .map((event) => {
        let gameResolve: GameResolve
        try {
          gameResolve = getGameResolve(event)
        } catch (error) {
          throw new AdapterError({
            jobRunID,
            statusCode: 200,
            message: `Unexpected error getting the game to be resolved from event: ${JSON.stringify(
              event,
            )}. Reason: ${error}`,
            cause: error,
            url: join(options.baseURL, options.url),
          })
        }
        return gameResolve
      })
    const encodedGameResolveList = gameResolveList.map((gameResolve) => {
      let encodedGameResolve: string
      try {
        encodedGameResolve = utils.solidityPack(marketResultEncode.get(market) as string[], [
          gameResolve.gameId,
          gameResolve.homeScore,
          gameResolve.awayScore,
          gameResolve.status,
        ])
      } catch (error) {
        throw new AdapterError({
          jobRunID,
          statusCode: 200,
          message: `Unexpected error encoding the game to be resolved: ${JSON.stringify(
            gameResolve,
          )}. Reason: ${error}`,
          cause: error,
          url: join(options.baseURL, options.url),
        })
      }
      return encodedGameResolve
    })
    response.data.result = encodedGameResolveList

    return Requester.success(jobRunID, response, config.verbose)
  }

  throw new Error(`Unsupported 'market': ${market}`)
}
