import type { InputParameters } from '@chainlink/types'

import { supportedSportIdSchedule } from './const'

export const sharedInputParameters: InputParameters = {
  // Filtering params
  sportId: {
    description: 'The ID of the sport to query.',
    required: true,
    type: 'number',
    options: supportedSportIdSchedule,
  },
  date: {
    description: 'The date of the games to query as a Unix timestamp seconds.',
    required: true,
    type: 'number',
  },
  gameIds: {
    description:
      'The IDs of games to query. Example: `["23660869053591173981da79133fe4c2","fb78cede8c9aa942b2569b048e649a3f"]`.',
    required: false,
  },
  // Odds logic params
  sportIdToBookmakerIds: {
    description:
      `A JSON object with sportId as key and an Array of bookmaker IDs (Integer) as value. ` +
      `The order of the bookmaker IDs sets the priority for where to fetch the game odds.`,
    required: false,
  },
  // Pagination params
  // NB: do not default `limit` as it will vary depending on the combination of sportId, market and network
  limit: {
    description: `The maximum number of results to be returned. The minumum value is \`1\``,
    required: true,
    type: 'number',
  },
  startAfterGameId: {
    description:
      'A cursor for use in pagination. It is the game ID that defines your place in the ' +
      'list and after which game start fetching new results.',
    required: false,
    type: 'string',
  },
}
