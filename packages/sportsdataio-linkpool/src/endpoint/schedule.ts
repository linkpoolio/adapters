import { AdapterError, Requester, util, Validator } from '@chainlink/ea-bootstrap'
import type { AdapterRequest, Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'
import { response as responseUtils, datetime, enums } from '@linkpool/shared'
import { utils } from 'ethers'
import { join } from 'path'

import {
  LeagueId,
  leagueIdRequiredEnvVar,
  leagueIdUrlPath,
  Market,
  marketResultEncode,
  Status,
} from '../lib/constants'
import { getGameCreate, getGameResolve } from '../lib/schedule'
import type { GameCreate, GameResolve, ResponseSchema } from '../lib/types'

export const supportedEndpoints = ['schedule']

export const description = 'Request games data for markets to be either created or resolved'

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
    description: 'The tournament ID: `0` (MLB)',
    options: enums.getNumericEnumValues(LeagueId as unknown as Record<string, number>),
  },
  date: {
    required: true,
    type: 'number',
    description: 'The date to request games by, as UNIX timestamp in seconds',
  },
  gameIds: {
    required: false,
    description:
      'The list of game IDs to filter by for market `1`, otherwise the value is ignored. Type: number[]',
  },
}

const customError = (data: ResponseSchema) => !Array.isArray(data)

export const execute: ExecuteWithConfig<Config> = async (
  request: AdapterRequest,
  _,
  config: Config,
) => {
  const validator = new Validator(request, inputParameters)

  const jobRunID = validator.validated.id
  const market = validator.validated.data.market as Market
  const leagueId = validator.validated.data.leagueId as number
  const apiKey = util.getRequiredEnv(leagueIdRequiredEnvVar.get(leagueId) as string)

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

  const url = util.buildUrlPath('/:leagueId/scores/json/GamesByDate/:date', {
    leagueId: leagueIdUrlPath.get(leagueId),
    date,
  })
  const params = {
    key: apiKey,
  }
  const options = { ...config.api, params, url }
  const response = await Requester.request<ResponseSchema>(options, customError)
  const games = response.data

  if (!games.length) {
    const endpointResponse = responseUtils.generateAxiosResponse([], response.status)
    return Requester.success(jobRunID, endpointResponse, config.verbose)
  }

  if (market == Market.CREATE) {
    const gameCreateList = games
      .filter((game) => game.Status === Status.SCHEDULED)
      .map((game) => {
        let gameCreate: GameCreate
        try {
          gameCreate = getGameCreate(game)
        } catch (error) {
          throw new AdapterError({
            jobRunID,
            statusCode: 200,
            message: `Unexpected error getting the game to be created from: ${JSON.stringify(
              game,
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
          utils.hexZeroPad(gameCreate.homeTeam, 10),
          utils.hexZeroPad(gameCreate.awayTeam, 10),
          utils.hexZeroPad('0x', 3), // NB: zero pad from 29 to 32 bytes
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
    const endpointResponse = responseUtils.generateAxiosResponse(
      encodedGameCreateList,
      response.status,
    )

    return Requester.success(jobRunID, endpointResponse, config.verbose)
  }

  if (market == Market.RESOLVE) {
    const gameResolveList = games
      .filter(
        (game) =>
          game.Status !== Status.SCHEDULED &&
          (gameIds.length ? gameIds.includes(game.GameID) : true),
      )
      .map((game) => {
        let gameResolve: GameResolve
        try {
          gameResolve = getGameResolve(game, leagueId)
        } catch (error) {
          throw new AdapterError({
            jobRunID,
            statusCode: 200,
            message: `Unexpected error getting the game to be resolved from: ${JSON.stringify(
              game,
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
          utils.hexZeroPad(gameResolve.status, 20),
          utils.hexZeroPad('0x', 6), // NB: zero pad from 26 to 32 bytes
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
    const endpointResponse = responseUtils.generateAxiosResponse(
      encodedGameResolveList,
      response.status,
    )

    return Requester.success(jobRunID, endpointResponse, config.verbose)
  }

  throw new Error(`Unsupported 'market': ${market}`)
}
