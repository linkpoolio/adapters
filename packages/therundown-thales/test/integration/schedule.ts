import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/types'

import type { SuiteContext } from './adapter.test'
import {
  mockScheduleResponseError,
  mockScheduleResponseMalformedMarketCreate,
  mockScheduleResponseMalformedMarketResolve,
  mockScheduleResponseSuccessMarketCreate,
  mockScheduleResponseSuccessMarketCreateNoLines,
  mockScheduleResponseSuccessResolve,
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
            sportIdToBookmakers: {
              '4': [3, 11],
            },
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
            sportIdToBookmakers: {
              '4': [3, 11],
            },
          },
        }
        mockScheduleResponseMalformedMarketCreate()
        const response = await context.req
          .post('/')
          .send(data)
          .set('Accept', '*/*')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
        assertError({ expected: 200, actual: response.statusCode }, response.body, id)
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
            sportIdToBookmakers: {
              '4': [3, 11],
            },
          },
        }
        mockScheduleResponseMalformedMarketResolve()
        const response = await context.req
          .post('/')
          .send(data)
          .set('Accept', '*/*')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
        assertError({ expected: 200, actual: response.statusCode }, response.body, id)
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
            sportIdToBookmakers: {
              '4': [3, 11],
            },
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
            sportIdToBookmakers: {
              '4': [3, 11],
            },
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
      it('should return correct endpoint result (case resolve market)', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'schedule',
            sportId: 4,
            date: 1635529231,
            market: 'resolve',
            sportIdToBookmakers: {
              '4': [3, 11],
            },
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
    })
  })
}
