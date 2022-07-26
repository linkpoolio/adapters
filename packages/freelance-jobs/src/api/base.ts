import { IJob } from '../models/job'

export interface IJobs {
  get: (props: any) => Promise<IJob>
}

export interface Base {
  jobs: IJobs
}
