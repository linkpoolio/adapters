import { throwError } from '../../src/errors'

describe('throwError()', () => {
  it('throws an error message', () => {
    const expectedMessage = 'Variable foo is null or undefined'

    expect(() => null ?? throwError('Variable foo is null or undefined')).toThrowError(
      expectedMessage,
    )
  })
})
