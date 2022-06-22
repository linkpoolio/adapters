export enum LeagueId {
  MLB = 0,
}

export enum Market {
  CREATE = 0,
  RESOLVE = 1,
}

export enum Status {
  FINAL = 'Final',
  SCHEDULED = 'Scheduled',
}

export const leagueIdUrlPath: Map<LeagueId, string> = new Map([[LeagueId.MLB, 'mlb']])

export const leagueIdRequiredEnvVar: Map<LeagueId, string> = new Map([
  [LeagueId.MLB, 'MLB_API_KEY'],
])

// API response types & sizes https://sportsdata.io/developers/data-dictionary/mlb
export const marketResultEncode: Map<Market, string[]> = new Map([
  [Market.CREATE, ['uint32', 'uint40', 'bytes10', 'bytes10', 'bytes3']],
  [Market.RESOLVE, ['uint32', 'uint8', 'uint8', 'bytes20', 'bytes6']],
])
