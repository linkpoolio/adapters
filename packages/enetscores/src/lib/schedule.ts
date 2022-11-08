import { datetime } from '@linkpool/shared'

import {
  EVENT_PARTICIPANTS_AWAY_TEAM_NUMBER,
  EVENT_PARTICIPANTS_HOME_TEAM_NUMBER,
  SUPPORTED_NUMBER_OF_EVENT_PARTICIPANTS,
} from './constants'
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
  const homeTeamParticipant = eventParticipants.find(
    (eventParticipant) => eventParticipant.number === EVENT_PARTICIPANTS_HOME_TEAM_NUMBER,
  )
  const awayTeamParticipant = eventParticipants.find(
    (eventParticipant) => eventParticipant.number === EVENT_PARTICIPANTS_AWAY_TEAM_NUMBER,
  )
  const homeTeam = homeTeamParticipant?.participant?.name
  if (!homeTeam) throw new Error(`Could not find home team name`)
  if (!eventName.startsWith(homeTeam)) {
    throw new Error(
      `Unexpected error fetching the home team data. Event 'name' ('${eventName}') does not start with '${homeTeam}'`,
    )
  }
  const awayTeam = awayTeamParticipant?.participant?.name
  if (!awayTeam) throw new Error(`Could not find away team name`)
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
