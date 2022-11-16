import type { Event, EventsPageData } from '../lib/types'

export const getEventsPageData = (
  events: Event[],
  limit: number,
  startAfterGameId: string,
): EventsPageData => {
  let remainder = 0
  let isBeforeGameId = true
  const pageEvents: Event[] = []
  for (const [index, event] of Object.entries(events)) {
    if (startAfterGameId && isBeforeGameId && event.event_id !== startAfterGameId) {
      continue
    }
    if (event.event_id === startAfterGameId) {
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
