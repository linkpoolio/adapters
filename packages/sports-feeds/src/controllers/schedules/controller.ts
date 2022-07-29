import { AdapterError, Requester, Validator } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig, AdapterRequest } from '@chainlink/types'
import { validateDate } from '../../lib/utils'

import api from '../../api'
import { inputParameters, Market, marketToStatus, validateAndGetStatusIds } from './input'

const controller: ExecuteWithConfig<Config> = async (request: AdapterRequest, _, config) => {
  const validator = new Validator(request, inputParameters)
  const client = api(config)

  const jobRunID = validator.validated.id
  const sportId = validator.validated.data.sportId
  const dateRaw = validator.validated.data.date
  const market = validator.validated.data.market

  // const gameIdsRaw = validator.validated.data.gameIds
  const statusIdsRaw = validator.validated.data.statusIds

  // let gameIds: string[] = []
  let statusIds: string[] = []

  try {
    const date: string = validateDate(dateRaw)
    statusIds = validateAndGetStatusIds(statusIdsRaw)
    if (market === Market.CREATE) {
      const result = await client.schedules.listSchedule({ sportId, date })
      return Requester.success(jobRunID, { data: result }, true)
    }
    if (market === Market.RESOLVE) {
      let statuses: string[]
      if (statusIds.length !== 0) {
        statuses = statusIds.filter(
          (statusId: string) => !(marketToStatus.get(Market.CREATE) as string[]).includes(statusId),
        )
      } else {
        statuses = marketToStatus.get(Market.RESOLVE) as string[]
      }
      const result = await client.schedules.listScores({ sportId, date, statuses })
      return Requester.success(jobRunID, { data: result }, true)
    }
    return Requester.success(jobRunID, { data: [] }, true)
  } catch (error) {
    throw new AdapterError({
      jobRunID,
      statusCode: 200,
      message: `Unexpected error returning schedules endpoint. Reason: ${error}`,
      cause: error,
    })
  }
}

export default controller
