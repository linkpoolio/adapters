import { assertSuccess } from '@chainlink/ea-test-helpers'

import type { SuiteContext } from '../therundown.test'
import { schedulesInput } from '../common'
import { mockScheduleSuccess } from './fixtures'

export function schedulesTests(context: SuiteContext): void {
  describe('success calls', () => {
    it('returns list of schedules', async () => {
      mockScheduleSuccess()

      const response = await context.req
        .post('/')
        .send(schedulesInput)
        .set('Accept', '*/*')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      assertSuccess(
        { expected: 200, actual: response.body.statusCode },
        response.body,
        schedulesInput.id,
      )
      expect(response.body).toMatchSnapshot()
    })
  })
}
