import { formatNumericEnumValuesPretty, getNumericEnumValues } from '../../src/enums'

describe('getNumericEnumValues()', () => {
  enum TestEnum {
    ONE = 1,
    TWO = 2,
    THREE = 3,
  }

  it('returns the expected array of number', () => {
    const msg = getNumericEnumValues(TestEnum as unknown as Record<string, number>)

    expect(msg).toEqual([1, 2, 3])
  })
})

describe('formatNumericEnumValuesPretty()', () => {
  enum TestEnum {
    ONE = 1,
    TWO = 2,
    THREE = 3,
  }

  it('returns the expected string', () => {
    const msg = formatNumericEnumValuesPretty(TestEnum as unknown as Record<string, number>)

    expect(msg).toBe('1,2,3')
  })

  it('returns the expected string (has separator)', () => {
    const msg = formatNumericEnumValuesPretty(TestEnum as unknown as Record<string, number>, '~')

    expect(msg).toBe('1~2~3')
  })
})
