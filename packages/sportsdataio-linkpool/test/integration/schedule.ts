import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'

import type { SuiteContext } from './adapter.test'
import {
  mockScheduleSuccessCreateMLB1,
  mockScheduleSuccessMalformed1,
  mockScheduleSuccessNoEvents,
  mockScheduleSuccessResolveMLB1,
} from './fixtures'
import { LeagueId, Market, leagueIdUrlPath } from '../../src/lib/constants'

export function scheduleTests(context: SuiteContext): void {
  const id = '1'
  const endpoint = 'schedule'
  const leagueId = LeagueId.MLB

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
              date: 1650585600, // 2022-04-22T00:00:00
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
              date: 1650585600, // 2022-04-22T00:00:00
            },
          },
        },
      ]
      it.each(testCases)(
        'throws an error if response.data format is not an array ($name)',
        async ({ testData }) => {
          mockScheduleSuccessMalformed1(leagueIdUrlPath.get(leagueId))

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
    describe('when API response has games and market is 0 (create)', () => {
      it('returns an array with the expected games encoded', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint,
            market: Market.CREATE,
            leagueId,
            date: 1650758400, // 2022-04-24T00:00:00
          },
        }
        mockScheduleSuccessCreateMLB1()
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
            date: 1650585600, // 2022-04-22T00:00:00
          },
        }
        mockScheduleSuccessResolveMLB1()
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
            date: 1650585600, // 2022-04-22T00:00:00
            gameIds: [64545, 64546], // NB: 64546 does not exist
          },
        }
        mockScheduleSuccessResolveMLB1()
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
              date: 1650637200, // 2022-04-22T14:20:00
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
              date: 1650585600, // 2022-04-22T00:00:00
            },
          },
        },
      ]
      it.each(testCases)('returns an empy array ($name)', async ({ testData }) => {
        mockScheduleSuccessNoEvents(leagueIdUrlPath.get(leagueId))
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
