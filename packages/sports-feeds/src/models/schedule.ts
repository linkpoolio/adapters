import {
  // encodeGameResolve,
  // encodeGameCreate,
  createEventId,
  findScore,
  filterEventStatus,
  convertTeam,
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

const transformer = {
  therundown: (schedule: any, date: string): IGame => ({
    homeTeam: schedule.teams_normalized[1].abbreviation,
    awayTeam: schedule.teams_normalized[0].abbreviation,
    startTime: Math.floor(new Date(schedule.event_date).getTime() / 1000),
    gameId: createEventId(date, [
      schedule.teams_normalized[1].abbreviation,
      schedule.teams_normalized[0].abbreviation,
    ]),
    homeScore: schedule.score.score_home,
    awayScore: schedule.score.score_away,
    statusId: statusToStatusId.get(schedule.score?.event_status) as number,
  }),
  sportsdataio: (schedule: any, date: string): IGame => {
    const hometeam = convertTeam(schedule.HomeTeam)
    const awayteam = convertTeam(schedule.AwayTeam)
    return {
      homeTeam: hometeam,
      awayTeam: awayteam,
      startTime: Math.floor(new Date(schedule.DateTime).getTime() / 1000),
      gameId: createEventId(date, [hometeam, awayteam]),
      homeScore: findScore(schedule)[0],
      awayScore: findScore(schedule)[1],
      statusId: statusSportsData.get(schedule.Status.toLowerCase()) as number,
    }
  },
  theAP: (schedule: any, date: string): IGame => ({
    homeTeam: schedule.game.home.abbr,
    awayTeam: schedule.game.away.abbr,
    startTime: Math.floor(new Date(schedule.game.scheduled).getTime() / 1000),
    gameId: createEventId(date, [schedule.game.home.abbr, schedule.game.away.abbr]),
    homeScore: findScore(schedule)[0],
    awayScore: findScore(schedule)[1],
    statusId: statusSportsData.get(schedule.game.status.toLowerCase()) as number,
  }),
}

const Single = (schedule: any, provider: string, date: string): IGame =>
  transformer[provider](schedule, date)

const ListSchedule = (data: any, provider: string, date: string): ISchedule[] => {
  const events = data.map((schedule: any) => Single(schedule, provider, date))
  const filteredEvents = events.filter(
    (event) =>
      event.statusId == statusToStatusId.get('STATUS_SCHEDULED') ||
      statusSportsData.get('scheduled'),
  )
  const result = filteredEvents.map(
    (game): ISchedule => ({
      homeTeam: game.homeTeam,
      awayTeam: game.awayTeam,
      startTime: game.startTime,
      gameId: game.gameId,
    }),
  )

  return result
}

const ListScores = (data: any, provider: string, statuses: string[], date: string): IResolve[] => {
  const events = data.map((schedule: any) => Single(schedule, provider, date))
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

  return result
}

export default {
  Single,
  ListSchedule,
  ListScores,
}
