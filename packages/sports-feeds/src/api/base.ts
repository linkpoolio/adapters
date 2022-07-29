import { ISchedule, IResolve } from '../models/schedule'

export interface ISchedules {
  listSchedule: (props: any) => Promise<ISchedule[]>
  listScores: (props: any) => Promise<IResolve[]>
}

export interface IValidate {
  validate: (props: any) => Promise<ISchedule[]>
}

export interface Base {
  schedules: ISchedules
  validate: IValidate
}
