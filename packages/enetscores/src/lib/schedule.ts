import { datetime } from '@linkpool/shared'

import { SUPPORTED_NUMBER_OF_EVENT_PARTICIPANTS } from './constants'
import type { DailyEvent, EventParticipant, GameCreate, GameResolve } from './types'

export function validateEventAndGetEventParticipants(event: DailyEvent): EventParticipant[] {
  if (isNaN(Number(event.id)))
    throw new Error(`Invalid event 'id': ${event.id}. It is not a number`)

  const eventParticipants = Object.values(event.event_participants)
  if (Object.values(event.event_participants).length !== SUPPORTED_NUMBER_OF_EVENT_PARTICIPANTS) {
    throw new Error(`Unsupported number of event participants: ${eventParticipants.length}`)
  }
  return eventParticipants
}

export function getTeamNames(eventParticipants: EventParticipant[], eventName: string): string[] {
  const homeTeamParticipant = eventParticipants[0].participant
  if (!homeTeamParticipant) throw new Error(`Could not find 'participant' for home team`)
  const awayTeamParticipant = eventParticipants[1].participant
  if (!awayTeamParticipant) throw new Error(`Could not find 'participant' for away team`)

  const homeTeam = homeTeamParticipant.name
  if (!eventName.startsWith(homeTeam)) {
    throw new Error(
      `Unexpected error fetching the home team data. Event 'name' ('${eventName}') does not start with '${homeTeam}'`,
    )
  }
  const awayTeam = awayTeamParticipant.name
  if (!eventName.endsWith(awayTeam)) {
    throw new Error(
      `Unexpected error fetching the away team data. Event 'name' ('${eventName}') does not end with '${awayTeam}'`,
    )
  }
  return [homeTeam, awayTeam]
}

export function getGameCreate(event: DailyEvent): GameCreate {
  const eventParticipants = validateEventAndGetEventParticipants(event)
  const [homeTeam, awayTeam] = getTeamNames(eventParticipants, event.name)

  return {
    gameId: Number(event.id),
    startTime: datetime.iso8061ToTimestamp(event.startdate),
    homeTeam,
    awayTeam,
  }
}

export function getGameResolve(event: DailyEvent): GameResolve {
  const eventParticipants = validateEventAndGetEventParticipants(event)
  getTeamNames(eventParticipants, event.name) // NB: just to make sure home and away team data is right
  const homeScore = Number(Object.values(eventParticipants[0].result).reverse()[0].value)
  const awayScore = Number(Object.values(eventParticipants[1].result).reverse()[0].value)
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
