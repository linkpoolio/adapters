import { ISchedules } from '../base'
import Schedule, { ISchedule, IResolve } from '../../models/schedule'

const provider = 'therundown'

export default (fetch): ISchedules => ({
  listSchedule: async ({ sportId, date }): Promise<ISchedule[]> => {
    const response = await fetch({ url: `sports/${sportId}/events/${date}` })
    const data = response?.data ? response.data.events : []
    return Schedule.ListSchedule(data, provider, date)
  },
  listScores: async ({ sportId, date, statuses }): Promise<IResolve[]> => {
    const response = await fetch({ url: `sports/${sportId}/events/${date}` })
    const data = response?.data ? response.data.events : []
    return Schedule.ListScores(data, provider, statuses, date)
  },
})
