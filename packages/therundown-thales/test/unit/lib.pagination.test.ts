import { getEventsPageData } from '../../src/lib/pagination'
import type { Event } from '../../src/lib/types'

describe('getEventsPageData()', () => {
  describe(`'startAfterGameId' is falsy`, () => {
    it(`throws and error if 'events' array is empty and no 'limit' is passed`, () => {
      const events = [] as Event[]

      expect(() => getEventsPageData(events)).toThrowError(
        `Invalid 'limit': 0. It must be greater or equal than 1`,
      )
    })

    it(`throws and error if 'limit' is zero`, () => {
      const events = [{ event_id: '0x01' }] as Event[]
      const limit = 0

      expect(() => getEventsPageData(events, { limit })).toThrowError(
        `Invalid 'limit': ${limit}. It must be greater or equal than 1`,
      )
    })

    it(`returns len('events') == 1 & 'remainder' == 4 (case: len('events') == 5 & 'limit' == 1)`, () => {
      const events = [
        { event_id: '0x01' },
        { event_id: '0x02' },
        { event_id: '0x03' },
        { event_id: '0x04' },
        { event_id: '0x05' },
      ] as Event[]
      const limit = 1

      const { events: pageEvents, remainder } = getEventsPageData(events, { limit })

      const expectedEvents = [{ event_id: '0x01' }]
      expect(pageEvents).toEqual(expectedEvents)
      expect(remainder).toBe(4)
    })

    it(`returns len('events') == 3 & 'remainder' == 2 (case: len('events') == 5 & 'limit' == 3)`, () => {
      const events = [
        { event_id: '0x01' },
        { event_id: '0x02' },
        { event_id: '0x03' },
        { event_id: '0x04' },
        { event_id: '0x05' },
      ] as Event[]
      const limit = 3

      const { events: pageEvents, remainder } = getEventsPageData(events, { limit })

      const expectedEvents = events.slice(0, 3)
      expect(pageEvents).toEqual(expectedEvents)
      expect(remainder).toBe(2)
    })

    it(`returns len('events') == 5 & 'remainder' == 0 (case: len('events') == 5 & 'limit' == 5)`, () => {
      const events = [
        { event_id: '0x01' },
        { event_id: '0x02' },
        { event_id: '0x03' },
        { event_id: '0x04' },
        { event_id: '0x05' },
      ] as Event[]
      const limit = events.length

      const { events: pageEvents, remainder } = getEventsPageData(events, { limit })

      expect(pageEvents).toEqual(events)
      expect(remainder).toBe(0)
    })

    it(`returns len('events') == 5 & 'remainder' == 0 (case: len('events') == 5 & 'limit' == 6)`, () => {
      const events = [
        { event_id: '0x01' },
        { event_id: '0x02' },
        { event_id: '0x03' },
        { event_id: '0x04' },
        { event_id: '0x05' },
      ] as Event[]
      const limit = events.length + 1

      const { events: pageEvents, remainder } = getEventsPageData(events, { limit })

      const expectedEvents = [...events]
      expect(pageEvents).toEqual(expectedEvents)
      expect(remainder).toBe(0)
    })
  })

  describe(`'startAfterGameId' exists`, () => {
    it(`throws and error if 'events' array is empty and no 'limit' is passed`, () => {
      const events = [] as Event[]
      const startAfterGameId = '0x01'

      expect(() => getEventsPageData(events, { startAfterGameId })).toThrowError(
        `Invalid 'limit': 0. It must be greater or equal than 1`,
      )
    })

    it(`throws and error if 'limit' is zero`, () => {
      const events = [{ event_id: '0x01' }] as Event[]
      const limit = 0
      const startAfterGameId = '0x01'

      expect(() => getEventsPageData(events, { limit, startAfterGameId })).toThrowError(
        `Invalid 'limit': ${limit}. It must be greater or equal than 1`,
      )
    })

    it(`returns len('events') == 1 & 'remainder' == 3 (case: len('events') == 5 & 'limit' == 1 & index('startAfterGameId') == 0)`, () => {
      const events = [
        { event_id: '0x01' },
        { event_id: '0x02' },
        { event_id: '0x03' },
        { event_id: '0x04' },
        { event_id: '0x05' },
      ] as Event[]
      const limit = 1
      const startAfterGameId = '0x01'

      const { events: pageEvents, remainder } = getEventsPageData(events, {
        limit,
        startAfterGameId,
      })

      const expectedEvents = [{ event_id: '0x02' }]
      expect(pageEvents).toEqual(expectedEvents)
      expect(remainder).toBe(3)
    })

    it(`returns len('events') == 2 & 'remainder' == 1 (case: len('events') == 5 & 'limit' == 2 & index('startAfterGameId') == 1)`, () => {
      const events = [
        { event_id: '0x01' },
        { event_id: '0x02' },
        { event_id: '0x03' },
        { event_id: '0x04' },
        { event_id: '0x05' },
      ] as Event[]
      const limit = 2
      const startAfterGameId = '0x02'

      const { events: pageEvents, remainder } = getEventsPageData(events, {
        limit,
        startAfterGameId,
      })

      const expectedEvents = events.slice(2, 4)
      expect(pageEvents).toEqual(expectedEvents)
      expect(remainder).toBe(1)
    })

    it(`returns len('events') == 4 & 'remainder' == 0 (case: len('events') == 5 & 'limit' == 5 & index('startAfterGameId') == 1)`, () => {
      const events = [
        { event_id: '0x01' },
        { event_id: '0x02' },
        { event_id: '0x03' },
        { event_id: '0x04' },
        { event_id: '0x05' },
      ] as Event[]
      const limit = events.length
      const startAfterGameId = '0x01'

      const { events: pageEvents, remainder } = getEventsPageData(events, {
        limit,
        startAfterGameId,
      })

      const expectedEvents = events.slice(1)
      expect(pageEvents).toEqual(expectedEvents)
      expect(remainder).toBe(0)
    })

    it(`returns len('events') == 4 & 'remainder' == 0 (case: len('events') == 5 & 'limit' == 6  & index('startAfterGameId') == 1)`, () => {
      const events = [
        { event_id: '0x01' },
        { event_id: '0x02' },
        { event_id: '0x03' },
        { event_id: '0x04' },
        { event_id: '0x05' },
      ] as Event[]
      const limit = events.length + 1
      const startAfterGameId = '0x01'

      const { events: pageEvents, remainder } = getEventsPageData(events, {
        limit,
        startAfterGameId,
      })

      const expectedEvents = events.slice(1)
      expect(pageEvents).toEqual(expectedEvents)
      expect(remainder).toBe(0)
    })

    it(`returns len('events') == 0 & 'remainder' == 0 (case: len('events') == 5 & 'limit' == 1  & index('startAfterGameId') == 4)`, () => {
      const events = [
        { event_id: '0x01' },
        { event_id: '0x02' },
        { event_id: '0x03' },
        { event_id: '0x04' },
        { event_id: '0x05' },
      ] as Event[]
      const limit = 1
      const startAfterGameId = '0x05'

      const { events: pageEvents, remainder } = getEventsPageData(events, {
        limit,
        startAfterGameId,
      })

      const expectedEvents = []
      expect(pageEvents).toEqual(expectedEvents)
      expect(remainder).toBe(0)
    })

    it(`returns len('events') == 0 & 'remainder' == 0 (case: len('events') == 5 & 'limit' == 1 & index('startAfterGameId') == N/A)`, () => {
      const events = [
        { event_id: '0x01' },
        { event_id: '0x02' },
        { event_id: '0x03' },
        { event_id: '0x04' },
        { event_id: '0x05' },
      ] as Event[]
      const limit = 1
      const startAfterGameId = '0x00'

      const { events: pageEvents, remainder } = getEventsPageData(events, {
        limit,
        startAfterGameId,
      })

      const expectedEvents = []
      expect(pageEvents).toEqual(expectedEvents)
      expect(remainder).toBe(0)
    })
  })
})
