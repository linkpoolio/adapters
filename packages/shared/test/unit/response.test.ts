import type { AxiosResponse } from '@chainlink/types'

import { generateAxiosResponse, getRequestUrl } from '../../src/response'

describe('generateAxiosResponse()', () => {
  const testCases = [
    {
      name: `null`,
      testData: {
        result: null,
      },
    },
    {
      name: `boolean`,
      testData: {
        result: true,
      },
    },
    {
      name: `number`,
      testData: {
        result: 42.777,
      },
    },
    {
      name: `string`,
      testData: {
        result: 'OK;LG',
      },
    },
    {
      name: `Array`,
      testData: {
        result: ['duck1', 'duck2'],
      },
    },
    {
      name: `object`,
      testData: {
        result: { when: 'staking' },
      },
    },
  ]

  it.each(testCases)(
    'returns the expected response object when result is a/an $name',
    async ({ testData }) => {
      const { result } = testData
      const status = 200

      const response = generateAxiosResponse(result, status)

      const expectedResponse: Partial<AxiosResponse> = {
        data: {
          payload: result,
          result,
        },
        status,
      }
      expect(response).toEqual(expectedResponse)
    },
  )
})

describe('getRequestUrl()', () => {
  it('returns the expected request Url', () => {
    const response = {
      request: {
        options: {
          protocol: 'https:',
          path: '/v3/app?when=staking',
          hostname: 'api.linkpool.io',
        },
      },
    }
    const requestUrl = getRequestUrl(response)

    expect(requestUrl).toBe('https://api.linkpool.io/v3/app?when=staking')
  })
})
