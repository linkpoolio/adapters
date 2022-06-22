import { validateDate } from '../../lib/validations'

describe('validateDate()', () => {
  const requests = [
    { name: "'date' does not have the YYYY-MM-DD format", testData: { date: '20220101' } },
    { name: "'date' is not a valid date", testData: { date: '2022-01-00' } },
    { name: "'date' is not human-readable", testData: { date: '2022-02-30' } },
    {
      name: "'date' is greater or equal than today",
      testData: { date: new Date().toISOString().split('T')[0] },
    },
  ]

  requests.forEach((req) => {
    it(`throws and error if ${req.name}`, async () => {
      expect(() => validateDate(req.testData.date)).toThrow()
    })
  })
})
