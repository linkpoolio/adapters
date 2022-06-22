import { datetime } from '@linkpool/shared'

import type { DailyEvent, GameCreate, GameResolve } from './types'

export function getGameCreate(event: DailyEvent): GameCreate {
  if (isNaN(Number(event.id)))
    throw new Error(`Invalid event 'id': ${event.id}. It is not a number`)

  const [homeTeam, awayTeam] = event.name.split('-')

  return {
    gameId: Number(event.id),
    startTime: datetime.iso8061ToTimestamp(event.startdate),
    homeTeam,
    awayTeam,
  }
}

export function getGameResolve(event: DailyEvent): GameResolve {
  if (isNaN(Number(event.id)))
    throw new Error(`Invalid event 'id': ${event.id}. It is not a number`)

  const [homeTeam, awayTeam] = event.name.split('-')

  const eventParticipants = Object.values(event.event_participants)
  const homeTeamParticipant = eventParticipants.find(
    (eventParticipant) => eventParticipant.participant.name === homeTeam,
  )
  if (!homeTeamParticipant)
    throw new Error(`Could not find 'participant' for home team: ${homeTeam}`)
  const awayTeamParticipant = eventParticipants.find(
    (eventParticipant) => eventParticipant.participant.name === awayTeam,
  )
  if (!awayTeamParticipant)
    throw new Error(`Could not find 'participant' for away team: ${awayTeam}`)

  const homeScore = Number(Object.values(homeTeamParticipant.result).reverse()[0].value)
  const awayScore = Number(Object.values(awayTeamParticipant.result).reverse()[0].value)

  if (isNaN(Number(homeScore)))
    throw new Error(`Invalid home score: ${homeScore}. It is not a number`)
  if (isNaN(Number(awayScore)))
    throw new Error(`Invalid away score: ${awayScore}. It is not a number`)

  return {
    gameId: Number(event.id),
    homeScore,
    awayScore,
    status: event.status_type,
  }
}
