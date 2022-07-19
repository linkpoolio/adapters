import { AdapterError, Requester, util, Validator } from '@chainlink/ea-bootstrap'
import type { AdapterRequest, Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'
import { response as responseUtils, enums, uuid } from '@linkpool/shared'
import { utils } from 'ethers'
import { isUuid } from 'uuidv4'

import { Market, marketResultEncode, sportIdToSport, statusIdToStatus } from '../lib/constants'
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
  sportId: {
    required: true,
    type: 'number',
    description: 'The sport ID',
    options: Array.from(sportIdToSport.keys()),
  },
  date: {
    required: true,
    type: 'number',
    description: 'The date to request events by, as UNIX timestamp in seconds',
  },
  gameIds: {
    required: false,
    description: 'The list of game IDs to filter games.',
  },
}

export const execute: ExecuteWithConfig<Config> = async (
  request: AdapterRequest,
  _,
  config: Config,
) => {
  const validator = new Validator(request, inputParameters)

  const jobRunID = validator.validated.id
  const market = validator.validated.data.market as Market
  const sportId = validator.validated.data.sportId
  const gameIds = (validator.validated.data.gameIds || []) as string[]
  const dateInput = validator.validated.data.date
  for (const gameId of gameIds) {
    if (!isUuid(uuid.bytes32ToUuid(gameId))) {
      throw new AdapterError({
        jobRunID,
        statusCode: 400,
        message: `Invalid game ID in 'gameIds': ${gameId}. Reason: invalid type. 'gameIds' is an array of bytes32.`,
      })
    }
  }
  let date: Date
  try {
    date = new Date(dateInput * 1000)
  } catch (error) {
    throw new AdapterError({
      jobRunID,
      statusCode: 400,
      message: `Invalid 'date': ${dateInput}. Reason: ${error}`,
      cause: error,
    })
  }

  const url = util.buildUrlPath('/:sport/trial/v7/en/games/:year/:month/:day/boxscore.json', {
    sport: sportIdToSport.get(sportId),
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  })
  const params = {
    ...config.api.params,
    api_key: config.apiKey,
  }
  const options = { ...config.api, params, url }

  const response = await Requester.request<ResponseSchema>(options)
  const events = response.data.league?.games

  if (!Array.isArray(events)) {
    const endpointResponse = responseUtils.generateAxiosResponse([], response.status)
    return Requester.success(jobRunID, endpointResponse, config.verbose)
  }

  if (market == Market.CREATE) {
    const gameCreateList = Object.values(events)
      .filter((event) => event.game.status === statusIdToStatus.get(1))
      .map((event) => {
        let gameCreate: GameCreate
        try {
          gameCreate = getGameCreate(event.game)
        } catch (error) {
          throw new AdapterError({
            jobRunID,
            statusCode: 200,
            message: `Unexpected error getting the game to be created from event: ${JSON.stringify(
              event,
            )}. Reason: ${error}`,
            cause: error,
            url: responseUtils.getRequestUrl(response),
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
          url: responseUtils.getRequestUrl(response),
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
          event.game.status !== statusIdToStatus.get(1) &&
          (gameIds.length ? gameIds.includes(uuid.uuidToBytes32(event.game.id)) : true),
      )
      .map((event) => {
        let gameResolve: GameResolve
        try {
          gameResolve = getGameResolve(event.game)
        } catch (error) {
          throw new AdapterError({
            jobRunID,
            statusCode: 200,
            message: `Unexpected error getting the game to be resolved from event: ${JSON.stringify(
              event,
            )}. Reason: ${error}`,
            cause: error,
            url: responseUtils.getRequestUrl(response),
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
          url: responseUtils.getRequestUrl(response),
        })
      }
      return encodedGameResolve
    })
    response.data.result = encodedGameResolveList

    return Requester.success(jobRunID, response, config.verbose)
  }

  throw new Error(`Unsupported 'market': ${market}`)
}
