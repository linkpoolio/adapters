import { iso8061ToTimestamp, timestampToIso8061 } from '../../src/datetime'

describe('iso8061ToTimestamp()', () => {
  it('converts an iso 8061 to UNIX timestamp (in seconds)', () => {
    const time = iso8061ToTimestamp('2022-04-16T11:30:00+00:00')

    expect(time).toBe(1650108600)
  })

  it('converts an iso 8061 to UNIX timestamp (in milliseconds)', () => {
    const time = iso8061ToTimestamp('2022-04-16T11:30:00+00:00', true)

    expect(time).toBe(1650108600000)
  })
})

describe('timestampToIso8061()', () => {
  it('converts a UNIX timestamp (in seconds) to an iso 8061', () => {
    const time = timestampToIso8061(1650108600)

    expect(time).toBe('2022-04-16T11:30:00.000Z')
  })

  it('converts a UNIX timestamp (in milliseconds) to an iso 8061', () => {
    const datetime = timestampToIso8061(1650108600000, true)

    expect(datetime).toBe('2022-04-16T11:30:00.000Z')
  })
})
