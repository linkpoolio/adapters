import { utils } from 'ethers'

import type { GameCreate, GameOdds, GameResolve } from './types'

export const encodeGameCreate = (gameCreate: GameCreate): string => {
  let encodedGameCreate: string
  try {
    encodedGameCreate = utils.defaultAbiCoder.encode(
      [
        'tuple(' +
          'bytes32 gameId,' +
          'uint40 startTime,' +
          'int24 homeOdds,' +
          'int24 awayOdds,' +
          'int24 drawOdds,' +
          'string homeTeam,' +
          'string awayTeam' +
          ')',
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

export const encodeGameResolve = (gameResolve: GameResolve, hasScoresByPeriod: boolean): string => {
  let encodedGameResolve: string
  let type: string

  switch (hasScoresByPeriod) {
    case true:
      type =
        'tuple(' +
        'bytes32 gameId,' +
        'uint8[] homeScoreByPeriod,' +
        'uint8[] awayScoreByPeriod,' +
        'uint8 statusId,' +
        'uint40 updatedAt' +
        ')'
      break
    case false:
      type =
        'tuple(' +
        'bytes32 gameId,' +
        'uint8 homeScore,' +
        'uint8 awayScore,' +
        'uint8 statusId,' +
        'uint40 updatedAt' +
        ')'
      break
    default: {
      throw new Error(`Unexpected error encoding result: '${JSON.stringify(gameResolve)}' .`)
    }
  }

  try {
    encodedGameResolve = utils.defaultAbiCoder.encode([type], [gameResolve])
  } catch (error) {
    throw new Error(`Unsupported 'hasScoresByPeriod': ${hasScoresByPeriod}`)
  }

  return encodedGameResolve
}

export const encodeGameOdds = (gameOdds: GameOdds): string => {
  let encodedGameOdds: string
  try {
    encodedGameOdds = utils.defaultAbiCoder.encode(
      [
        'tuple(' +
          'bytes32 gameId,' +
          'int24 homeOdds,' +
          'int24 awayOdds,' +
          'int24 drawOdds,' +
          'int16 spreadHome,' +
          'int24 spreadHomeOdds,' +
          'int16 spreadAway,' +
          'int24 spreadAwayOdds,' +
          'uint24 totalOver,' +
          'int24 totalOverOdds,' +
          'uint24 totalUnder,' +
          'int24 totalUnderOdds' +
          ')',
      ],
      [gameOdds],
    )
  } catch (error) {
    throw new Error(
      `Unexpected error encoding result: '${JSON.stringify(gameOdds)}' . Reason: ${error}.`,
    )
  }
  return encodedGameOdds
}
