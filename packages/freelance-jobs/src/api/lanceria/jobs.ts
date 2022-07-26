import { IJobs } from '../base'
import type { IJob } from '../../models/job'
import Job from '../../models/job'
import { Provider } from '../constants'

export default (fetch): IJobs => ({
  get: async ({ jobId }): Promise<IJob> => {
    const response = await fetch({
      url: `jobRequests/`,
      params: {
        jobId,
      },
    })
    return Job.Single(response.data, Provider.LANCERIA)
  },
})
