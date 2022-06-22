import { assertError, assertSuccess } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'

import type { SuiteContext } from './adapter.test'
import {
  mockCategoryResponseError,
  mockCategoryResponseSuccessMalformed,
  mockCategoryResponseSuccess,
} from './fixtures'

export function categoryTests(context: SuiteContext): void {
  const id = '1'

  describe('error calls', () => {
    describe('when unsuccessfully requests the API', () => {
      it('should throw and exception', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'category',
            address: '0xed5af388653567af2f388e6224dc7c4b3241c544',
            chainId: 1,
          },
        }
        mockCategoryResponseError()

        const response = await context.req
          .post('/')
          .send(data)
          .set('Accept', '*/*')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)

        assertError({ expected: 500, actual: response.body.providerStatusCode }, response.body, id)
        expect(response.body).toMatchSnapshot()
      })
    })

    describe('when successfully requests the API', () => {
      it('should throw and exception if the response format is unexpected', async () => {
        const data: AdapterRequest = {
          id,
          data: {
            endpoint: 'category',
            address: '0xed5af388653567af2f388e6224dc7c4b3241c544',
            chainId: 1,
          },
        }
        mockCategoryResponseSuccessMalformed()

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
    it('returns the correct result', async () => {
      const data: AdapterRequest = {
        id,
        data: {
          endpoint: 'category',
          address: '0xed5af388653567af2f388e6224dc7c4b3241c544',
          chainId: 1,
        },
      }
      mockCategoryResponseSuccess()

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
}
