import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'

import { Market } from '../../src/lib/constants'
import type { SuiteContext } from './adapter.test'
import {
  mockScheduleGameCreateSuccess,
  mockScheduleGameResolveSuccess,
  mockScheduleSuccessMalformed,
  mockScheduleSuccessNoEvents,
} from './fixtures'

export function scheduleTests(context: SuiteContext): void {
  const id = '1'
  const endpoint = 'schedule'
  const sportId = 1

  describe('error calls', () => {
    describe('when successfully requests the AP Sports API (sportsradar).', () => {
      const testCases = [
        {
          name: 'create market',
          testData: {
            id,
            data: {
              endpoint,
              market: Market.CREATE,
              sportId,
              date: 1650067200, // 2022-04-16T00:00:00
            },
          },
        },
        {
          name: 'resolve market',
          testData: {
            id,
            data: {
              endpoint,
              market: Market.RESOLVE,
              sportId,
              date: 1650067200, // 2022-04-16T00:00:00
            },
          },
        },
      ]
      it.each(testCases)(
        "throws an error if 'events' format is missing 'home' ($name)",
        async ({ testData }) => {
          mockScheduleSuccessMalformed()

          const response = await context.req
            .post('/')
            .send(testData as AdapterRequest)
            .set('Accept', '*/*')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)

          assertError({ expected: 200, actual: response.statusCode }, response.body, id)
          expect(response.body).toMatchSnapshot()
        },
      )
    })
  })

  describe('success calls', () => {
    describe('when API response has events and market is 0 (create)', () => {
      it('returns an array with the expected games encoded', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint,
            market: Market.CREATE,
            sportId,
            date: 1655777031, // 2022-06-21T00:00:00
          },
        }

        mockScheduleGameCreateSuccess()

        const response = await context.req
          .post('/')
          .send(data)
          .set('Accept', '*/*')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)

        assertSuccess({ expected: 200, actual: response.statusCode }, response.body, id)
        expect(response.body).toMatchSnapshot()
      })
    })

    describe('when API response has events and market is 1 (resolve)', () => {
      it('returns an array with the expected games encoded', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint,
            market: Market.RESOLVE,
            sportId,
            date: 1655777031, // 2022-06-21T00:00:00
          },
        }

        mockScheduleGameResolveSuccess()

        const response = await context.req
          .post('/')
          .send(data)
          .set('Accept', '*/*')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)

        assertSuccess({ expected: 200, actual: response.statusCode }, response.body, id)
        expect(response.body).toMatchSnapshot()
      })

      it('returns an array with the expected game encoded (filtering by gameIds)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint,
            market: Market.RESOLVE,
            sportId,
            date: 1655777031, // 2022-06-21T00:00:00
            gameIds: ['de3ca2924b6a42698f80be5c37f366f5'], // UUID: de3ca292-4b6a-4269-8f80-be5c37f366f5
          },
        }

        mockScheduleGameResolveSuccess()

        const response = await context.req
          .post('/')
          .send(data)
          .set('Accept', '*/*')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)

        assertSuccess({ expected: 200, actual: response.statusCode }, response.body, id)
        expect(response.body).toMatchSnapshot()
      })
    })

    describe('when API response has no events', () => {
      const testCases = [
        {
          name: 'create market',
          testData: {
            id,
            data: {
              endpoint,
              market: Market.CREATE,
              sportId,
              date: 1655777031, // 2022-06-21T00:00:00
            },
          },
        },
        {
          name: 'resolve market',
          testData: {
            id,
            data: {
              endpoint,
              market: Market.RESOLVE,
              sportId,
              date: 1655777031, // 2022-06-21T00:00:00
            },
          },
        },
      ]
      it.each(testCases)('returns an empty array ($name)', async ({ testData }) => {
        mockScheduleSuccessNoEvents()

        const response = await context.req
          .post('/')
          .send(testData as AdapterRequest)
          .set('Accept', '*/*')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)

        assertSuccess({ expected: 200, actual: response.statusCode }, response.body, id)
        expect(response.body).toMatchSnapshot()
      })
    })
  })
}
