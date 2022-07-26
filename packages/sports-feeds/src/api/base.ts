import { ISchedule, IResolve } from '../models/schedule'

export interface ISchedules {
  listSchedule: (props: any) => Promise<ISchedule[]>
  listScores: (props: any) => Promise<IResolve[]>
}

export interface Base {
  schedules: ISchedules
}
