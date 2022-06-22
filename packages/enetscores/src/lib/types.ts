export interface Participant {
  id: string
  name: string
}

export interface ParticipantResult {
  value: string
}

export interface EventParticipant {
  id: string
  result: { [key: string]: ParticipantResult }
  participant: Participant
}

export interface DailyEvent {
  id: string
  name: string
  startdate: string
  status_type: string
  event_participants: { [key: string]: EventParticipant }
}

export interface ResponseSchema {
  events: {
    [key: string]: DailyEvent
  }
  result?: string[]
}

export interface GameCreate {
  gameId: number
  startTime: number
  homeTeam: string
  awayTeam: string
}

export interface GameResolve {
  gameId: number
  homeScore: number
  awayScore: number
  status: string
}
