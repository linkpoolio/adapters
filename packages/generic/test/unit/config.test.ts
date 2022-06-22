import { Requester, RequiredEnvError } from '@chainlink/ea-bootstrap'

import { makeConfig } from '../../src/config'

describe('makeConfig()', () => {
  it('throws an error if it fails to get the generic config object', () => {
    // GENERIC_BASE_URL is not set, which is required
    expect(() => makeConfig()).toThrow(RequiredEnvError)
  })

  it('returns the generic config and the default config merged', () => {
    process.env.GENERIC_PREFIX = 'NAAS'
    process.env.NAAS_GENERIC_BASE_URL = 'https://test-base-url.com'

    const config = makeConfig()

    const defaultConfig = Requester.getDefaultConfig()
    expect(config).toMatchObject(defaultConfig)
    expect(config).toHaveProperty('genericConfig')
    expect(config).toHaveProperty('defaultEndpoint')
  })
})
