export interface ISportsDataioMLB {
  AwayTeamRuns: number
  HomeTeamRuns: number
}

export interface IapMLB {
  game: IGame
}

interface IGame {
  home: IHome
  away: IAway
}

interface IHome {
  runs: number
}

interface IAway {
  runs: number
}
