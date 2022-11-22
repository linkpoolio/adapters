import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/types'

import { Endpoint, Market, SportId } from '../../src/lib/const'
import type { SuiteContext } from './adapter.test'
import {
  mockScheduleMarketCreateSportId1Success1,
  mockScheduleMarketResolveSportId1Success1,
} from './fixtures/sportId1'
import {
  mockScheduleMarketCreateSportId4Error1,
  mockScheduleMarketCreateSportId4Success1,
  mockScheduleMarketCreateSportId4Success2,
  mockScheduleMarketResolveSportId4Error1,
  mockScheduleMarketResolveSportId4Success1,
  mockScheduleSportId4Error,
} from './fixtures/sportId4'
import { mockScheduleMarketResolveSportId18Success1 } from './fixtures/sportId18'

export function scheduleTests(context: SuiteContext): void {
  const id = '1'

  describe('error calls', () => {
    describe('when unsuccessfully requesting Therundown API', () => {
      it('should throw an exception (market: create, sportId: 4, bookmakerIds: [3, 11], limit: 20)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.SCHEDULE,
            market: Market.CREATE,
            sportId: SportId.NBA,
            date: 1635529231,
            bookmakerIds: [3, 11],
            hasScoresByPeriod: true,
            limit: 20,
          },
        }
        mockScheduleSportId4Error()

        const response = await context.req
          .post('/')
          .send(data)
          .set('Accept', '*/*')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)

        assertError({ expected: 500, actual: response.body.providerStatusCode }, response.body, id)
      })
    })

    describe('when successfully requesting Therundown API', () => {
      it('should throw an exception if a game attribute is malformed while creating market (market: create, sportId: 4, bookmakerIds: [3, 11], limit: 20)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.SCHEDULE,
            market: Market.CREATE,
            sportId: SportId.NBA,
            date: 1635529231,
            bookmakerIds: [3, 11],
            hasScoresByPeriod: true,
            limit: 20,
          },
        }
        mockScheduleMarketCreateSportId4Error1()
        const response = await context.req
          .post('/')
          .send(data)
          .set('Accept', '*/*')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(500)

        assertError({ expected: 500, actual: response.statusCode }, response.body, id)
        expect(response.body).toMatchSnapshot()
      })
      it('should throw an exception if a game attribute is malformed while resolving market (market: resolve, sportId: 4, limit: 20)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.SCHEDULE,
            market: Market.RESOLVE,
            sportId: SportId.NBA,
            date: 1635529231,
            hasScoresByPeriod: true,
            limit: 20,
          },
        }
        mockScheduleMarketResolveSportId4Error1()
        const response = await context.req
          .post('/')
          .send(data)
          .set('Accept', '*/*')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(500)

        assertError({ expected: 500, actual: response.statusCode }, response.body, id)
        expect(response.body).toMatchSnapshot()
      })
    })
  })

  describe('success calls', () => {
    describe('when successfully requesting Therundown API', () => {
      it('should return 6 results (market: create, sportId: 4, bookmakerIds: [3, 11], limit: 20, bookmakers have no lines)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.SCHEDULE,
            market: Market.CREATE,
            sportId: SportId.NBA,
            date: 1635529231,
            bookmakerIds: [3, 11],
            hasScoresByPeriod: true,
            limit: 20,
          },
        }
        mockScheduleMarketCreateSportId4Success1()

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

      it('should return 1 result (market: create, sportId: 4, bookmakerIds: [3, 11], limit: 20)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.SCHEDULE,
            market: Market.CREATE,
            sportId: SportId.NBA,
            date: 1635529231,
            bookmakerIds: [3, 11],
            hasScoresByPeriod: true,
            limit: 20,
          },
        }
        mockScheduleMarketCreateSportId4Success2()

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

      it('should return 2 results (market: create, sportId: 1, bookmakerIds: [3, 11], gameIds: 2 items (2 exist), limit: 20)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.SCHEDULE,
            market: Market.CREATE,
            sportId: SportId.NCAA_Football,
            date: 1662817303,
            bookmakerIds: [3, 11],
            gameIds: ['0017049a376cd9c73345507767295c74', '03a242a346a63835d9ba1797f3a10ff8'],
            hasScoresByPeriod: true,
            limit: 20,
          },
        }
        mockScheduleMarketCreateSportId1Success1()

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

      it('should return 0 results (market: create, sportId: 1, bookmakerIds: [3, 11], gameIds: 1 item (0 exist), limit: 20)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.SCHEDULE,
            market: Market.CREATE,
            sportId: SportId.NCAA_Football,
            date: 1662817303,
            bookmakerIds: [3, 11],
            gameIds: ['00000000000000000000000000000000'],
            hasScoresByPeriod: true,
            limit: 20,
          },
        }
        mockScheduleMarketCreateSportId1Success1()

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

      it('should return 2 results and has 1 more (market: create, sportId: 1, bookmakerIds: [3, 11], limit: 2, startAfterGameId: yes (exist))', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.SCHEDULE,
            market: Market.CREATE,
            sportId: SportId.NCAA_Football,
            date: 1662817303,
            bookmakerIds: [3, 11],
            limit: 2,
            startAfterGameId: '0017049a376cd9c73345507767295c74',
          },
        }
        mockScheduleMarketCreateSportId1Success1()

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

      it('should return 1 result (market: resolve, sportId: 4, limit: 20)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.SCHEDULE,
            market: Market.RESOLVE,
            sportId: SportId.NBA,
            date: 1635529231,
            hasScoresByPeriod: true,
            limit: 20,
          },
        }
        mockScheduleMarketResolveSportId4Success1()

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

      it('should return 2 results (market: resolve, sportId: 1, bookmakerIds: [3, 11], gameIds: 2 items (2 exist), limit: 20)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.SCHEDULE,
            market: Market.RESOLVE,
            sportId: SportId.NCAA_Football,
            date: 1662222667,
            gameIds: ['392546e145079d0d3d3282b4075d7127', '040265cdc1022e13ef1764b9a72cca43'],
            limit: 20,
          },
        }
        mockScheduleMarketResolveSportId1Success1()

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

      it('should return 1 result (market: resolve, sportId: 18, limit: 20)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.SCHEDULE,
            market: Market.RESOLVE,
            sportId: SportId.FIFA,
            date: 1662222667,
            limit: 20,
          },
        }
        mockScheduleMarketResolveSportId18Success1()

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

      it('should return 0 results (market: resolve, sportId: 1, gameIds: 1 item (0 exist), limit: 20)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.SCHEDULE,
            market: Market.RESOLVE,
            sportId: SportId.NCAA_Football,
            date: 1662222667,
            gameIds: ['00000000000000000000000000000000'],
            limit: 20,
          },
        }
        mockScheduleMarketResolveSportId1Success1()

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

      it('should return 1 results and has 1 more (market: resolve, sportId: 1, limit: 1, startAfterGameId: yes (exist))', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.SCHEDULE,
            market: Market.RESOLVE,
            sportId: SportId.NCAA_Football,
            date: 1662222667,
            limit: 1,
            startAfterGameId: '16e079e20382533f0d3548d5146c057f',
          },
        }
        mockScheduleMarketResolveSportId1Success1()

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
  })
}
