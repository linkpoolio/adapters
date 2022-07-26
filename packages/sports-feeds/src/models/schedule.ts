import { convertEventId, encodeGameCreate, encodeGameResolve } from '../lib/utils'
import { marketToStatus, Market, statusToStatusId } from '../controllers/schedules/input'

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
    homeTeam: `${schedule.teams_normalized[1].name} ${schedule.teams_normalized[1].mascot}`,
    awayTeam: `${schedule.teams_normalized[0].name} ${schedule.teams_normalized[0].mascot}`,
    startTime: Math.floor(new Date(schedule.event_date).getTime() / 1000),
    gameId: convertEventId(schedule.event_id),
    homeScore: schedule.score.score_home,
    awayScore: schedule.score.score_away,
    statusId: statusToStatusId.get(schedule.score?.event_status) as number,
  }),
  sportsdataio: (schedule): IGame => ({
    homeTeam: schedule.HomeTeam,
    awayTeam: schedule.AwayTeam,
    startTime: Math.floor(new Date(schedule.event_date).getTime() / 1000),
    gameId: schedule.GameID, // need to figure this out
    homeScore: schedule.HomeTeamRuns, // need to figure this out
    awayScore: schedule.AwayTeamRuns, // need to figure this out
    statusId: schedule.Status, // need to figure this out
  }),
}

const Single = (schedule: any, provider): IGame => transformer[provider](schedule)

const ListSchedule = (data: any, provider): ISchedule[] => {
  const events = data.map((schedule: any) => Single(schedule, provider))
  const filteredEvents = events.filter(
    (event) => event.statusId == statusToStatusId.get('STATUS_SCHEDULED'),
  )
  const result = filteredEvents.map(
    (game): ISchedule => ({
      homeTeam: game.homeTeam,
      awayTeam: game.awayTeam,
      startTime: game.startTime,
      gameId: game.gameId,
    }),
  )
  const encoded = result.map((e: ISchedule) => encodeGameCreate(e))

  return encoded
}

const ListScores = (data: any, provider): IResolve[] => {
  const statuses = marketToStatus.get(Market.RESOLVE) as string[]
  const events = data.map((schedule: any) => Single(schedule, provider))
  const filteredEvents = events.filter((event: Event) => {
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
  const encoded = result.map((e: IResolve) => encodeGameResolve(e))

  return encoded
}

export default {
  Single,
  ListSchedule,
  ListScores,
}
