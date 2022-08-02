import { utils } from 'ethers'

import type { CMStatistics, Statistics } from './types'

export const getStatistics = (statisticsRaw: CMStatistics): Statistics => {
  const statistics = {
    youtube: statisticsRaw.ycs_subscribers ?? 0,
    spotify: statisticsRaw.sp_monthly_listeners ?? 0,
    tiktok: statisticsRaw.tiktok_followers ?? 0,
  }

  return statistics
}

export const encodeStatistics = (statistics: Statistics): string => {
  return utils.solidityPack(
    ['uint64', 'uint64', 'uint64', 'uint64'],
    [statistics.youtube, statistics.spotify, statistics.tiktok, 0],
  )
}
