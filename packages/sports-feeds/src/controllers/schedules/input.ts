import { InputParameters } from '@chainlink/types'

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

export const leagueIdUrlPath = new Map<any, string>([
  [2, 'nfl'],
  [3, 'mlb'],
  [4, 'nba'],
])

export const inputParameters: InputParameters = {
  sportId: {
    description: 'The ID of the sport to query',
    required: true,
    type: 'number',
    options: [
      SportId.NFL,
      SportId.MLB,
      SportId.NBA,
      SportId.NHL,
      SportId.NCAA_Football,
      SportId.NCAA_Basketball,
      SportId.WNBA,
      SportId.MLS,
      SportId.EPL,
      SportId.FRA1,
      SportId.GER1,
      SportId.ESP1,
      SportId.ITA1,
      SportId.UEFACHAMP,
    ],
  },
  date: {
    description: 'The date of the games to query in epoch',
    required: true,
    type: 'number',
  },
  market: {
    description: 'Chose to create or resolve market',
    required: true,
    type: 'string',
    options: [Market.CREATE, Market.RESOLVE],
  },
  statusIds: {
    description: 'The statuses of the games to query. Examples: `["1","2","3"]`',
    required: false,
  },
  gameIds: {
    description:
      'The IDs of games to query. Example: `["23660869053591173981da79133fe4c2","fb78cede8c9aa942b2569b048e649a3f"]`',
    required: false,
  },
}

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

export const statusSportsData: Map<string, number> = new Map([
  ['final', 8],
  ['scheduled', 18],
  ['inprogress', 13],
  ['closed', 8],
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

export const validateAndGetStatusIds = (statusIdsRaw: string[]): string[] => {
  if (!statusIdsRaw) return []
  if (statusIdsRaw === null) return []
  const statusIds = statusIdsRaw.map(
    (statusId: string) => statusIdToStatus.get(Number(statusId)) as string,
  )
  statusIdsRaw.forEach((statusIdRaw: string) => {
    if (!statusIdToStatus.has(Number(statusIdRaw))) {
      throw new Error(
        `Invalid 'statusIds': ${statusIdRaw}. Valid status ID are ${[
          ...statusIdToStatus.keys(),
        ].join()}.}`,
      )
    }
  })

  return statusIds
}
