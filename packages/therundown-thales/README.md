# Chainlink External Adapter for TheRundown Thales

![1.3.3](https://img.shields.io/github/package-json/v/smartcontractkit/external-adapters-js?filename=packages/sources/therundown-thales/package.json)

Base URL https://therundown-therundown-v1.p.rapidapi.com/

This document was generated automatically. Please see [README Generator](../../scripts#readme-generator) for more info.

## Environment Variables

| Required? |     Name     |                                         Description                                         |  Type  | Options |                      Default                       |
| :-------: | :----------: | :-----------------------------------------------------------------------------------------: | :----: | :-----: | :------------------------------------------------: |
|    ✅     |   API_KEY    | An API key that can be obtained from [here](https://rapidapi.com/therundown/api/therundown) | string |         |                                                    |
|           | API_ENDPOINT |                                                                                             | string |         | `https://therundown-therundown-v1.p.rapidapi.com/` |

---

## Input Parameters

Every EA supports base input parameters from [this list](../../core/bootstrap#base-input-parameters)

| Required? |   Name   |     Description     |  Type  |                        Options                         | Default |
| :-------: | :------: | :-----------------: | :----: | :----------------------------------------------------: | :-----: |
|           | endpoint | The endpoint to use | string | [odds](#odds-endpoint), [schedule](#schedule-endpoint) |         |

## Schedule Endpoint

`schedule` is the only supported name for this endpoint.

### Input Params

| Required? |   Name    | Aliases |                                                  Description                                                  |  Type  |                                   Options                                   | Default | Depends On | Not Valid With |
| :-------: | :-------: | :-----: | :-----------------------------------------------------------------------------------------------------------: | :----: | :-------------------------------------------------------------------------: | :-----: | :--------: | :------------: |
|    ✅     |  sportId  |         |                                         The ID of the sport to query                                          | number | `1`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `2`, `3`, `4`, `5`, `6`, `8` |         |            |                |
|    ✅     |   date    |         |                          The date of the games to query as a Unix timestamp seconds.                          | number |                                                                             |         |            |                |
|    ✅     |  market   |         |                                       Chose to create or resolve market                                       | string |                             `create`, `resolve`                             |         |            |                |
|           | statusIds |         |                         The statuses of the games to query. Examples: `["1","2","3"]`                         |        |                                                                             |         |            |                |
|           |  gameIds  |         | The IDs of games to query. Example: `["23660869053591173981da79133fe4c2","fb78cede8c9aa942b2569b048e649a3f"]` |        |                                                                             |         |            |                |

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "schedule",
    "sportId": 4,
    "date": 1635529231,
    "market": "create"
  },
  "debug": {
    "cacheKey": "ZWao7hRMZbaaivPL/6Qme1w6JxU="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "meta": {
      "delta_last_id": "11ec-b672-2e8a0ceb-848e-383815218d95"
    },
    "events": [
      {
        "event_id": "68e09220c9fb7db9705550fae8a88322",
        "event_uuid": "11ec-b605-aae70000-8763-5744b1937a7b",
        "sport_id": 4,
        "event_date": "2022-04-07T00:00:00Z",
        "rotation_number_away": 583,
        "rotation_number_home": 584,
        "score": {
          "event_id": "68e09220c9fb7db9705550fae8a88322",
          "event_status": "STATUS_FINAL",
          "score_away": 103,
          "score_home": 118,
          "winner_away": 0,
          "winner_home": 1,
          "score_away_by_period": [
            31,
            34,
            18,
            20
          ],
          "score_home_by_period": [
            40,
            27,
            28,
            23
          ],
          "venue_name": "State Farm Arena",
          "venue_location": "Atlanta, GA",
          "game_clock": 0,
          "display_clock": "0.00",
          "game_period": 4,
          "broadcast": "",
          "event_status_detail": "Final"
        },
        "teams": [
          {
            "team_id": 189,
            "team_normalized_id": 15,
            "name": "Washington Wizards",
            "is_away": true,
            "is_home": false
          },
          {
            "team_id": 186,
            "team_normalized_id": 11,
            "name": "Atlanta Hawks",
            "is_away": false,
            "is_home": true
          }
        ],
        "teams_normalized": [
          {
            "team_id": 15,
            "name": "Washington",
            "mascot": "Wizards",
            "abbreviation": "WSH",
            "ranking": 0,
            "record": "35-44",
            "is_away": true,
            "is_home": false
          },
          {
            "team_id": 11,
            "name": "Atlanta",
            "mascot": "Hawks",
            "abbreviation": "ATL",
            "ranking": 0,
            "record": "41-38",
            "is_away": false,
            "is_home": true
          }
        ],
        "schedule": {
          "season_type": "Regular Season",
          "season_year": 2022,
          "event_name": "Washington at Atlanta - 2022-04-07",
          "attendance": "0"
        },
        "lines": {
          "1": {
            "line_id": 14874369,
            "moneyline": {
              "line_id": 14874369,
              "moneyline_away": 0.0001,
              "moneyline_away_delta": -414.9999,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 525.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "date_updated": "2022-04-07T00:10:55.380897Z",
              "format": "American"
            },
            "spread": {
              "line_id": 14874369,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 1,
              "point_spread_away": 0.0001,
              "point_spread_away_delta": -9.4999,
              "point_spread_home": 0.0001,
              "point_spread_home_delta": 9.5001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 102.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 118.0001,
              "date_updated": "2022-04-07T00:10:55.401066Z",
              "format": "American"
            },
            "total": {
              "line_id": 14874369,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 1,
              "total_over": 0.0001,
              "total_over_delta": -234.9999,
              "total_under": 0.0001,
              "total_under_delta": -234.9999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 117.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 103.0001,
              "date_updated": "2022-04-07T00:10:55.431078Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 1,
              "affiliate_name": "5Dimes",
              "affiliate_url": "https://bit.ly/3rKIuBh"
            }
          },
          "2": {
            "line_id": 14874664,
            "moneyline": {
              "line_id": 14874664,
              "moneyline_away": 0.0001,
              "moneyline_away_delta": -394.9999,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 555.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "date_updated": "2022-04-07T00:10:16.243774Z",
              "format": "American"
            },
            "spread": {
              "line_id": 14874664,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 2,
              "point_spread_away": 0.0001,
              "point_spread_away_delta": -10.4999,
              "point_spread_home": 0.0001,
              "point_spread_home_delta": 10.5001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 105.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 115.0001,
              "date_updated": "2022-04-07T00:10:16.259037Z",
              "format": "American"
            },
            "total": {
              "line_id": 14874664,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 2,
              "total_over": 0.0001,
              "total_over_delta": -234.9999,
              "total_under": 0.0001,
              "total_under_delta": -234.9999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 110.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 110.0001,
              "date_updated": "2022-04-07T00:10:16.276298Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 2,
              "affiliate_name": "Bovada",
              "affiliate_url": "https://www.bovada.lv/"
            }
          },
          "3": {
            "line_id": 14875455,
            "moneyline": {
              "line_id": 14875455,
              "moneyline_away": 0.0001,
              "moneyline_away_delta": -413.9999,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 514.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "date_updated": "2022-04-07T00:10:09.403399Z",
              "format": "American"
            },
            "spread": {
              "line_id": 14875455,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 3,
              "point_spread_away": 0.0001,
              "point_spread_away_delta": -10.4999,
              "point_spread_home": 0.0001,
              "point_spread_home_delta": 10.5001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 101.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 109.0001,
              "date_updated": "2022-04-07T00:10:09.452538Z",
              "format": "American"
            },
            "total": {
              "line_id": 14875455,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 3,
              "total_over": 0.0001,
              "total_over_delta": -234.9999,
              "total_under": 0.0001,
              "total_under_delta": -234.9999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 110.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": -99.9999,
              "date_updated": "2022-04-07T00:10:09.479905Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 3,
              "affiliate_name": "Pinnacle",
              "affiliate_url": "https://www.pinnacle.com/en/rtn"
            }
          },
          "4": {
            "line_id": 14874648,
            "moneyline": {
              "line_id": 14874648,
              "moneyline_away": 0.0001,
              "moneyline_away_delta": -394.9999,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 500.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 500.0001,
              "date_updated": "2022-04-07T00:10:52.675779Z",
              "format": "American"
            },
            "spread": {
              "line_id": 14874648,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 4,
              "point_spread_away": 0.0001,
              "point_spread_away_delta": -10.4999,
              "point_spread_home": 0.0001,
              "point_spread_home_delta": 10.5001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 110.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 110.0001,
              "date_updated": "2022-04-07T00:10:52.708895Z",
              "format": "American"
            },
            "total": {
              "line_id": 14874648,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 4,
              "total_over": 0.0001,
              "total_over_delta": -235.4999,
              "total_under": 0.0001,
              "total_under_delta": -235.4999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 110.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 110.0001,
              "date_updated": "2022-04-07T00:10:52.731097Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 4,
              "affiliate_name": "SportsBetting",
              "affiliate_url": "http://bit.ly/2JT73M1"
            }
          },
          "6": {
            "line_id": 14874642,
            "moneyline": {
              "line_id": 14874642,
              "moneyline_away": 0.0001,
              "moneyline_away_delta": -394.9999,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 500.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 500.0001,
              "date_updated": "2022-04-07T00:10:33.728679Z",
              "format": "American"
            },
            "spread": {
              "line_id": 14874642,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 6,
              "point_spread_away": 0.0001,
              "point_spread_away_delta": -10.4999,
              "point_spread_home": 0.0001,
              "point_spread_home_delta": 10.5001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 110.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 110.0001,
              "date_updated": "2022-04-07T00:10:33.749979Z",
              "format": "American"
            },
            "total": {
              "line_id": 14874642,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 6,
              "total_over": 0.0001,
              "total_over_delta": -235.4999,
              "total_under": 0.0001,
              "total_under_delta": -235.4999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 110.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 110.0001,
              "date_updated": "2022-04-07T00:10:33.767774Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 6,
              "affiliate_name": "BetOnline",
              "affiliate_url": "http://bit.ly/3oogty4"
            }
          },
          "11": {
            "line_id": 14874654,
            "moneyline": {
              "line_id": 14874654,
              "moneyline_away": 0.0001,
              "moneyline_away_delta": -394.9999,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 500.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 500.0001,
              "date_updated": "2022-04-07T00:10:44.550588Z",
              "format": "American"
            },
            "spread": {
              "line_id": 14874654,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 11,
              "point_spread_away": 0.0001,
              "point_spread_away_delta": -10.4999,
              "point_spread_home": 0.0001,
              "point_spread_home_delta": 10.5001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 105.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 105.0001,
              "date_updated": "2022-04-07T00:10:44.581718Z",
              "format": "American"
            },
            "total": {
              "line_id": 14874654,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 11,
              "total_over": 0.0001,
              "total_over_delta": -235.4999,
              "total_under": 0.0001,
              "total_under_delta": -235.4999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 105.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 105.0001,
              "date_updated": "2022-04-07T00:10:44.604474Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 11,
              "affiliate_name": "LowVig",
              "affiliate_url": "https://sportsbook.lowvig.ag/"
            }
          },
          "12": {
            "line_id": 14874670,
            "moneyline": {
              "line_id": 14874670,
              "moneyline_away": 0.0001,
              "moneyline_away_delta": -394.9999,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 555.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "date_updated": "2022-04-07T00:10:32.085493Z",
              "format": "American"
            },
            "spread": {
              "line_id": 14874670,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 12,
              "point_spread_away": 0.0001,
              "point_spread_away_delta": -10.4999,
              "point_spread_home": 0.0001,
              "point_spread_home_delta": 10.5001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 105.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 115.0001,
              "date_updated": "2022-04-07T00:10:32.10929Z",
              "format": "American"
            },
            "total": {
              "line_id": 14874670,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 12,
              "total_over": 0.0001,
              "total_over_delta": -234.9999,
              "total_under": 0.0001,
              "total_under_delta": -234.9999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 110.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 110.0001,
              "date_updated": "2022-04-07T00:10:32.144135Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 12,
              "affiliate_name": "Bodog",
              "affiliate_url": "https://bit.ly/2Z5uFkw"
            }
          },
          "14": {
            "line_id": 14875389,
            "moneyline": {
              "line_id": 14875389,
              "moneyline_away": 0.0001,
              "moneyline_away_delta": -399.9999,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 530.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "date_updated": "2022-04-07T00:10:00.756521Z",
              "format": "American"
            },
            "spread": {
              "line_id": 14875389,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 14,
              "point_spread_away": 0.0001,
              "point_spread_away_delta": -10.4999,
              "point_spread_home": 0.0001,
              "point_spread_home_delta": 10.5001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 110.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 110.0001,
              "date_updated": "2022-04-07T00:10:00.770869Z",
              "format": "American"
            },
            "total": {
              "line_id": 14875389,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 14,
              "total_over": 0.0001,
              "total_over_delta": -234.9999,
              "total_under": 0.0001,
              "total_under_delta": -234.9999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 110.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 110.0001,
              "date_updated": "2022-04-07T00:10:00.792524Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 14,
              "affiliate_name": "Intertops",
              "affiliate_url": "http://bit.ly/2XkXdpa"
            }
          },
          "16": {
            "line_id": 14874370,
            "moneyline": {
              "line_id": 14874370,
              "moneyline_away": 0.0001,
              "moneyline_away_delta": -439.9999,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 476.1901,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "date_updated": "2022-04-07T00:10:19.349187Z",
              "format": "American"
            },
            "spread": {
              "line_id": 14874370,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 16,
              "point_spread_away": 0.0001,
              "point_spread_away_delta": 0,
              "point_spread_home": 0.0001,
              "point_spread_home_delta": 0,
              "point_spread_away_money": 0.0001,
...
```

<details>
<summary>Additional Examples</summary>

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "schedule",
    "sportId": 4,
    "date": 1635529231,
    "market": "resolve"
  },
  "debug": {
    "cacheKey": "aXx1YDkpJ0s7ejKzNcsZ1J1zGW4="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "events": [
      {
        "event_id": "4d73cc8177b94d4d9e2052fa57ebcf1c",
        "event_uuid": "11ec-384b-28cf0000-823d-cd821c1e16bb",
        "sport_id": 4,
        "event_date": "2021-10-29T00:00:00Z",
        "rotation_number_away": 555,
        "rotation_number_home": 556,
        "score": {
          "event_id": "4d73cc8177b94d4d9e2052fa57ebcf1c",
          "event_status": "STATUS_FINAL",
          "score_away": 122,
          "score_home": 91,
          "winner_away": 1,
          "winner_home": 0,
          "score_away_by_period": [32, 29, 31, 30],
          "score_home_by_period": [18, 22, 32, 19],
          "venue_name": "Toyota Center (Houston)",
          "venue_location": "Houston, TX",
          "game_clock": 0,
          "display_clock": "0.00",
          "game_period": 4,
          "broadcast": "",
          "event_status_detail": "Final"
        },
        "teams": [
          {
            "team_id": 152,
            "team_normalized_id": 20,
            "name": "Utah Jazz",
            "is_away": true,
            "is_home": false
          },
          {
            "team_id": 188,
            "team_normalized_id": 27,
            "name": "Houston Rockets",
            "is_away": false,
            "is_home": true
          }
        ],
        "teams_normalized": [
          {
            "team_id": 20,
            "name": "Utah",
            "mascot": "Jazz",
            "abbreviation": "UTAH",
            "ranking": 0,
            "record": "39-22",
            "is_away": true,
            "is_home": false
          },
          {
            "team_id": 27,
            "name": "Houston",
            "mascot": "Rockets",
            "abbreviation": "HOU",
            "ranking": 0,
            "record": "15-47",
            "is_away": false,
            "is_home": true
          }
        ],
        "schedule": {
          "season_type": "Regular Season",
          "season_year": 2022,
          "event_name": "Utah at Houston - 2021-10-29",
          "attendance": "0"
        },
        "line_periods": null
      }
    ],
    "result": [
      "0x3464373363633831373762393464346439653230353266613537656263663163000000000000000000000000000000000000000000000000000000000000005b000000000000000000000000000000000000000000000000000000000000007a0000000000000000000000000000000000000000000000000000000000000008"
    ]
  },
  "result": [
    "0x3464373363633831373762393464346439653230353266613537656263663163000000000000000000000000000000000000000000000000000000000000005b000000000000000000000000000000000000000000000000000000000000007a0000000000000000000000000000000000000000000000000000000000000008"
  ],
  "statusCode": 200,
  "providerStatusCode": 200
}
```

</details>

---

## Odds Endpoint

`odds` is the only supported name for this endpoint.

### Input Params

| Required? |  Name   | Aliases |                                                  Description                                                  |  Type  |                                   Options                                   | Default | Depends On | Not Valid With |
| :-------: | :-----: | :-----: | :-----------------------------------------------------------------------------------------------------------: | :----: | :-------------------------------------------------------------------------: | :-----: | :--------: | :------------: |
|    ✅     | sportId |         |                                         The ID of the sport to query                                          | number | `1`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `2`, `3`, `4`, `5`, `6`, `8` |         |            |                |
|    ✅     |  date   |         |                          The date of the games to query as a Unix timestamp seconds.                          | number |                                                                             |         |            |                |
|           | gameIds |         | The IDs of games to query. Example: `["23660869053591173981da79133fe4c2","fb78cede8c9aa942b2569b048e649a3f"]` |        |                                                                             |         |            |                |

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "odds",
    "sportId": 4,
    "date": 1635529231
  },
  "debug": {
    "cacheKey": "gJba2MNcPMOHcvICv2x9w0fxRcU="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "meta": {
      "delta_last_id": "11ec-b672-2e8a0ceb-848e-383815218d95"
    },
    "events": [
      {
        "event_id": "68e09220c9fb7db9705550fae8a88322",
        "event_uuid": "11ec-b605-aae70000-8763-5744b1937a7b",
        "sport_id": 4,
        "event_date": "2022-04-07T00:00:00Z",
        "rotation_number_away": 583,
        "rotation_number_home": 584,
        "score": {
          "event_id": "68e09220c9fb7db9705550fae8a88322",
          "event_status": "STATUS_FINAL",
          "score_away": 103,
          "score_home": 118,
          "winner_away": 0,
          "winner_home": 1,
          "score_away_by_period": [
            31,
            34,
            18,
            20
          ],
          "score_home_by_period": [
            40,
            27,
            28,
            23
          ],
          "venue_name": "State Farm Arena",
          "venue_location": "Atlanta, GA",
          "game_clock": 0,
          "display_clock": "0.00",
          "game_period": 4,
          "broadcast": "",
          "event_status_detail": "Final"
        },
        "teams": [
          {
            "team_id": 189,
            "team_normalized_id": 15,
            "name": "Washington Wizards",
            "is_away": true,
            "is_home": false
          },
          {
            "team_id": 186,
            "team_normalized_id": 11,
            "name": "Atlanta Hawks",
            "is_away": false,
            "is_home": true
          }
        ],
        "teams_normalized": [
          {
            "team_id": 15,
            "name": "Washington",
            "mascot": "Wizards",
            "abbreviation": "WSH",
            "ranking": 0,
            "record": "35-44",
            "is_away": true,
            "is_home": false
          },
          {
            "team_id": 11,
            "name": "Atlanta",
            "mascot": "Hawks",
            "abbreviation": "ATL",
            "ranking": 0,
            "record": "41-38",
            "is_away": false,
            "is_home": true
          }
        ],
        "schedule": {
          "season_type": "Regular Season",
          "season_year": 2022,
          "event_name": "Washington at Atlanta - 2022-04-07",
          "attendance": "0"
        },
        "lines": {
          "1": {
            "line_id": 14874369,
            "moneyline": {
              "line_id": 14874369,
              "moneyline_away": 0.0001,
              "moneyline_away_delta": -414.9999,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 525.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "date_updated": "2022-04-07T00:10:55.380897Z",
              "format": "American"
            },
            "spread": {
              "line_id": 14874369,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 1,
              "point_spread_away": 0.0001,
              "point_spread_away_delta": -9.4999,
              "point_spread_home": 0.0001,
              "point_spread_home_delta": 9.5001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 102.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 118.0001,
              "date_updated": "2022-04-07T00:10:55.401066Z",
              "format": "American"
            },
            "total": {
              "line_id": 14874369,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 1,
              "total_over": 0.0001,
              "total_over_delta": -234.9999,
              "total_under": 0.0001,
              "total_under_delta": -234.9999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 117.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 103.0001,
              "date_updated": "2022-04-07T00:10:55.431078Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 1,
              "affiliate_name": "5Dimes",
              "affiliate_url": "https://bit.ly/3rKIuBh"
            }
          },
          "2": {
            "line_id": 14874664,
            "moneyline": {
              "line_id": 14874664,
              "moneyline_away": 0.0001,
              "moneyline_away_delta": -394.9999,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 555.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "date_updated": "2022-04-07T00:10:16.243774Z",
              "format": "American"
            },
            "spread": {
              "line_id": 14874664,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 2,
              "point_spread_away": 0.0001,
              "point_spread_away_delta": -10.4999,
              "point_spread_home": 0.0001,
              "point_spread_home_delta": 10.5001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 105.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 115.0001,
              "date_updated": "2022-04-07T00:10:16.259037Z",
              "format": "American"
            },
            "total": {
              "line_id": 14874664,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 2,
              "total_over": 0.0001,
              "total_over_delta": -234.9999,
              "total_under": 0.0001,
              "total_under_delta": -234.9999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 110.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 110.0001,
              "date_updated": "2022-04-07T00:10:16.276298Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 2,
              "affiliate_name": "Bovada",
              "affiliate_url": "https://www.bovada.lv/"
            }
          },
          "3": {
            "line_id": 14875455,
            "moneyline": {
              "line_id": 14875455,
              "moneyline_away": 0.0001,
              "moneyline_away_delta": -413.9999,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 514.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "date_updated": "2022-04-07T00:10:09.403399Z",
              "format": "American"
            },
            "spread": {
              "line_id": 14875455,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 3,
              "point_spread_away": 0.0001,
              "point_spread_away_delta": -10.4999,
              "point_spread_home": 0.0001,
              "point_spread_home_delta": 10.5001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 101.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 109.0001,
              "date_updated": "2022-04-07T00:10:09.452538Z",
              "format": "American"
            },
            "total": {
              "line_id": 14875455,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 3,
              "total_over": 0.0001,
              "total_over_delta": -234.9999,
              "total_under": 0.0001,
              "total_under_delta": -234.9999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 110.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": -99.9999,
              "date_updated": "2022-04-07T00:10:09.479905Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 3,
              "affiliate_name": "Pinnacle",
              "affiliate_url": "https://www.pinnacle.com/en/rtn"
            }
          },
          "4": {
            "line_id": 14874648,
            "moneyline": {
              "line_id": 14874648,
              "moneyline_away": 0.0001,
              "moneyline_away_delta": -394.9999,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 500.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 500.0001,
              "date_updated": "2022-04-07T00:10:52.675779Z",
              "format": "American"
            },
            "spread": {
              "line_id": 14874648,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 4,
              "point_spread_away": 0.0001,
              "point_spread_away_delta": -10.4999,
              "point_spread_home": 0.0001,
              "point_spread_home_delta": 10.5001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 110.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 110.0001,
              "date_updated": "2022-04-07T00:10:52.708895Z",
              "format": "American"
            },
            "total": {
              "line_id": 14874648,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 4,
              "total_over": 0.0001,
              "total_over_delta": -235.4999,
              "total_under": 0.0001,
              "total_under_delta": -235.4999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 110.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 110.0001,
              "date_updated": "2022-04-07T00:10:52.731097Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 4,
              "affiliate_name": "SportsBetting",
              "affiliate_url": "http://bit.ly/2JT73M1"
            }
          },
          "6": {
            "line_id": 14874642,
            "moneyline": {
              "line_id": 14874642,
              "moneyline_away": 0.0001,
              "moneyline_away_delta": -394.9999,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 500.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 500.0001,
              "date_updated": "2022-04-07T00:10:33.728679Z",
              "format": "American"
            },
            "spread": {
              "line_id": 14874642,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 6,
              "point_spread_away": 0.0001,
              "point_spread_away_delta": -10.4999,
              "point_spread_home": 0.0001,
              "point_spread_home_delta": 10.5001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 110.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 110.0001,
              "date_updated": "2022-04-07T00:10:33.749979Z",
              "format": "American"
            },
            "total": {
              "line_id": 14874642,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 6,
              "total_over": 0.0001,
              "total_over_delta": -235.4999,
              "total_under": 0.0001,
              "total_under_delta": -235.4999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 110.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 110.0001,
              "date_updated": "2022-04-07T00:10:33.767774Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 6,
              "affiliate_name": "BetOnline",
              "affiliate_url": "http://bit.ly/3oogty4"
            }
          },
          "11": {
            "line_id": 14874654,
            "moneyline": {
              "line_id": 14874654,
              "moneyline_away": 0.0001,
              "moneyline_away_delta": -394.9999,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 500.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 500.0001,
              "date_updated": "2022-04-07T00:10:44.550588Z",
              "format": "American"
            },
            "spread": {
              "line_id": 14874654,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 11,
              "point_spread_away": 0.0001,
              "point_spread_away_delta": -10.4999,
              "point_spread_home": 0.0001,
              "point_spread_home_delta": 10.5001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 105.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 105.0001,
              "date_updated": "2022-04-07T00:10:44.581718Z",
              "format": "American"
            },
            "total": {
              "line_id": 14874654,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 11,
              "total_over": 0.0001,
              "total_over_delta": -235.4999,
              "total_under": 0.0001,
              "total_under_delta": -235.4999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 105.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 105.0001,
              "date_updated": "2022-04-07T00:10:44.604474Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 11,
              "affiliate_name": "LowVig",
              "affiliate_url": "https://sportsbook.lowvig.ag/"
            }
          },
          "12": {
            "line_id": 14874670,
            "moneyline": {
              "line_id": 14874670,
              "moneyline_away": 0.0001,
              "moneyline_away_delta": -394.9999,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 555.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "date_updated": "2022-04-07T00:10:32.085493Z",
              "format": "American"
            },
            "spread": {
              "line_id": 14874670,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 12,
              "point_spread_away": 0.0001,
              "point_spread_away_delta": -10.4999,
              "point_spread_home": 0.0001,
              "point_spread_home_delta": 10.5001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 105.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 115.0001,
              "date_updated": "2022-04-07T00:10:32.10929Z",
              "format": "American"
            },
            "total": {
              "line_id": 14874670,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 12,
              "total_over": 0.0001,
              "total_over_delta": -234.9999,
              "total_under": 0.0001,
              "total_under_delta": -234.9999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 110.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 110.0001,
              "date_updated": "2022-04-07T00:10:32.144135Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 12,
              "affiliate_name": "Bodog",
              "affiliate_url": "https://bit.ly/2Z5uFkw"
            }
          },
          "14": {
            "line_id": 14875389,
            "moneyline": {
              "line_id": 14875389,
              "moneyline_away": 0.0001,
              "moneyline_away_delta": -399.9999,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 530.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "date_updated": "2022-04-07T00:10:00.756521Z",
              "format": "American"
            },
            "spread": {
              "line_id": 14875389,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 14,
              "point_spread_away": 0.0001,
              "point_spread_away_delta": -10.4999,
              "point_spread_home": 0.0001,
              "point_spread_home_delta": 10.5001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 110.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 110.0001,
              "date_updated": "2022-04-07T00:10:00.770869Z",
              "format": "American"
            },
            "total": {
              "line_id": 14875389,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 14,
              "total_over": 0.0001,
              "total_over_delta": -234.9999,
              "total_under": 0.0001,
              "total_under_delta": -234.9999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 110.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 110.0001,
              "date_updated": "2022-04-07T00:10:00.792524Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 14,
              "affiliate_name": "Intertops",
              "affiliate_url": "http://bit.ly/2XkXdpa"
            }
          },
          "16": {
            "line_id": 14874370,
            "moneyline": {
              "line_id": 14874370,
              "moneyline_away": 0.0001,
              "moneyline_away_delta": -439.9999,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 476.1901,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "date_updated": "2022-04-07T00:10:19.349187Z",
              "format": "American"
            },
            "spread": {
              "line_id": 14874370,
              "event_id": "68e09220c9fb7db9705550fae8a88322",
              "affiliate_id": 16,
              "point_spread_away": 0.0001,
              "point_spread_away_delta": 0,
              "point_spread_home": 0.0001,
              "point_spread_home_delta": 0,
              "point_spread_away_money": 0.0001,
...
```

---

MIT License
