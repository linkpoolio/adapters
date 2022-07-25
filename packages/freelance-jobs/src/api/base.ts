import { IJob } from '../models/job'

export interface IJobs {
  single: (props: any) => Promise<IJob>
}

export interface Base {
  jobs: IJobs
}
