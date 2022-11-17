import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/types'

import { Endpoint, SportId } from '../../src/lib/const'
import type { SuiteContext } from './adapter.test'
import {
  mockScheduleResponseError,
  mockScheduleResponseMalformedMarketCreate,
  mockScheduleResponseSuccessMarketCreate,
  mockScheduleResponseSuccessMarketCreate2,
} from './fixtures'

export function oddsTests(context: SuiteContext): void {
  const id = '1'

  describe('error calls', () => {
    describe('when unsuccessfully requesting Therundown API', () => {
      it('should throw an exception', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.ODDS,
            sportId: SportId.NBA,
            date: 1635529231,
            sportIdToBookmakerIds: {
              [SportId.NBA]: [11, 3],
            },
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
      it('should throw and exception if the response is malformed', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.ODDS,
            sportId: SportId.NBA,
            date: 1635529231,
            sportIdToBookmakerIds: {
              [SportId.NBA]: [11, 3],
            },
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
    })
  })

  describe('success calls', () => {
    describe('when successfully requesting Therundown API', () => {
      it('should return 1 result', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.ODDS,
            sportId: SportId.NBA,
            date: 1635529231,
            sportIdToBookmakerIds: {
              [SportId.NBA]: [11, 3],
            },
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

      it('should return 2 results (case filtering by gameIds)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.ODDS,
            sportId: SportId.NCAA_Football,
            date: 1662817303,
            sportIdToBookmakerIds: {
              [SportId.NCAA_Football]: [3, 11],
            },
            gameIds: ['0017049a376cd9c73345507767295c74', '03a242a346a63835d9ba1797f3a10ff8'],
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

      it('should return 2 results (case filtering by gameIds)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.ODDS,
            sportId: SportId.NCAA_Football,
            date: 1662817303,
            sportIdToBookmakerIds: {
              [SportId.NCAA_Football]: [3, 11],
            },
            gameIds: ['00000000000000000000000000000000'],
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

      it('should return 2 results and has 1 more (case starting after a game ID and with limit 2)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: Endpoint.ODDS,
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
    })
  })
}
