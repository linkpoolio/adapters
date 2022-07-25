import { ISchedule } from '../models/schedule'

export interface ISchedules {
  list: () => Promise<ISchedule[]>
}

export interface Base {
  schedules: ISchedules
}
