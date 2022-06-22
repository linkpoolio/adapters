import { GenericConfigError } from '../../../src/lib/errors'

describe('GenericConfigError()', () => {
  it('sets the instance properties as expected', () => {
    const message = 'Unexpected Lorem Ipsum'
    const envVar = 'LOREM_IPSUM'
    const prefix = 'PRE'
    expect.assertions(4)

    try {
      throw new GenericConfigError({ message, envVar, prefix })
    } catch (error) {
      expect(error.envVar).toBe(`${envVar}`)
      expect(error.message).toBe(`Reason: ${message}. Env var: ${prefix}_${envVar}.`)
      expect(error.prefix).toBe(prefix)
      expect(error.name).toBe('GenericConfigError')
    }
  })
})
