import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/types'

import type { SuiteContext } from './adapter.test'
import {
  mockScheduleResponseError,
  mockScheduleResponseMalformedMarketCreate,
  mockScheduleResponseMalformedMarketResolve,
  mockScheduleResponseSuccessMarketCreate,
  mockScheduleResponseSuccessMarketCreate2,
  mockScheduleResponseSuccessMarketCreateNoLines,
  mockScheduleResponseSuccessResolve,
  mockScheduleResponseSuccessResolve2,
} from './fixtures'

export function scheduleTests(context: SuiteContext): void {
  const id = '1'

  describe('error calls', () => {
    describe('when unsuccessfully requesting Therundown API', () => {
      it('should throw an exception', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'schedule',
            sportId: 4,
            date: 1635529231,
            market: 'create',
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
            endpoint: 'schedule',
            sportId: 4,
            date: 1635529231,
            market: 'create',
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
            endpoint: 'schedule',
            sportId: 4,
            date: 1635529231,
            market: 'resolve',
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
      it('should return correct endpoint result (case create market with no "lines")', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'schedule',
            sportId: 4,
            date: 1635529231,
            market: 'create',
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

      it('should return correct endpoint result (case create market)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'schedule',
            sportId: 4,
            date: 1635529231,
            market: 'create',
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

      it('should return correct endpoint result (case create market filtering by gameIds - 2 results)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'schedule',
            sportId: 1,
            date: 1662817303,
            market: 'create',
            gameIds: ['0017049a376cd9c73345507767295c74', '03a242a346a63835d9ba1797f3a10ff8'],
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

      it('should return correct endpoint result (case create market filtering by gameIds - 0 results)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'schedule',
            sportId: 1,
            date: 1662817303,
            market: 'create',
            gameIds: ['00000000000000000000000000000000'],
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

      it('should return correct endpoint result (case resolve market)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'schedule',
            sportId: 4,
            date: 1635529231,
            market: 'resolve',
          },
        }
        mockScheduleResponseSuccessResolve()

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

      it('should return correct endpoint result (case resolve market filtering by gameIds - 2 results)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'schedule',
            sportId: 1,
            date: 1662222667,
            market: 'resolve',
            gameIds: ['392546e145079d0d3d3282b4075d7127', '040265cdc1022e13ef1764b9a72cca43'],
          },
        }
        mockScheduleResponseSuccessResolve2()

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

      it('should return correct endpoint result (case resolve market filtering by gameIds - 0 results)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'schedule',
            sportId: 1,
            date: 1662222667,
            market: 'resolve',
            gameIds: ['00000000000000000000000000000000'],
          },
        }
        mockScheduleResponseSuccessResolve2()

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
