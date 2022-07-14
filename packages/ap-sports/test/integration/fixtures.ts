import nock from 'nock'

import { DEFAULT_BASE_URL } from '../../src/config'

export const mockScheduleSuccessMalformed = (): nock.Scope =>
  nock(DEFAULT_BASE_URL, {
    encodedQueryParams: true,
  })
    .get('/mlb/trial/v7/en/games/2022/4/16/boxscore.json?api_key=fake-api-key')
    .reply(
      200,
      () => ({
        league: {
          alias: 'MLB',
          name: 'Major League Baseball',
          id: '2fa448bc-fc17-4d3d-be03-e60e080fdc26',
          date: '2022-06-21',
          games: [
            {
              game: {
                id: '32aec692-7974-4d97-b078-45c3c60fe1e0',
                status: 'scheduled',

                scheduled: '2022-06-22T00:10:00+00:00',
                // Missing Home
                away: {
                  name: 'Blue Jays',
                  market: 'Toronto',
                  id: '1d678440-b4b1-4954-9b39-70afb3ebbcfa',
                  runs: 'linkpool',
                },
              },
            },
            {
              game: {
                id: 'de3ca292-4b6a-4269-8f80-be5c37f366f5',
                status: 'closed',

                scheduled: '2022-06-22T00:10:00+00:00',
                // Missing Home
                away: {
                  name: 'Royals',
                  market: 'Kansas City',
                  id: '1d678440-b4b1-4954-9b39-70afb3ebbcfa',
                  runs: 6,
                },
              },
            },
          ],
        },
        _comment: 'Generation started @ 2022-07-14 03:14:49 UTC ended @ 2022-07-14 03:14:50 UTC',
      }),
      [
        'Content-Type',
        'application/json',
        'Connection',
        'close',
        'Vary',
        'Accept-Encoding',
        'Vary',
        'Origin',
      ],
    )

export const mockScheduleGameResolveSuccess = (): nock.Scope =>
  nock(DEFAULT_BASE_URL, {
    encodedQueryParams: true,
  })
    .get('/mlb/trial/v7/en/games/2022/6/21/boxscore.json?api_key=fake-api-key')
    .reply(
      200,
      () => ({
        league: {
          alias: 'MLB',
          name: 'Major League Baseball',
          id: '2fa448bc-fc17-4d3d-be03-e60e080fdc26',
          date: '2022-06-21',
          games: [
            {
              game: {
                id: '32aec692-7974-4d97-b078-45c3c60fe1e0',
                status: 'closed',

                scheduled: '2022-06-22T00:10:00+00:00',
                home: {
                  name: 'White Sox',
                  market: 'Chicago',
                  id: '47f490cd-2f58-4ef7-9dfd-2ad6ba6c1ae8',
                  runs: 7,
                },
                away: {
                  name: 'Blue Jays',
                  market: 'Toronto',
                  id: '1d678440-b4b1-4954-9b39-70afb3ebbcfa',
                  runs: 6,
                },
              },
            },
            {
              game: {
                id: 'de3ca292-4b6a-4269-8f80-be5c37f366f5',
                status: 'closed',

                scheduled: '2022-06-22T00:10:00+00:00',
                home: {
                  name: 'Angels',
                  market: 'Los Angeles',
                  id: '47f490cd-2f58-4ef7-9dfd-2ad6ba6c1ae8',
                  runs: 7,
                },
                away: {
                  name: 'Royals',
                  market: 'Kansas City',
                  id: '1d678440-b4b1-4954-9b39-70afb3ebbcfa',
                  runs: 6,
                },
              },
            },
          ],
        },
        _comment: 'Generation started @ 2022-07-14 03:14:49 UTC ended @ 2022-07-14 03:14:50 UTC',
      }),
      [
        'Content-Type',
        'application/json',
        'Connection',
        'close',
        'Vary',
        'Accept-Encoding',
        'Vary',
        'Origin',
      ],
    )

export const mockScheduleGameCreateSuccess = (): nock.Scope =>
  nock(DEFAULT_BASE_URL, {
    encodedQueryParams: true,
  })
    .get('/mlb/trial/v7/en/games/2022/6/21/boxscore.json?api_key=fake-api-key')
    .reply(
      200,
      () => ({
        league: {
          alias: 'MLB',
          name: 'Major League Baseball',
          id: '2fa448bc-fc17-4d3d-be03-e60e080fdc26',
          date: '2022-06-21',
          games: [
            {
              game: {
                id: '32aec692-7974-4d97-b078-45c3c60fe1e0',
                status: 'scheduled',

                scheduled: '2022-06-22T00:10:00+00:00',
                home: {
                  name: 'White Sox',
                  market: 'Chicago',
                  id: '47f490cd-2f58-4ef7-9dfd-2ad6ba6c1ae8',
                  runs: 7,
                },
                away: {
                  name: 'Blue Jays',
                  market: 'Toronto',
                  id: '1d678440-b4b1-4954-9b39-70afb3ebbcfa',
                  runs: 6,
                },
              },
            },
          ],
        },
        _comment: 'Generation started @ 2022-07-14 03:14:49 UTC ended @ 2022-07-14 03:14:50 UTC',
      }),
      [
        'Content-Type',
        'application/json',
        'Connection',
        'close',
        'Vary',
        'Accept-Encoding',
        'Vary',
        'Origin',
      ],
    )

export const mockScheduleSuccessNoEvents = (): nock.Scope =>
  nock(DEFAULT_BASE_URL, {
    encodedQueryParams: true,
  })
    .get('/mlb/trial/v7/en/games/2022/6/21/boxscore.json?api_key=fake-api-key')
    .reply(
      200,
      () => ({
        league: {
          alias: 'MLB',
          name: 'Major League Baseball',
          id: '2fa448bc-fc17-4d3d-be03-e60e080fdc26',
          date: '2022-10-08',
        },
        _comment: 'Generation started @ 2022-07-14 03:50:54 UTC ended @ 2022-07-14 03:50:54 UTC',
      }),
      [
        'Content-Type',
        'application/json',
        'Connection',
        'close',
        'Vary',
        'Accept-Encoding',
        'Vary',
        'Origin',
      ],
    )
