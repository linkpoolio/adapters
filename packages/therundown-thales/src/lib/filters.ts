import type { Event } from './types'

export const filterByEventId = (event: Event, eventIds: string[]): boolean => {
  return eventIds.length === 0 || eventIds.includes(event.event_id)
}
export const filterEventStatus = (event: Event, statuses: string[]): boolean => {
  return statuses.includes(event.score.event_status)
}
