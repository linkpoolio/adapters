import type { AxiosResponse } from '@chainlink/types'

import type { JSONArray } from './types'

export function generateAxiosResponse(
  result: boolean | null | JSONArray,
  status: number,
): Partial<AxiosResponse> {
  return {
    data: {
      payload: result,
      result,
    },
    status,
  }
}

export function getRequestUrl(response: AxiosResponse): string {
  const { protocol, path, hostname } = response.request.options
  return `${protocol}//${hostname}${path}`
}
