import { ISchedules } from '../base'
import Schedule, { ISchedule, IResolve } from '../../models/schedule'
import { leagueIdUrlPath } from '../../controllers/schedules/input'

const provider = 'theAP'

export default (fetch): ISchedules => ({
  listSchedule: async ({ sportId, date }): Promise<ISchedule[]> => {
    const [year, month, day] = date.split('-')
    const response = await fetch({
      url: `${leagueIdUrlPath.get(
        sportId,
      )}/trial/v7/en/games/${year}/${month}/${day}/boxscore.json`,
    })
    const data = response?.data ? response.data.league.games : []
    return Schedule.ListSchedule(data, provider, date)
  },
  listScores: async ({ sportId, date, statuses }): Promise<IResolve[]> => {
    const [year, month, day] = date.split('-')
    const response = await fetch({
      url: `${leagueIdUrlPath.get(
        sportId,
      )}/trial/v7/en/games/${year}/${month}/${day}/boxscore.json`,
    })
    const data = response?.data ? response.data.league.games : []
    return Schedule.ListScores(data, provider, statuses, date)
  },
})
