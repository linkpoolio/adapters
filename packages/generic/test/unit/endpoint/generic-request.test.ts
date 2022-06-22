import { Requester } from '@chainlink/ea-bootstrap'
import { assertError } from '@chainlink/ea-test-helpers'
import type { AdapterRequest } from '@chainlink/types'

import { makeExecute } from '../../../src/adapter'
import { RequestMethod } from '../../../src/lib/constants'
import type { Config } from '../../../src/lib/types'

describe('error calls due to custom inputParameters validations', () => {
  const jobID = '1'
  const execute = makeExecute()

  process.env.GENERIC_BASE_URL = 'https://test-base-url.com'

  const methodTestCases = [
    {
      name: `invalid method`,
      id: '1',
      testData: {
        data: {
          endpoint: 'generic-request',
          method: 'linkpool',
        },
      },
    },
  ]
  methodTestCases.forEach((testCase) => {
    it(`throws an error if 'method' is a/an ${testCase.name}`, async () => {
      try {
        await execute(testCase.testData as AdapterRequest, undefined)
      } catch (error) {
        const errorResp = Requester.errored(jobID, error)
        assertError({ expected: 400, actual: errorResp.statusCode }, errorResp, jobID)
      }
    })
  })

  const urlTestCases = [
    {
      name: 'null',
      id: '1',
      testData: {
        data: {
          endpoint: 'generic-request',
          url: null,
        },
      },
    },
    {
      name: 'boolean',
      id: '1',
      testData: {
        data: {
          endpoint: 'generic-request',
          url: true,
        },
      },
    },
    {
      name: 'number',
      id: '1',
      testData: {
        data: {
          endpoint: 'generic-request',
          url: 42.777,
        },
      },
    },
    {
      name: 'Array',
      id: '1',
      testData: {
        data: {
          endpoint: 'generic-request',
          url: ['Linkpilled', 'OKLG'],
        },
      },
    },
    {
      name: 'Object',
      id: '1',
      testData: {
        data: {
          endpoint: 'generic-request',
          url: { ok: 'lg' },
        },
      },
    },
  ]
  urlTestCases.forEach((testCase) => {
    it(`throws an error if 'url' is not a string but a/an ${testCase.name}`, async () => {
      try {
        await execute(testCase.testData as AdapterRequest, undefined)
      } catch (error) {
        const errorResp = Requester.errored(jobID, error)
        assertError({ expected: 400, actual: errorResp.statusCode }, errorResp, jobID)
      }
    })
  })

  const headersTestCases = [
    {
      name: 'null',
      id: '1',
      testData: {
        data: {
          endpoint: 'generic-request',
          method: RequestMethod.POST,
          url: '/subpath',
          headers: null,
        },
      },
    },
    {
      name: 'boolean',
      id: '1',
      testData: {
        data: {
          endpoint: 'generic-request',
          method: RequestMethod.POST,
          url: '/subpath',
          headers: true,
        },
      },
    },
    {
      name: 'number',
      id: '1',
      testData: {
        data: {
          endpoint: 'generic-request',
          method: RequestMethod.POST,
          url: '/subpath',
          headers: 42.777,
        },
      },
    },
    {
      name: 'string',
      id: '1',
      testData: {
        data: {
          endpoint: 'generic-request',
          method: RequestMethod.POST,
          url: '/subpath',
          headers: 'LinkPool',
        },
      },
    },
    {
      name: 'Array',
      id: '1',
      testData: {
        data: {
          endpoint: 'generic-request',
          method: RequestMethod.POST,
          url: '/subpath',
          headers: ['Linkpilled', 'OKLG'],
        },
      },
    },
  ]
  headersTestCases.forEach((testCase) => {
    it(`throws an error if 'headers' is not a JSON object but a/an ${testCase.name}`, async () => {
      try {
        await execute(testCase.testData as AdapterRequest, undefined)
      } catch (error) {
        const errorResp = Requester.errored(jobID, error)
        assertError({ expected: 400, actual: errorResp.statusCode }, errorResp, jobID)
      }
    })
  })

  const paramsTestCases = [
    {
      name: 'null',
      id: '1',
      testData: {
        data: {
          endpoint: 'generic-request',
          method: RequestMethod.POST,
          url: '/subpath',
          params: null,
        },
      },
    },
    {
      name: 'boolean',
      id: '1',
      testData: {
        data: {
          endpoint: 'generic-request',
          method: RequestMethod.POST,
          url: '/subpath',
          params: true,
        },
      },
    },
    {
      name: 'number',
      id: '1',
      testData: {
        data: {
          endpoint: 'generic-request',
          method: RequestMethod.POST,
          url: '/subpath',
          params: 42.777,
        },
      },
    },
    {
      name: 'string',
      id: '1',
      testData: {
        data: {
          endpoint: 'generic-request',
          method: RequestMethod.POST,
          url: '/subpath',
          params: 'LinkPool',
        },
      },
    },
    {
      name: 'Array',
      id: '1',
      testData: {
        data: {
          endpoint: 'generic-request',
          method: RequestMethod.POST,
          url: '/subpath',
          params: ['Linkpilled', 'OKLG'],
        },
      },
    },
  ]
  paramsTestCases.forEach((testCase) => {
    it(`throws an error if 'params' is not a JSON object but a/an ${testCase.name}`, async () => {
      try {
        await execute(testCase.testData as AdapterRequest, undefined)
      } catch (error) {
        const errorResp = Requester.errored(jobID, error)
        assertError({ expected: 400, actual: errorResp.statusCode }, errorResp, jobID)
      }
    })
  })

  const dataTestCases = [
    {
      name: 'null',
      id: '1',
      testData: {
        data: {
          endpoint: 'generic-request',
          method: RequestMethod.POST,
          url: '/subpath',
          data: null,
        },
      },
    },
    {
      name: 'boolean',
      id: '1',
      testData: {
        data: {
          endpoint: 'generic-request',
          method: RequestMethod.POST,
          url: '/subpath',
          data: true,
        },
      },
    },
    {
      name: 'number',
      id: '1',
      testData: {
        data: {
          endpoint: 'generic-request',
          method: RequestMethod.POST,
          url: '/subpath',
          data: 42.777,
        },
      },
    },
    {
      name: 'string',
      id: '1',
      testData: {
        data: {
          endpoint: 'generic-request',
          method: RequestMethod.POST,
          url: '/subpath',
          data: 'LinkPool',
        },
      },
    },
    {
      name: 'Array',
      id: '1',
      testData: {
        data: {
          endpoint: 'generic-request',
          method: RequestMethod.POST,
          url: '/subpath',
          data: ['Linkpilled', 'OKLG'],
        },
      },
    },
  ]
  dataTestCases.forEach((testCase) => {
    it(`throws an error if 'data' is not a JSON object but a/an ${testCase.name}`, async () => {
      try {
        await execute(testCase.testData as AdapterRequest, undefined)
      } catch (error) {
        const errorResp = Requester.errored(jobID, error)
        assertError({ expected: 400, actual: errorResp.statusCode }, errorResp, jobID)
      }
    })
  })
})

