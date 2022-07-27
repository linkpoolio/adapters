import { ISchedules } from '../base'
import Schedule, { ISchedule, IResolve } from '../../models/schedule'
import { leagueIdUrlPath } from '../../controllers/schedules/input'

const provider = 'sportsdataio'

export default (fetch): ISchedules => ({
  listSchedule: async ({ sportId, date }): Promise<ISchedule[]> => {
    const response = await fetch({
      url: `${leagueIdUrlPath.get(sportId)}/scores/json/GamesByDate/${date}`,
    })
    const data = response?.data ? response.data : []
    return Schedule.ListSchedule(data, provider)
  },
  listScores: async ({ sportId, date, statuses }): Promise<IResolve[]> => {
    const response = await fetch({
      url: `${leagueIdUrlPath.get(sportId)}/scores/json/GamesByDate/${date}`,
    })
    const data = response?.data ? response.data : []
    return Schedule.ListScores(data, provider, statuses)
  },
})
