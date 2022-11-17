import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/types'

import { Endpoint, Market, SportId } from '../../src/lib/const'
import type { SuiteContext } from './adapter.test'
import {
  mockScheduleResponseError,
  mockScheduleResponseMalformedMarketCreate,
  mockScheduleResponseMalformedMarketResolve,
  mockScheduleResponseSuccessMarketCreate,
  mockScheduleResponseSuccessMarketCreate2,
  mockScheduleResponseSuccessMarketCreateNoLines,
  mockScheduleResponseSuccessMarketResolve,
  mockScheduleResponseSuccessMarketResolve2,
  mockScheduleResponseSuccessMarketResolveWorldCup,
} from './fixtures'

export function scheduleTests(context: SuiteContext): void {
  const id = '1'

  describe('error calls', () => {
    describe('when unsuccessfully requesting Therundown API', () => {
      it('should throw an exception', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.SCHEDULE,
            market: Market.CREATE,
            sportId: SportId.NBA,
            date: 1635529231,
            sportIdToBookmakerIds: {
              [SportId.NBA]: [3, 11],
            },
            hasScoresByPeriod: true,
            limit: 20,
          },
        }
        mockScheduleResponseError()

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
      it('should throw an exception if a game attribute is malformed while creating market', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.SCHEDULE,
            market: Market.CREATE,
            sportId: SportId.NBA,
            date: 1635529231,
            sportIdToBookmakerIds: {
              [SportId.NBA]: [3, 11],
            },
            hasScoresByPeriod: true,
            limit: 20,
          },
        }
        mockScheduleResponseMalformedMarketCreate()
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
      it('should throw an exception if a game attribute is malformed while resolving market', async () => {
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
        mockScheduleResponseMalformedMarketResolve()
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
      it('should return 6 results (case create market with no "lines")', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.SCHEDULE,
            market: Market.CREATE,
            sportId: SportId.NBA,
            date: 1635529231,
            sportIdToBookmakerIds: {
              [SportId.NBA]: [3, 11],
            },
            hasScoresByPeriod: true,
            limit: 20,
          },
        }
        mockScheduleResponseSuccessMarketCreateNoLines()

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

      it('should return 1 result (case create market)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.SCHEDULE,
            market: Market.CREATE,
            sportId: SportId.NBA,
            date: 1635529231,
            sportIdToBookmakerIds: {
              [SportId.NBA]: [3, 11],
            },
            hasScoresByPeriod: true,
            limit: 20,
          },
        }
        mockScheduleResponseSuccessMarketCreate()

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

      it('should return 2 results (case create market filtering by gameIds)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.SCHEDULE,
            market: Market.CREATE,
            sportId: SportId.NCAA_Football,
            date: 1662817303,
            sportIdToBookmakerIds: {
              [SportId.NCAA_Football]: [3, 11],
            },
            gameIds: ['0017049a376cd9c73345507767295c74', '03a242a346a63835d9ba1797f3a10ff8'],
            hasScoresByPeriod: true,
            limit: 20,
          },
        }
        mockScheduleResponseSuccessMarketCreate2()

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

      it('should return 0 results (case create market filtering by gameIds)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.SCHEDULE,
            market: Market.CREATE,
            sportId: SportId.NCAA_Football,
            date: 1662817303,
            sportIdToBookmakerIds: {
              [SportId.NCAA_Football]: [3, 11],
            },
            gameIds: ['00000000000000000000000000000000'],
            hasScoresByPeriod: true,
            limit: 20,
          },
        }
        mockScheduleResponseSuccessMarketCreate2()

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

      it('should return 2 results and has 1 more (case create market, starting after a game ID and with limit 2)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.SCHEDULE,
            market: Market.CREATE,
            sportId: SportId.NCAA_Football,
            date: 1662817303,
            sportIdToBookmakerIds: {
              [SportId.NCAA_Football]: [3, 11],
            },
            limit: 2,
            startAfterGameId: '0017049a376cd9c73345507767295c74',
          },
        }
        mockScheduleResponseSuccessMarketCreate2()

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

      it('should return 1 result (case resolve market)', async () => {
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
        mockScheduleResponseSuccessMarketResolve()

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

      it('should return 2 results (case resolve market filtering by gameIds)', async () => {
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
        mockScheduleResponseSuccessMarketResolve2()

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

      it('should return 1 result (case resolve market for FIFA World Cup)', async () => {
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
        mockScheduleResponseSuccessMarketResolveWorldCup()

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

      it('should return 0 results (case resolve market filtering by gameIds)', async () => {
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
        mockScheduleResponseSuccessMarketResolve2()

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

      it('should return 1 results and has 1 more (case resolve market, starting after a game ID and with limit 1)', async () => {
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
        mockScheduleResponseSuccessMarketResolve2()

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
