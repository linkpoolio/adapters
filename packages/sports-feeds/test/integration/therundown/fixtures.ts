import nock from 'nock'

// TODO: declare api baseUrls for all providers in easily exportable object
const url = 'https://pro-api.coingecko.com/api/v3'

const schedules = [
  {
    id: 1,
    name: 'fake-schedule-1',
  },
  {
    id: 2,
    name: 'fake-schedule-2',
  },
  {
    id: 3,
    name: 'fake-schedule-3',
  },
]

export const mockScheduleSuccess = (): nock => {
  return nock(url).get(`/schedules/list?x_cg_pro_api_key=${process.env.API_KEY}`).reply(200, {
    data: schedules,
  })
}
