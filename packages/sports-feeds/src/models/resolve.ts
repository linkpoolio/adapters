import { convertEventId } from '../lib/utils'
import { statusToStatusId } from '../controllers/schedules/input'

export interface IResolve {
  homeScore: number
  awayScore: number
  statusId: number
  gameId: string
}

const transformer = {
  therundown: (resolve): IResolve => ({
    homeScore: resolve.score?.score_home,
    awayScore: resolve.score?.score_away,
    gameId: convertEventId(resolve.event_id),
    statusId: statusToStatusId.get(resolve.score?.event_status) as number,
  }),
  // sportsdataio: (resolve): IResolve => ({
  //   homeTeam:
  //   awayTeam:
  //   startTime:
  //   gameId:
  // })
}

const Single = (resolve: any, provider): IResolve => transformer[provider](resolve)

const List = (data: any, provider): IResolve[] =>
  data.map((resolve: any) => Single(resolve, provider))

export default {
  Single,
  List,
}
