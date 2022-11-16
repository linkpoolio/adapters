import { Logger } from '@chainlink/ea-bootstrap'
import { datetime, errors } from '@linkpool/shared'

import {
  EVENT_ODDS_EXPONENT,
  GAME_ID_NUMBER_OF_CHARACTERS,
  NO_EVENT_ODDS,
  SportId,
  WORLD_CUP_SCORE_PERIOD,
  noDrawOddsSportIds,
  sportIdsRequireMascot,
  statusToStatusId,
} from './const'
import type { Event, GameCreate, GameOdds, GameResolve, HomeAwayName, Odds, Team } from './types'

export const convertEventId = (eventId: string): string => {
  const eventIdBytes = Buffer.from(eventId)
  if (eventIdBytes.length === GAME_ID_NUMBER_OF_CHARACTERS) {
    return `0x${eventIdBytes.toString('hex')}`
  }
  throw new Error(`Unexpected 'event_id': ${eventId}. Expected format is 32 bytes long.`)
}

export const getGameCreate = (event: Event, sportId: SportId, bookmakers: number[]): GameCreate => {
  const homeAwayName = getHomeAwayName(event, sportId)
  const odds = getOdds(event, sportId, bookmakers)

  const gameCreate = {
    homeTeam: homeAwayName.homeName,
    awayTeam: homeAwayName.awayName,
    startTime: Math.floor(new Date(event.event_date).getTime() / 1000),
    homeOdds: odds.homeOdds,
    awayOdds: odds.awayOdds,
    drawOdds: odds.drawOdds,
    gameId: convertEventId(event.event_id),
  }
  Object.entries(gameCreate).forEach(([key, value]) => {
    value ??
      errors.throwError(
        `'${key}' is null or undefined: ${JSON.stringify(gameCreate)}. Event: ${JSON.stringify(
          event,
        )}`,
      )
  })

  return gameCreate
}

export const getGameOdds = (event: Event, sportId: SportId, bookmakerIds: number[]): GameOdds => {
  const odds = getOdds(event, sportId, bookmakerIds)

  const gameOdds = {
    homeOdds: odds.homeOdds,
    awayOdds: odds.awayOdds,
    drawOdds: odds.drawOdds,
    gameId: convertEventId(event.event_id),
  }
  Object.entries(gameOdds).forEach(([key, value]) => {
    value ??
      errors.throwError(
        `'${key}' is null or undefined: ${JSON.stringify(gameOdds)}. Event: ${JSON.stringify(
          event,
        )}`,
      )
  })
  return gameOdds
}

export const getGameResolve = (event: Event, sportId: SportId): GameResolve => {
  let homeScore: number
  let awayScore: number
  switch (sportId) {
    case SportId.MMA:
      homeScore = event.score?.winner_home
      awayScore = event.score?.winner_away
      break
    case SportId.FIFA:
      homeScore = getSumOfScores(event.score?.score_home_by_period, WORLD_CUP_SCORE_PERIOD)
      awayScore = getSumOfScores(event.score?.score_away_by_period, WORLD_CUP_SCORE_PERIOD)
      break
    default:
      homeScore = event.score?.score_home
      awayScore = event.score?.score_away
      break
  }

  const gameResolve: GameResolve = {
    homeScore,
    awayScore,
    homeScoreByPeriod: event.score?.score_home_by_period,
    awayScoreByPeriod: event.score?.score_away_by_period,
    gameId: convertEventId(event.event_id),
    statusId: statusToStatusId.get(event.score?.event_status) as number,
    updatedAt: datetime.iso8061ToTimestamp(event.score?.updated_at),
  }

  Object.entries(gameResolve).forEach(([key, value]) => {
    value ??
      errors.throwError(
        `'${key}' is null or undefined: ${JSON.stringify(gameResolve)}. Event: ${JSON.stringify(
          event,
        )}`,
      )
  })

  return gameResolve
}

export const getHomeAwayName = (event: Event, sportId: SportId): HomeAwayName => {
  const teams =
    event.teams_normalized ??
    errors.throwError(`Missing 'teams_normalized' in event: ${JSON.stringify(event)}`)
  const homeTeam =
    (teams.find((team) => team.is_home) as Team) ??
    errors.throwError(`Missing home team in event: ${JSON.stringify(event)}`)
  const awayTeam =
    (teams.find((team) => team.is_away) as Team) ??
    errors.throwError(`Missing away team in event: ${JSON.stringify(event)}`)

  let homeName: string
  let awayName: string
  if (sportIdsRequireMascot.includes(sportId)) {
    homeName = `${homeTeam.name} ${homeTeam.mascot}`
    awayName = `${awayTeam.name} ${awayTeam.mascot}`
  } else {
    homeName = homeTeam.name
    awayName = awayTeam.name
  }
  return { homeName, awayName }
}

export const getOdds = (event: Event, sportId: number, bookmakerIds: number[]): Odds => {
  if (!bookmakerIds.length) {
    throw new Error(`Unexpected Array of bookmaker IDs. It can't be empty`)
  }
  const lines = event.lines
  const bookmakerIdsLastIndex = bookmakerIds.length - 1
  for (const [index, bookmakerId] of bookmakerIds.entries()) {
    const fallbackMsg =
      index === bookmakerIdsLastIndex
        ? 'No bookmaker to fall back, returning default odds'
        : `Falling back to bookmaker with ID: ${bookmakerIds[index + 1]}`
    if (!lines || !lines[bookmakerId]?.moneyline) {
      Logger.warn(
        { event, sportId, bookmakerIds },
        `No lines found in event for bookmaker with ID: ${bookmakerId}. ${fallbackMsg}`,
      )
      continue
    }
    const rawOdds = event.lines[bookmakerId].moneyline
    const isNoDrawOddsSport = noDrawOddsSportIds.has(sportId)
    const homeOdds =
      rawOdds.moneyline_home !== NO_EVENT_ODDS ? rawOdds.moneyline_home * EVENT_ODDS_EXPONENT : 0
    const awayOdds =
      rawOdds.moneyline_away !== NO_EVENT_ODDS ? rawOdds.moneyline_away * EVENT_ODDS_EXPONENT : 0
    const drawOdds =
      rawOdds.moneyline_draw !== NO_EVENT_ODDS && !isNoDrawOddsSport
        ? rawOdds.moneyline_draw * EVENT_ODDS_EXPONENT
        : 0

    if (isNoDrawOddsSport) {
      if (homeOdds && awayOdds) {
        return { homeOdds, awayOdds, drawOdds }
      }
    } else {
      if (
        (homeOdds && drawOdds && awayOdds) ||
        (homeOdds && awayOdds && index === bookmakerIdsLastIndex)
      )
        return { homeOdds, awayOdds, drawOdds }
    }
    Logger.warn(
      { event, sportId, bookmakerIds, isNoDrawOddsSport },
      `No odds found in bookmaker with ID: ${bookmakerId}. ${fallbackMsg}`,
    )
  }
  return { homeOdds: 0, awayOdds: 0, drawOdds: 0 }
}

export const getSumOfScores = (scores: number[], period: number): number => {
  let sumOfScores = 0
  const scoresLength = scores.length
  if (!scoresLength) return sumOfScores
  for (let i = 0; i < period; i++) {
    sumOfScores += scores[i]
    if (i === scoresLength - 1) break
  }
  return sumOfScores
}
