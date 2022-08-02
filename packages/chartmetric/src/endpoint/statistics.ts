import { AdapterError, Requester, Validator, util } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'
import { join } from 'path'

import type { CMStatistics, ResponseSchemaStatistics as ResponseSchema } from '../lib/types'
import { encodeStatistics, getStatistics } from '../lib/utils'
import { execute as executeAuth } from './auth'

export const supportedEndpoints = ['statistics']

export const endpointResultPaths = {}

export const description =
  'This endpoint returns the number of TikTok followers, Youtube subscribers or Spotify listeners, for a given artist.'

export const inputParameters: InputParameters = {
  artistId: {
    description: 'The ID of the artist for which we want to query the metrics for.',
    required: true,
    type: 'number',
  },
}

export const execute: ExecuteWithConfig<Config> = async (request, context, config) => {
  const validator = new Validator(request, inputParameters)

  const jobRunID = validator.validated.id
  const artistId = validator.validated.data.artistId
  const url = util.buildUrlPath('artist/:artistId', {
    artistId,
  })

  const responseAuth = await executeAuth(request, context, config)

  config.api.headers['Authorization'] = `Bearer ${responseAuth.data.result}`

  const options = { ...config.api, url }

  const response = await Requester.request<ResponseSchema>(options)

  const statisticsRaw: CMStatistics = response.data.obj.cm_statistics

  const statistics = getStatistics(statisticsRaw)

  let encodedStatistics: string

  try {
    encodedStatistics = encodeStatistics(statistics)
  } catch (error) {
    throw new AdapterError({
      jobRunID,
      statusCode: 200,
      message: `Unexpected error encoding the statistics: ${JSON.stringify(
        statistics,
      )}. Reason: ${error}`,
      cause: error,
      url: join(options.baseURL, options.url),
    })
  }

  return Requester.success(
    jobRunID,
    Requester.withResult(response, encodedStatistics),
    config.verbose,
  )
}
