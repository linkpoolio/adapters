import { IJobs } from '../base'
import type { IJob } from '../../models/job'
import Job from '../../models/job'
import { Provider } from '../constants'

export default (fetch): IJobs => ({
  // TODO: add support for API_VERBOSE?
  single: async ({ jobId }): Promise<IJob> => {
    const response = await fetch({
      url: `jobRequests/`,
      params: {
        jobId,
      },
    })
    // TODO: add support for API_VERBOSE?
    return Job.Single(response.data, Provider.LANCERIA)
  },
})
