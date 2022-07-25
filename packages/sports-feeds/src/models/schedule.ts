export interface ISchedule {
  homeTeam: string
  awayTeam: string
  startTime: number
  gameId: string
}

// schedule is the json blob returned to match to the interface that is made here
const transformer = {
  therundown: (schedule): ISchedule => ({
    homeTeam: schedule.homeTeam,
    awayTeam: schedule.awayTeam,
    startTime: schedule.startTime,
    gameId: schedule.gameId,
  }),
  // sportsdataio: (schedule): ISchedule => ({
  //   homeTeam:
  //   awayTeam:
  //   startTime:
  //   gameId:
  // })
}

const Single = (schedule: any, provider): ISchedule => transformer[provider](schedule)

const List = (data: any, provider): ISchedule[] =>
  data.map((schedule: any) => Single(schedule, provider))

export default {
  Single,
  List,
}
