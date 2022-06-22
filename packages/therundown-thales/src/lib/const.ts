export enum SportId {
  NCAA_Football = 1,
  NFL = 2,
  MLB = 3,
  NBA = 4,
  NCAA_Basketball = 5,
  NHL = 6,
  WNBA = 8,
  MLS = 10,
  EPL = 11,
  FRA1 = 12,
  GER1 = 13,
  ESP1 = 14,
  ITA1 = 15,
  UEFACHAMP = 16,
}

export enum Market {
  CREATE = 'create',
  RESOLVE = 'resolve',
}

export const maxLimit = 500

export const statusIdToStatus: Map<number, string> = new Map([
  [1, 'STATUS_CANCELED'],
  [2, 'STATUS_DELAYED'],
  [3, 'STATUS_END_OF_FIGHT'],
  [4, 'STATUS_END_OF_ROUND'],
  [5, 'STATUS_END_PERIOD'],
  [6, 'STATUS_FIGHTERS_INTRODUCTION'],
  [7, 'STATUS_FIGHTERS_WALKING'],
  [8, 'STATUS_FINAL'],
  [9, 'STATUS_FINAL_PEN'],
  [10, 'STATUS_FIRST_HALF'],
  [11, 'STATUS_FULL_TIME'],
  [12, 'STATUS_HALFTIME'],
  [13, 'STATUS_IN_PROGRESS'],
  [14, 'STATUS_IN_PROGRESS_2'],
  [15, 'STATUS_POSTPONED'],
  [16, 'STATUS_PRE_FIGHT'],
  [17, 'STATUS_RAIN_DELAY'],
  [18, 'STATUS_SCHEDULED'],
  [19, 'STATUS_SECOND_HALF'],
  [20, 'STATUS_TBD'],
  [21, 'STATUS_UNCONTESTED'],
  [22, 'STATUS_ABANDONED'],
  [23, 'STATUS_END_OF_EXTRATIME'],
  [24, 'STATUS_END_OF_REGULATION'],
  [25, 'STATUS_FORFEIT'],
  [26, 'STATUS_HALFTIME_ET'],
  [27, 'STATUS_OVERTIME'],
  [28, 'STATUS_SHOOTOUT'],
])

export const statusToStatusId = new Map(
  Array.from(statusIdToStatus, (a) => a.reverse() as [string, number]),
)

export const marketToStatus: Map<Market, string[]> = new Map([
  [Market.CREATE, [statusIdToStatus.get(18) as string]],
  [
    Market.RESOLVE,
    [
      ...Array.from(statusIdToStatus)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([key, _]) => key !== 18)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(([_, value]) => value),
    ],
  ],
])

export const NO_EVENT_ODDS = 0.0001

export const EVENT_ODDS_EXPONENT = 100
