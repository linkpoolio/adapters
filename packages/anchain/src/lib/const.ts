export enum Chain {
  ETH = 1,
  BTC = 2,
}

export const categoryToCategoryId: Map<string, number> = new Map([
  ['unaffiliated', 0],
  ['app wallet', 1],
  ['whale', 2],
  ['dapp', 3],
  ['token', 4],
  ['contract', 5],
  ['miner', 6],
  ['defi', 7],
  ['mixer', 8],
  ['bot', 9],
  ['hacker', 10],
  ['scam', 11],
  ['ransomware', 12],
  ['abuse', 13],
  ['sanction', 14],
  ['darknet market', 15],
  ['blackmail', 16],
])
