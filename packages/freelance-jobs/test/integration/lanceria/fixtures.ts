import nock from 'nock'

import { Provider as ProviderName, providerToBaseUrl } from '../../../src/api/constants'

const baseUrl = providerToBaseUrl.get(ProviderName.LANCERIA) as string

const jobRequest = {
  jobId: 1,
  amount: '10000000000000000000',
  employerAddress: '0x6613A30A0D7F4011Cb569ca89f5a107cF9A542f2',
  freelancerAddress: '0xbDf9CD30F6201B02F48d94878a86cf9B375f6344',
}

export const mockJobsSingleError = (): nock =>
  nock(baseUrl, {
    encodedQueryParams: true,
    reqheaders: { 'x-api-key': process.env.API_KEY as string },
  })
    .get(`/jobRequests/`)
    .query({ jobId: jobRequest.jobId })
    .reply(500, {})

export const mockJobsSingleSuccess = (): nock =>
  nock(baseUrl, {
    encodedQueryParams: true,
    reqheaders: { 'x-api-key': process.env.API_KEY as string },
  })
    .get(`/jobRequests/`)
    .query({ jobId: jobRequest.jobId })
    .reply(200, jobRequest)
