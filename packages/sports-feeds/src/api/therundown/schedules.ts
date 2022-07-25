import { ISchedules } from '../base'
import Schedule, { ISchedule } from '../../models/schedule'

const provider = 'therundown'

export default (fetch): ISchedules => ({
  list: async (): Promise<ISchedule[]> => {
    const response = await fetch({ url: 'schedules/list' })
    const data = response?.data?.length ? response.data : []
    return Schedule.List(data, provider)
  },
})
