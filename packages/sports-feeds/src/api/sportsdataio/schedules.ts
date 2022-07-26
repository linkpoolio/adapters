import { ISchedules } from '../base'
import Schedule, { ISchedule } from '../../models/schedule'

const provider = 'sportsdataio'

export default (fetch): ISchedules => ({
  listSchedule: async (): Promise<ISchedule[]> => {
    const response = await fetch({ url: 'schedules/list' })
    const data = response?.data?.length ? response.data : []
    return Schedule.ListSchedule(data, provider)
  },
  listScores: async (): Promise<ISchedule[]> => {
    const response = await fetch({ url: 'schedules/list' })
    const data = response?.data?.length ? response.data : []
    return Schedule.ListScores(data, provider)
  },
})