describe('error calls due to custom config validations', () => {
  const jobID = '1'

  process.env.GENERIC_BASE_URL = 'https://test-base-url.com'

  it(`config.genericConfig is falsy`, async () => {
    const config = Requester.getDefaultConfig() as Config
    const execute = makeExecute(config)
    const testData = {
      data: {
        endpoint: 'generic-request',
        method: RequestMethod.POST,
        url: '/subpath',
      },
    }

    try {
      await execute(testData as AdapterRequest, undefined)
    } catch (error) {
      const errorResp = Requester.errored(jobID, error)
      assertError({ expected: 500, actual: errorResp.statusCode }, errorResp, jobID)
    }
  })

  it(`config.genericConfig.authorization.type is unsupported`, async () => {
    const config = Requester.getDefaultConfig() as Config
    config.genericConfig = {
      authorization: {
        type: 'linkpool', // Invalid AuthorizationType
      },
    }
    const execute = makeExecute(config)
    const testData = {
      data: {
        endpoint: 'generic-request',
        method: RequestMethod.POST,
        url: '/subpath',
      },
    }

    try {
      await execute(testData as AdapterRequest, undefined)
    } catch (error) {
      const errorResp = Requester.errored(jobID, error)
      assertError({ expected: 500, actual: errorResp.statusCode }, errorResp, jobID)
    }
  })
})
