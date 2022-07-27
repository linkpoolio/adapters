import {
  // encodeGameResolve,
  createEventId,
  transformDate,
  findScore,
  filterEventStatus,
} from '../lib/utils'
import { statusToStatusId, statusSportsData } from '../controllers/schedules/input'

export interface IGame {
  homeTeam: string
  awayTeam: string
  startTime: number
  homeScore: number | null
  awayScore: number
  statusId: number
  gameId: string
}

export interface ISchedule {
  homeTeam: string
  awayTeam: string
  startTime: number
  gameId: string
}

export interface IResolve {
  homeScore: number
  awayScore: number
  statusId: number
  gameId: string
}

// schedule is the json blob returned to match to the interface that is made here
const transformer = {
  therundown: (schedule): IGame => ({
    homeTeam: schedule.teams_normalized[1].abbreviation,
    awayTeam: schedule.teams_normalized[0].abbreviation,
    startTime: Math.floor(new Date(schedule.event_date).getTime() / 1000),
    gameId: createEventId(transformDate(schedule.event_date), [
      schedule.teams_normalized[1].abbreviation,
      schedule.teams_normalized[0].abbreviation,
    ]),
    homeScore: schedule.score.score_home,
    awayScore: schedule.score.score_away,
    statusId: statusToStatusId.get(schedule.score?.event_status) as number,
  }),
  sportsdataio: (schedule): IGame => ({
    homeTeam: schedule.HomeTeam,
    awayTeam: schedule.AwayTeam,
    startTime: Math.floor(new Date(schedule.DateTime).getTime() / 1000),
    gameId: createEventId(transformDate(schedule.Day), [schedule.HomeTeam, schedule.AwayTeam]),
    homeScore: findScore(schedule)[0],
    awayScore: findScore(schedule)[1],
    statusId: statusSportsData.get(schedule.Status) as number,
  }),
}

const Single = (schedule: any, provider): IGame => transformer[provider](schedule)

const ListSchedule = (data: any, provider): ISchedule[] => {
  const events = data.map((schedule: any) => Single(schedule, provider))
  const filteredEvents = events.filter(
    (event) => event.statusId == statusToStatusId.get('STATUS_SCHEDULED') || 'Scheduled',
  )
  const result = filteredEvents.map(
    (game): ISchedule => ({
      homeTeam: game.homeTeam,
      awayTeam: game.awayTeam,
      startTime: game.startTime,
      gameId: game.gameId,
    }),
  )
  // const encoded = result.map((e: ISchedule) => encodeGameCreate(e))

  return result
}

const ListScores = (data: any, provider, statuses): IResolve[] => {
  const events = data.map((schedule: any) => Single(schedule, provider))
  const filteredEvents = events.filter((event: IGame) => {
    return filterEventStatus(event, statuses)
  })
  const result = filteredEvents.map(
    (game): IResolve => ({
      homeScore: game.homeScore,
      awayScore: game.awayScore,
      statusId: game.statusId,
      gameId: game.gameId,
    }),
  )
  // const encoded = result.map((e: IResolve) => encodeGameResolve(e))

  return result
}

export default {
  Single,
  ListSchedule,
  ListScores,
}
