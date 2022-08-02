import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'

import { Market } from '../../src/lib/constants'
import type { SuiteContext } from './adapter.test'
import {
  mockScheduleSuccessCreate1,
  mockScheduleSuccessMalformed1,
  mockScheduleSuccessNoEvents,
  mockScheduleSuccessResolve1,
} from './fixtures'

export function scheduleTests(context: SuiteContext): void {
  const id = '1'
  const endpoint = 'schedule'
  const leagueId = 47 // Premier League ID

  describe('error calls', () => {
    describe('when successfully requests the Enetscores API', () => {
      const testCases = [
        {
          name: 'create market',
          testData: {
            id,
            data: {
              endpoint,
              market: Market.CREATE,
              leagueId,
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
              leagueId,
              date: 1650067200, // 2022-04-16T00:00:00
            },
          },
        },
      ]
      it.each(testCases)(
        "throws an error if 'events' format is not an object ($name)",
        async ({ testData }) => {
          mockScheduleSuccessMalformed1()

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
            leagueId,
            date: 1650672000, // 2022-04-23T00:00:00
          },
        }

        mockScheduleSuccessCreate1()

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
            leagueId,
            date: 1650067200, // 2022-04-16T00:00:00
          },
        }

        mockScheduleSuccessResolve1()

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
            leagueId,
            date: 1650067200, // 2022-04-16T00:00:00
            gameIds: [3610254, 3610255], // NB: 3610255 does not exist
          },
        }

        mockScheduleSuccessResolve1()

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
              leagueId,
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
              leagueId,
              date: 1650067200, // 2022-04-16T00:00:00
            },
          },
        },
      ]
      it.each(testCases)('returns an empy array ($name)', async ({ testData }) => {
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
