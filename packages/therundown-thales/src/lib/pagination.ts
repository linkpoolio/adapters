import type { Event, EventsPageData, PaginationConfig } from '../lib/types'

export const getEventsPageData = (
  events: Event[],
  paginationConfig?: PaginationConfig,
): EventsPageData => {
  let limit
  let startAfterGameId
  if (!paginationConfig) {
    limit = events.length
    startAfterGameId = undefined
  } else {
    limit = paginationConfig.limit ?? events.length
    startAfterGameId = paginationConfig.startAfterGameId
  }
  if ((limit as number) < 1) {
    throw new Error(`Invalid 'limit': ${limit}. It must be greater or equal than 1`)
  }
  let remainder = 0
  let isBeforeGameId = true
  const pageEvents: Event[] = []
  for (const [index, event] of Object.entries(events)) {
    if (startAfterGameId && isBeforeGameId && event.event_id !== startAfterGameId) {
      continue
    }
    if (startAfterGameId && event.event_id === startAfterGameId) {
      isBeforeGameId = false
      continue
    }
    pageEvents.push(event)
    if (pageEvents.length >= limit) {
      remainder = events.length - 1 - Number(index)
      break
    }
  }
  return {
    events: pageEvents,
    remainder,
  }
}
