import { assertSuccess } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'

import type { SuiteContext } from './adapter.test'

export function base64DecoderTests(context: SuiteContext): void {
  const id = '1'

  describe('success calls', () => {
    it('decodes the input from base64', async () => {
      const data: AdapterRequest = {
        id,
        data: {
          input: '7VrziGU1Z68vOI5iJNx8SzJBxUQ=',
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
