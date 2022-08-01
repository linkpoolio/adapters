import { AdapterError, Requester, Validator } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig, AdapterRequest } from '@chainlink/types'
import { validateGames, encodeGameCreate, encodeGameResolve } from '../../lib/utils'
import { inputParameters } from './input'
import { Market } from '../schedules/input'
import { ISchedule, IResolve } from '../../models/schedule'

const controller: ExecuteWithConfig<Config> = async (request: AdapterRequest, _, __) => {
  const validator = new Validator(request, inputParameters)

  const jobRunID = validator.validated.id
  const type = validator.validated.data.type
  const rundown = validator.validated.data.rundown
//   const theap = validator.validated.data.theap
  const sdio = validator.validated.data.sdio

  try {
    if (type === Market.CREATE) {
      validateGames<ISchedule>(rundown, sdio)
      const encoded: string[] = rundown.map((e: ISchedule) => encodeGameCreate(e))
      return Requester.success(jobRunID, { data: encoded }, true)
    } else {
      validateGames<IResolve>(rundown, sdio)
      const encoded: string[] = rundown.map((e: IResolve) => encodeGameResolve(e))
      return Requester.success(jobRunID, { data: encoded }, true)
    }
  } catch (error) {
    throw new AdapterError({
      jobRunID,
      statusCode: 200,
      message: `Unexpected error returning validate endpoint. Reason: ${error}`,
      cause: error,
    })
  }
}

export default controller
