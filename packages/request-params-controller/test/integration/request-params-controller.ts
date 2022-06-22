import { assertSuccess } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'

import type { SuiteContext } from './adapter.test'

export function requestParamsControllerTests(context: SuiteContext): void {
  const id = '1'

  describe('success calls', () => {
    it("sets to null any optional parameter no present in 'params'", async () => {
      const data: AdapterRequest = {
        id,
        data: {
          params: {
            param1: 'value1',
            param2: 777.77,
            param3: ['linkpool'],
            param4: true,
          },
          optionalParams: ['param2', 'param5', 'param6'],
        },
      }

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

    it("sets to 'default' value any optional parameter no present in 'params'", async () => {
      const data: AdapterRequest = {
        id,
        data: {
          params: {
            param1: 'value1',
            param2: 777.77,
            param3: ['linkpool'],
            param4: true,
          },
          optionalParams: ['param2', 'param5', 'param6'],
          default: 42,
        },
      }

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
