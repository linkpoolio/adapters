export interface IResolve {
  homeTeam: string
  awayTeam: string
  startTime: number
  gameId: string
}

// schedule is the json blob returned to match to the interface that is made here
const transformer = {
  therundown: (resolve): IResolve => ({
    homeTeam: resolve.homeTeam,
    awayTeam: resolve.awayTeam,
    startTime: resolve.startTime,
    gameId: resolve.gameId,
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
