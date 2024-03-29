# Chainlink External Adapter for TheRundown

![3.0.0](https://img.shields.io/github/package-json/v/linkpoolio/adapters?filename=packages/therundown-lp/package.json)

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

| Required? |   Name   |     Description     |  Type  |                                                          Options                                                          |    Default    |
| :-------: | :------: | :-----------------: | :----: | :-----------------------------------------------------------------------------------------------------------------------: | :-----------: |
|           | endpoint | The endpoint to use | string | [event](#event-endpoint), [events](#events-endpoint), [schedule](#schedule-endpoint), [total-score](#totalscore-endpoint) | `total-score` |

## TotalScore Endpoint

Returns the sum of both teams' scores for a match (match status must be final)

`total-score` is the only supported name for this endpoint.

### Input Params

| Required? |  Name   | Aliases |         Description          | Type | Options | Default | Depends On | Not Valid With |
| :-------: | :-----: | :-----: | :--------------------------: | :--: | :-----: | :-----: | :--------: | :------------: |
|    ✅     | matchId |         | The ID of the match to query |      |         |         |            |                |

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "total-score",
    "matchId": "5527455bb80a5e9884153786aeb5f2b2"
  },
  "debug": {
    "cacheKey": "ryGC9W88xHG0R1Sa+pavq5CMmeU="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "event_id": "5527455bb80a5e9884153786aeb5f2b2",
    "event_uuid": "11ea-fb62-b7f6e800-8bef-8a4dcc350d17",
    "sport_id": 2,
    "event_date": "2020-09-20T17:00:00Z",
    "rotation_number_away": 277,
    "rotation_number_home": 278,
    "score": {
      "event_id": "5527455bb80a5e9884153786aeb5f2b2",
      "event_status": "STATUS_FINAL",
      "score_away": 13,
      "score_home": 17,
      "winner_away": 0,
      "winner_home": 1,
      "score_away_by_period": [
        0,
        0,
        3,
        10
      ],
      "score_home_by_period": [
        10,
        7,
        0,
        0
      ],
      "venue_name": "Soldier Field",
      "venue_location": "Chicago, IL",
      "game_clock": 0,
      "display_clock": "0.00",
      "game_period": 4,
      "broadcast": "CBS",
      "event_status_detail": "Final"
    },
    "teams": [
      {
        "team_id": 18620,
        "team_normalized_id": 78,
        "name": "New York Giants",
        "is_away": true,
        "is_home": false
      },
      {
        "team_id": 18611,
        "team_normalized_id": 81,
        "name": "Chicago Bears",
        "is_away": false,
        "is_home": true
      }
    ],
    "teams_normalized": [
      {
        "team_id": 78,
        "name": "New York",
        "mascot": "Giants",
        "abbreviation": "NYG",
        "ranking": 0,
        "record": "4-7",
        "is_away": true,
        "is_home": false
      },
      {
        "team_id": 81,
        "name": "Chicago",
        "mascot": "Bears",
        "abbreviation": "CHI",
        "ranking": 0,
        "record": "4-7",
        "is_away": false,
        "is_home": true
      }
    ],
    "schedule": {
      "season_type": "Regular Season",
      "season_year": 2020,
      "week": 2,
      "week_name": "Week 2",
      "week_detail": "Sep 16-22",
      "event_name": "New York at Chicago - 2020-09-20",
      "attendance": "0"
    },
    "lines": {
      "1": {
        "line_id": 10806455,
        "moneyline": {
          "line_id": 10806455,
          "moneyline_away": 190,
          "moneyline_away_delta": 0,
          "moneyline_home": -230,
          "moneyline_home_delta": 0,
          "moneyline_draw": 0.0001,
          "moneyline_draw_delta": 0,
          "date_updated": "2020-09-20T17:02:29.872469Z",
          "format": "American"
        },
        "spread": {
          "line_id": 10806455,
          "event_id": "5527455bb80a5e9884153786aeb5f2b2",
          "affiliate_id": 1,
          "point_spread_away": 4.5,
          "point_spread_away_delta": 0,
          "point_spread_home": -4.5,
          "point_spread_home_delta": 0,
          "point_spread_away_money": -110,
          "point_spread_away_money_delta": -8,
          "point_spread_home_money": -110,
          "point_spread_home_money_delta": -2,
          "date_updated": "2020-09-20T17:02:29.879369Z",
          "format": "American"
        },
        "total": {
          "line_id": 10806455,
          "event_id": "5527455bb80a5e9884153786aeb5f2b2",
          "affiliate_id": 1,
          "total_over": 43,
          "total_over_delta": 0,
          "total_under": 43,
          "total_under_delta": 0,
          "total_over_money": -110,
          "total_over_money_delta": -5,
          "total_under_money": -110,
          "total_under_money_delta": -5,
          "date_updated": "2020-09-20T17:02:29.889256Z",
          "format": "American"
        },
        "affiliate": {
          "affiliate_id": 1,
          "affiliate_name": "5Dimes",
          "affiliate_url": "https://bit.ly/3rKIuBh"
        }
      },
      "2": {
        "line_id": 10806465,
        "moneyline": {
          "line_id": 10806465,
          "moneyline_away": 180,
          "moneyline_away_delta": 0,
          "moneyline_home": -220,
          "moneyline_home_delta": 0,
          "moneyline_draw": 0.0001,
          "moneyline_draw_delta": 0,
          "date_updated": "2020-09-20T16:17:25.542016Z",
          "format": "American"
        },
        "spread": {
          "line_id": 10806465,
          "event_id": "5527455bb80a5e9884153786aeb5f2b2",
          "affiliate_id": 2,
          "point_spread_away": 4.5,
          "point_spread_away_delta": 0,
          "point_spread_home": -4.5,
          "point_spread_home_delta": 0,
          "point_spread_away_money": -115,
          "point_spread_away_money_delta": -5,
          "point_spread_home_money": -105,
          "point_spread_home_money_delta": 5,
          "date_updated": "2020-09-20T16:17:25.551993Z",
          "format": "American"
        },
        "total": {
          "line_id": 10806465,
          "event_id": "5527455bb80a5e9884153786aeb5f2b2",
          "affiliate_id": 2,
          "total_over": 42.5,
          "total_over_delta": -0.5,
          "total_under": 42.5,
          "total_under_delta": -0.5,
          "total_over_money": -110,
          "total_over_money_delta": 0,
          "total_under_money": -110,
          "total_under_money_delta": 0,
          "date_updated": "2020-09-20T15:47:53.589026Z",
          "format": "American"
        },
        "affiliate": {
          "affiliate_id": 2,
          "affiliate_name": "Bovada",
          "affiliate_url": "https://www.bovada.lv/"
        }
      },
      "3": {
        "line_id": 10978226,
        "moneyline": {
          "line_id": 10978226,
          "moneyline_away": 196,
          "moneyline_away_delta": 0,
          "moneyline_home": -222,
          "moneyline_home_delta": 0,
          "moneyline_draw": 0.0001,
          "moneyline_draw_delta": 0,
          "date_updated": "2020-09-20T17:01:58.698796Z",
          "format": "American"
        },
        "spread": {
          "line_id": 10978226,
          "event_id": "5527455bb80a5e9884153786aeb5f2b2",
          "affiliate_id": 3,
          "point_spread_away": 4.5,
          "point_spread_away_delta": 0,
          "point_spread_home": -4.5,
          "point_spread_home_delta": 0,
          "point_spread_away_money": -105,
          "point_spread_away_money_delta": 0,
          "point_spread_home_money": -105,
          "point_spread_home_money_delta": 0,
          "extended_spreads": [
            {
              "affiliate_id": 3,
              "point_spread_away": 2,
              "point_spread_away_delta": 0,
              "point_spread_home": -2,
              "point_spread_home_delta": 0,
              "point_spread_away_money": 162,
              "point_spread_away_money_delta": 0,
              "point_spread_home_money": -187,
              "point_spread_home_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "point_spread_away": 2.5,
              "point_spread_away_delta": 0,
              "point_spread_home": -2.5,
              "point_spread_home_delta": 0,
              "point_spread_away_money": 151,
              "point_spread_away_money_delta": 0,
              "point_spread_home_money": -174,
              "point_spread_home_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "point_spread_away": 3,
              "point_spread_away_delta": 0,
              "point_spread_home": -3,
              "point_spread_home_delta": 0,
              "point_spread_away_money": 131,
              "point_spread_away_money_delta": 0,
              "point_spread_home_money": -150,
              "point_spread_home_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "point_spread_away": 3.5,
              "point_spread_away_delta": 0,
              "point_spread_home": -3.5,
              "point_spread_home_delta": 0,
              "point_spread_away_money": 108,
              "point_spread_away_money_delta": 0,
              "point_spread_home_money": -122,
              "point_spread_home_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "point_spread_away": 4,
              "point_spread_away_delta": 0,
              "point_spread_home": -4,
              "point_spread_home_delta": 0,
              "point_spread_away_money": 102,
              "point_spread_away_money_delta": 0,
              "point_spread_home_money": -114,
              "point_spread_home_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "point_spread_away": 4.5,
              "point_spread_away_delta": 0,
              "point_spread_home": -4.5,
              "point_spread_home_delta": 0,
              "point_spread_away_money": -105,
              "point_spread_away_money_delta": 0,
              "point_spread_home_money": -105,
              "point_spread_home_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "point_spread_away": 5,
              "point_spread_away_delta": 0,
              "point_spread_home": -5,
              "point_spread_home_delta": 0,
              "point_spread_away_money": -111,
              "point_spread_away_money_delta": 0,
              "point_spread_home_money": -100,
              "point_spread_home_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "point_spread_away": 5.5,
              "point_spread_away_delta": 0,
              "point_spread_home": -5.5,
              "point_spread_home_delta": 0,
              "point_spread_away_money": -117,
              "point_spread_away_money_delta": 0,
              "point_spread_home_money": 104,
              "point_spread_home_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "point_spread_away": 6,
              "point_spread_away_delta": 0,
              "point_spread_home": -6,
              "point_spread_home_delta": 0,
              "point_spread_away_money": -128,
              "point_spread_away_money_delta": 0,
              "point_spread_home_money": 113,
              "point_spread_home_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "point_spread_away": 6.5,
              "point_spread_away_delta": 0,
              "point_spread_home": -6.5,
              "point_spread_home_delta": 0,
              "point_spread_away_money": -138,
              "point_spread_away_money_delta": 0,
              "point_spread_home_money": 121,
              "point_spread_home_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "point_spread_away": 7,
              "point_spread_away_delta": 0,
              "point_spread_home": -7,
              "point_spread_home_delta": 0,
              "point_spread_away_money": -159,
              "point_spread_away_money_delta": 0,
              "point_spread_home_money": 139,
              "point_spread_home_money_delta": 0
            }
          ],
          "date_updated": "2020-09-20T17:01:58.705943Z",
          "format": "American"
        },
        "total": {
          "line_id": 10978226,
          "event_id": "5527455bb80a5e9884153786aeb5f2b2",
          "affiliate_id": 3,
          "total_over": 42.5,
          "total_over_delta": 0,
          "total_under": 42.5,
          "total_under_delta": 0,
          "total_over_money": -108,
          "total_over_money_delta": 0,
          "total_under_money": -103,
          "total_under_money_delta": 0,
          "extended_totals": [
            {
              "affiliate_id": 3,
              "total_over": 40,
              "total_over_delta": 0,
              "total_under": 40,
              "total_under_delta": 0,
              "total_over_money": -150,
              "total_over_money_delta": 0,
              "total_under_money": 131,
              "total_under_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "total_over": 40.5,
              "total_over_delta": 0,
              "total_under": 40.5,
              "total_under_delta": 0,
              "total_over_money": -140,
              "total_over_money_delta": 0,
              "total_under_money": 123,
              "total_under_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "total_over": 41,
              "total_over_delta": 0,
              "total_under": 41,
              "total_under_delta": 0,
              "total_over_money": -131,
              "total_over_money_delta": 0,
              "total_under_money": 115,
              "total_under_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "total_over": 41.5,
              "total_over_delta": 0,
              "total_under": 41.5,
              "total_under_delta": 0,
              "total_over_money": -121,
              "total_over_money_delta": 0,
              "total_under_money": 107,
              "total_under_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "total_over": 42,
              "total_over_delta": 0,
              "total_under": 42,
              "total_under_delta": 0,
              "total_over_money": -115,
              "total_over_money_delta": 0,
              "total_under_money": 101,
              "total_under_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "total_over": 42.5,
              "total_over_delta": 0,
              "total_under": 42.5,
              "total_under_delta": 0,
              "total_over_money": -108,
              "total_over_money_delta": 0,
              "total_under_money": -103,
              "total_under_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "total_over": 43,
              "total_over_delta": 0,
              "total_under": 43,
              "total_under_delta": 0,
              "total_over_money": -101,
              "total_over_money_delta": 0,
              "total_under_money": -113,
              "total_under_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "total_over": 43.5,
              "total_over_delta": 0,
              "total_under": 43.5,
              "total_under_delta": 0,
              "total_over_money": 107,
              "total_over_money_delta": 0,
              "total_under_money": -122,
              "total_under_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "total_over": 44,
              "total_over_delta": 0,
              "total_under": 44,
              "total_under_delta": 0,
              "total_over_money": 114,
              "total_over_money_delta": 0,
              "total_under_money": -130,
              "total_under_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "total_over": 44.5,
              "total_over_delta": 0,
              "total_under": 44.5,
              "total_under_delta": 0,
              "total_over_money": 121,
              "total_over_money_delta": 0,
              "total_under_money": -138,
              "total_under_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "total_over": 45,
              "total_over_delta": 0,
              "total_under": 45,
              "total_under_delta": 0,
              "total_over_money": 132,
              "total_over_money_delta": 0,
              "total_under_money": -151,
              "total_under_money_delta": 0
            }
          ],
          "date_updated": "2020-09-20T16:46:40.741951Z",
          "format": "American"
        },
        "affiliate": {
          "affiliate_id": 3,
          "affiliate_name": "Pinnacle",
          "affiliate_url": "https://www.pinnacle.com/en/rtn"
        }
      },
      "4": {
        "line_id": 10972470,
        "moneyline": {
          "line_id": 10972470,
          "moneyline_away": 190,
          "moneyline_away_delta": 0,
          "moneyline_home": -220,
          "moneyline_home_delta": 0,
          "moneyline_draw": -220,
          "moneyline_draw_delta": 0,
          "date_updated": "2020-09-20T16:16:59.033795Z",
          "format": "American"
        },
        "spread": {
          "line_id": 10972470,
          "event_id": "5527455bb80a5e9884153786aeb5f2b2",
          "affiliate_id": 4,
          "point_spread_away": 4.5,
          "point_spread_away_delta": 0,
          "point_spread_home": -4.5,
          "point_spread_home_delta": 0,
          "point_spread_away_money": -110,
          "point_spread_away_money_delta": 2,
...
```

---

## Events Endpoint

Returns all events within the specified params

`events` is the only supported name for this endpoint.

### Input Params

| Required? |  Name   | Aliases |                Description                |  Type  | Options | Default | Depends On | Not Valid With |
| :-------: | :-----: | :-----: | :---------------------------------------: | :----: | :-----: | :-----: | :--------: | :------------: |
|    ✅     | sportId |         |  The ID of the sport to get events from   |        |         |         |            |                |
|    ✅     |  date   |         |        The date to get events from        | string |         |         |            |                |
|           | status  |         | Optional status param to filter events on | string |         |         |            |                |

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "events",
    "sportId": 2,
    "date": "2020-09-20T17:00:00Z"
  },
  "debug": {
    "cacheKey": "MKMCnYblR+gdTWjNZN/REeM1+Mo="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "meta": {
      "delta_last_id": "11ec-569a-b9a53737-8102-3bb48f0cb234"
    },
    "events": [
      {
        "event_id": "0e5fee98ccd3e67128f6ad1d1cf5c01e",
        "event_uuid": "11ea-fb62-b7f6e800-8a04-d157674beab4",
        "sport_id": 2,
        "event_date": "2020-09-20T17:00:00Z",
        "rotation_number_away": 279,
        "rotation_number_home": 280,
        "score": {
          "event_id": "0e5fee98ccd3e67128f6ad1d1cf5c01e",
          "event_status": "STATUS_FINAL",
          "score_away": 30,
          "score_home": 33,
          "winner_away": 0,
          "winner_home": 1,
          "score_away_by_period": [
            7,
            3,
            7,
            13
          ],
          "score_home_by_period": [
            14,
            10,
            6,
            3
          ],
          "venue_name": "Nissan Stadium",
          "venue_location": "Nashville, TN",
          "game_clock": 0,
          "display_clock": "0.00",
          "game_period": 4,
          "broadcast": "CBS",
          "event_status_detail": "Final"
        },
        "teams": [
          {
            "team_id": 18618,
            "team_normalized_id": 71,
            "name": "Jacksonville Jaguars",
            "is_away": true,
            "is_home": false
          },
          {
            "team_id": 18609,
            "team_normalized_id": 72,
            "name": "Tennessee Titans",
            "is_away": false,
            "is_home": true
          }
        ],
        "teams_normalized": [
          {
            "team_id": 71,
            "name": "Jacksonville",
            "mascot": "Jaguars",
            "abbreviation": "JAX",
            "ranking": 0,
            "record": "2-10",
            "is_away": true,
            "is_home": false
          },
          {
            "team_id": 72,
            "name": "Tennessee",
            "mascot": "Titans",
            "abbreviation": "TEN",
            "ranking": 0,
            "record": "8-4",
            "is_away": false,
            "is_home": true
          }
        ],
        "schedule": {
          "season_type": "Regular Season",
          "season_year": 2020,
          "week": 2,
          "week_name": "Week 2",
          "week_detail": "Sep 16-22",
          "event_name": "Jacksonville at Tennessee - 2020-09-20",
          "attendance": "0"
        },
        "lines": {
          "1": {
            "line_id": 10806469,
            "moneyline": {
              "line_id": 10806469,
              "moneyline_away": 285,
              "moneyline_away_delta": 0,
              "moneyline_home": -345,
              "moneyline_home_delta": 0,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "date_updated": "2020-09-20T17:02:26.362883Z",
              "format": "American"
            },
            "spread": {
              "line_id": 10806469,
              "event_id": "0e5fee98ccd3e67128f6ad1d1cf5c01e",
              "affiliate_id": 1,
              "point_spread_away": 7.5,
              "point_spread_away_delta": 0.5,
              "point_spread_home": -7.5,
              "point_spread_home_delta": -0.5,
              "point_spread_away_money": -135,
              "point_spread_away_money_delta": -25,
              "point_spread_home_money": 115,
              "point_spread_home_money_delta": 15,
              "date_updated": "2020-09-20T17:02:26.370213Z",
              "format": "American"
            },
            "total": {
              "line_id": 10806469,
              "event_id": "0e5fee98ccd3e67128f6ad1d1cf5c01e",
              "affiliate_id": 1,
              "total_over": 44.5,
              "total_over_delta": 0,
              "total_under": 44.5,
              "total_under_delta": 0,
              "total_over_money": -110,
              "total_over_money_delta": -5,
              "total_under_money": -110,
              "total_under_money_delta": -5,
              "date_updated": "2020-09-20T17:02:26.37797Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 1,
              "affiliate_name": "5Dimes",
              "affiliate_url": "https://bit.ly/3rKIuBh"
            }
          },
          "2": {
            "line_id": 10806515,
            "moneyline": {
              "line_id": 10806515,
              "moneyline_away": 270,
              "moneyline_away_delta": 0,
              "moneyline_home": -340,
              "moneyline_home_delta": 0,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "date_updated": "2020-09-20T16:37:10.853705Z",
              "format": "American"
            },
            "spread": {
              "line_id": 10806515,
              "event_id": "0e5fee98ccd3e67128f6ad1d1cf5c01e",
              "affiliate_id": 2,
              "point_spread_away": 7,
              "point_spread_away_delta": 0,
              "point_spread_home": -7,
              "point_spread_home_delta": 0,
              "point_spread_away_money": -120,
              "point_spread_away_money_delta": -5,
              "point_spread_home_money": 100,
              "point_spread_home_money_delta": 205,
              "date_updated": "2020-09-20T16:52:15.334402Z",
              "format": "American"
            },
            "total": {
              "line_id": 10806515,
              "event_id": "0e5fee98ccd3e67128f6ad1d1cf5c01e",
              "affiliate_id": 2,
              "total_over": 44.5,
              "total_over_delta": 0.5,
              "total_under": 44.5,
              "total_under_delta": 0.5,
              "total_over_money": -110,
              "total_over_money_delta": 5,
              "total_under_money": -110,
              "total_under_money_delta": -5,
              "date_updated": "2020-09-20T14:17:09.327781Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 2,
              "affiliate_name": "Bovada",
              "affiliate_url": "https://www.bovada.lv/"
            }
          },
          "3": {
            "line_id": 10978227,
            "moneyline": {
              "line_id": 10978227,
              "moneyline_away": 254,
              "moneyline_away_delta": 0,
              "moneyline_home": -295,
              "moneyline_home_delta": 0,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "date_updated": "2020-09-20T16:57:31.899769Z",
              "format": "American"
            },
            "spread": {
              "line_id": 10978227,
              "event_id": "0e5fee98ccd3e67128f6ad1d1cf5c01e",
              "affiliate_id": 3,
              "point_spread_away": 7,
              "point_spread_away_delta": 0,
              "point_spread_home": -7,
              "point_spread_home_delta": 0,
              "point_spread_away_money": -116,
              "point_spread_away_money_delta": 0,
              "point_spread_home_money": 105,
              "point_spread_home_money_delta": 0,
              "extended_spreads": [
                {
                  "affiliate_id": 3,
                  "point_spread_away": 4.5,
                  "point_spread_away_delta": 0,
                  "point_spread_home": -4.5,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": 124,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": -141,
                  "point_spread_home_money_delta": 0
                },
                {
                  "affiliate_id": 3,
                  "point_spread_away": 5,
                  "point_spread_away_delta": 0,
                  "point_spread_home": -5,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": 119,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": -135,
                  "point_spread_home_money_delta": 0
                },
                {
                  "affiliate_id": 3,
                  "point_spread_away": 5.5,
                  "point_spread_away_delta": 0,
                  "point_spread_home": -5.5,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": 113,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": -128,
                  "point_spread_home_money_delta": 0
                },
                {
                  "affiliate_id": 3,
                  "point_spread_away": 6,
                  "point_spread_away_delta": 0,
                  "point_spread_home": -6,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": 106,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": -119,
                  "point_spread_home_money_delta": 0
                },
                {
                  "affiliate_id": 3,
                  "point_spread_away": 6.5,
                  "point_spread_away_delta": 0,
                  "point_spread_home": -6.5,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": -101,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": -110,
                  "point_spread_home_money_delta": 0
                },
                {
                  "affiliate_id": 3,
                  "point_spread_away": 7,
                  "point_spread_away_delta": 0,
                  "point_spread_home": -7,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": -116,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": 105,
                  "point_spread_home_money_delta": 0
                },
                {
                  "affiliate_id": 3,
                  "point_spread_away": 7.5,
                  "point_spread_away_delta": 0,
                  "point_spread_home": -7.5,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": -133,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": 119,
                  "point_spread_home_money_delta": 0
                },
                {
                  "affiliate_id": 3,
                  "point_spread_away": 8,
                  "point_spread_away_delta": 0,
                  "point_spread_home": -8,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": -140,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": 124,
                  "point_spread_home_money_delta": 0
                },
                {
                  "affiliate_id": 3,
                  "point_spread_away": 8.5,
                  "point_spread_away_delta": 0,
                  "point_spread_home": -8.5,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": -147,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": 129,
                  "point_spread_home_money_delta": 0
                },
                {
                  "affiliate_id": 3,
                  "point_spread_away": 9,
                  "point_spread_away_delta": 0,
                  "point_spread_home": -9,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": -152,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": 133,
                  "point_spread_home_money_delta": 0
                },
                {
                  "affiliate_id": 3,
                  "point_spread_away": 9.5,
                  "point_spread_away_delta": 0,
                  "point_spread_home": -9.5,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": -157,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": 137,
                  "point_spread_home_money_delta": 0
                }
              ],
              "date_updated": "2020-09-20T17:01:52.428116Z",
              "format": "American"
            },
            "total": {
              "line_id": 10978227,
              "event_id": "0e5fee98ccd3e67128f6ad1d1cf5c01e",
              "affiliate_id": 3,
              "total_over": 44.5,
              "total_over_delta": 0,
              "total_under": 44.5,
              "total_under_delta": 0,
              "total_over_money": -108,
              "total_over_money_delta": -2,
              "total_under_money": -103,
              "total_under_money_delta": 2,
              "extended_totals": [
                {
                  "affiliate_id": 3,
                  "total_over": 42,
                  "total_over_delta": 0,
                  "total_under": 42,
                  "total_under_delta": 0,
                  "total_over_money": -152,
                  "total_over_money_delta": 0,
                  "total_under_money": 133,
                  "total_under_money_delta": 0
                },
                {
                  "affiliate_id": 3,
                  "total_over": 42.5,
                  "total_over_delta": 0,
                  "total_under": 42.5,
                  "total_under_delta": 0,
                  "total_over_money": -144,
                  "total_over_money_delta": 0,
                  "total_under_money": 126,
                  "total_under_money_delta": 0
                },
                {
                  "affiliate_id": 3,
                  "total_over": 43,
                  "total_over_delta": 0,
                  "total_under": 43,
                  "total_under_delta": 0,
                  "total_over_money": -136,
                  "total_over_money_delta": 0,
                  "total_under_money": 119,
                  "total_under_money_delta": 0
                },
                {
                  "affiliate_id": 3,
                  "total_over": 43.5,
                  "total_over_delta": 0,
                  "total_under": 43.5,
                  "total_under_delta": 0,
                  "total_over_money": -126,
                  "total_over_money_delta": 0,
                  "total_under_money": 111,
                  "total_under_money_delta": 0
                },
                {
                  "affiliate_id": 3,
                  "total_over": 44,
                  "total_over_delta": 0,
                  "total_under": 44,
                  "total_under_delta": 0,
                  "total_over_money": -118,
                  "total_over_money_delta": 0,
                  "total_under_money": 104,
                  "total_under_money_delta": 0
                },
                {
                  "affiliate_id": 3,
                  "total_over": 44.5,
                  "total_over_delta": 0,
                  "total_under": 44.5,
                  "total_under_delta": 0,
                  "total_over_money": -108,
                  "total_over_money_delta": 0,
                  "total_under_money": -103,
                  "total_under_money_delta": 0
                },
                {
                  "affiliate_id": 3,
                  "total_over": 45,
                  "total_over_delta": 0,
                  "total_under": 45,
                  "total_under_delta": 0,
                  "total_over_money": 100,
                  "total_over_money_delta": 0,
                  "total_under_money": -113,
                  "total_under_money_delta": 0
                },
                {
                  "affiliate_id": 3,
                  "total_over": 45.5,
                  "total_over_delta": 0,
                  "total_under": 45.5,
                  "total_under_delta": 0,
                  "total_over_money": 109,
                  "total_over_money_delta": 0,
                  "total_under_money": -124,
                  "total_under_money_delta": 0
                },
                {
                  "affiliate_id": 3,
                  "total_over": 46,
                  "total_over_delta": 0,
                  "total_under": 46,
                  "total_under_delta": 0,
                  "total_over_money": 116,
                  "total_over_money_delta": 0,
                  "total_under_money": -132,
                  "total_under_money_delta": 0
                },
                {
                  "affiliate_id": 3,
                  "total_over": 46.5,
                  "total_over_delta": 0,
                  "total_under": 46.5,
                  "total_under_delta": 0,
                  "total_over_money": 122,
                  "total_over_money_delta": 0,
                  "total_under_money": -139,
                  "total_under_money_delta": 0
                },
                {
                  "affiliate_id": 3,
                  "total_over": 47,
                  "total_over_delta": 0,
                  "total_under": 47,
                  "total_under_delta": 0,
                  "total_over_money": 131,
                  "total_over_money_delta": 0,
                  "total_under_money": -150,
                  "total_under_money_delta": 0
                }
              ],
              "date_updated": "2020-09-20T17:01:52.437031Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 3,
              "affiliate_name": "Pinnacle",
              "affiliate_url": "https://www.pinnacle.com/en/rtn"
            }
          },
          "4": {
            "line_id": 10972471,
            "moneyline": {
              "line_id": 10972471,
              "moneyline_away": 250,
              "moneyline_away_delta": 0,
              "moneyline_home": -300,
              "moneyline_home_delta": 0,
              "moneyline_draw": -300,
              "moneyline_draw_delta": 0,
              "date_updated": "2020-09-20T16:51:46.694957Z",
              "format": "American"
            },
            "spread": {
              "line_id": 10972471,
              "event_id": "0e5fee98ccd3e67128f6ad1d1cf5c01e",
              "affiliate_id": 4,
              "point_spread_away": 7,
...
```

---

## Event Endpoint

Returns data for a specific event

`event` is the only supported name for this endpoint.

### Input Params

| Required? |  Name   | Aliases |         Description          |  Type  | Options | Default | Depends On | Not Valid With |
| :-------: | :-----: | :-----: | :--------------------------: | :----: | :-----: | :-----: | :--------: | :------------: |
|    ✅     | eventId |         | The ID of the event to query | string |         |         |            |                |

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "event",
    "eventId": "5527455bb80a5e9884153786aeb5f2b2"
  },
  "debug": {
    "cacheKey": "87PwMXhXfS/lNxqJnqHJhgKzx1U="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "event_id": "5527455bb80a5e9884153786aeb5f2b2",
    "event_uuid": "11ea-fb62-b7f6e800-8bef-8a4dcc350d17",
    "sport_id": 2,
    "event_date": "2020-09-20T17:00:00Z",
    "rotation_number_away": 277,
    "rotation_number_home": 278,
    "score": {
      "event_id": "5527455bb80a5e9884153786aeb5f2b2",
      "event_status": "STATUS_FINAL",
      "score_away": 13,
      "score_home": 17,
      "winner_away": 0,
      "winner_home": 1,
      "score_away_by_period": [
        0,
        0,
        3,
        10
      ],
      "score_home_by_period": [
        10,
        7,
        0,
        0
      ],
      "venue_name": "Soldier Field",
      "venue_location": "Chicago, IL",
      "game_clock": 0,
      "display_clock": "0.00",
      "game_period": 4,
      "broadcast": "CBS",
      "event_status_detail": "Final"
    },
    "teams": [
      {
        "team_id": 18620,
        "team_normalized_id": 78,
        "name": "New York Giants",
        "is_away": true,
        "is_home": false
      },
      {
        "team_id": 18611,
        "team_normalized_id": 81,
        "name": "Chicago Bears",
        "is_away": false,
        "is_home": true
      }
    ],
    "teams_normalized": [
      {
        "team_id": 78,
        "name": "New York",
        "mascot": "Giants",
        "abbreviation": "NYG",
        "ranking": 0,
        "record": "4-7",
        "is_away": true,
        "is_home": false
      },
      {
        "team_id": 81,
        "name": "Chicago",
        "mascot": "Bears",
        "abbreviation": "CHI",
        "ranking": 0,
        "record": "4-7",
        "is_away": false,
        "is_home": true
      }
    ],
    "schedule": {
      "season_type": "Regular Season",
      "season_year": 2020,
      "week": 2,
      "week_name": "Week 2",
      "week_detail": "Sep 16-22",
      "event_name": "New York at Chicago - 2020-09-20",
      "attendance": "0"
    },
    "lines": {
      "1": {
        "line_id": 10806455,
        "moneyline": {
          "line_id": 10806455,
          "moneyline_away": 190,
          "moneyline_away_delta": 0,
          "moneyline_home": -230,
          "moneyline_home_delta": 0,
          "moneyline_draw": 0.0001,
          "moneyline_draw_delta": 0,
          "date_updated": "2020-09-20T17:02:29.872469Z",
          "format": "American"
        },
        "spread": {
          "line_id": 10806455,
          "event_id": "5527455bb80a5e9884153786aeb5f2b2",
          "affiliate_id": 1,
          "point_spread_away": 4.5,
          "point_spread_away_delta": 0,
          "point_spread_home": -4.5,
          "point_spread_home_delta": 0,
          "point_spread_away_money": -110,
          "point_spread_away_money_delta": -8,
          "point_spread_home_money": -110,
          "point_spread_home_money_delta": -2,
          "date_updated": "2020-09-20T17:02:29.879369Z",
          "format": "American"
        },
        "total": {
          "line_id": 10806455,
          "event_id": "5527455bb80a5e9884153786aeb5f2b2",
          "affiliate_id": 1,
          "total_over": 43,
          "total_over_delta": 0,
          "total_under": 43,
          "total_under_delta": 0,
          "total_over_money": -110,
          "total_over_money_delta": -5,
          "total_under_money": -110,
          "total_under_money_delta": -5,
          "date_updated": "2020-09-20T17:02:29.889256Z",
          "format": "American"
        },
        "affiliate": {
          "affiliate_id": 1,
          "affiliate_name": "5Dimes",
          "affiliate_url": "https://bit.ly/3rKIuBh"
        }
      },
      "2": {
        "line_id": 10806465,
        "moneyline": {
          "line_id": 10806465,
          "moneyline_away": 180,
          "moneyline_away_delta": 0,
          "moneyline_home": -220,
          "moneyline_home_delta": 0,
          "moneyline_draw": 0.0001,
          "moneyline_draw_delta": 0,
          "date_updated": "2020-09-20T16:17:25.542016Z",
          "format": "American"
        },
        "spread": {
          "line_id": 10806465,
          "event_id": "5527455bb80a5e9884153786aeb5f2b2",
          "affiliate_id": 2,
          "point_spread_away": 4.5,
          "point_spread_away_delta": 0,
          "point_spread_home": -4.5,
          "point_spread_home_delta": 0,
          "point_spread_away_money": -115,
          "point_spread_away_money_delta": -5,
          "point_spread_home_money": -105,
          "point_spread_home_money_delta": 5,
          "date_updated": "2020-09-20T16:17:25.551993Z",
          "format": "American"
        },
        "total": {
          "line_id": 10806465,
          "event_id": "5527455bb80a5e9884153786aeb5f2b2",
          "affiliate_id": 2,
          "total_over": 42.5,
          "total_over_delta": -0.5,
          "total_under": 42.5,
          "total_under_delta": -0.5,
          "total_over_money": -110,
          "total_over_money_delta": 0,
          "total_under_money": -110,
          "total_under_money_delta": 0,
          "date_updated": "2020-09-20T15:47:53.589026Z",
          "format": "American"
        },
        "affiliate": {
          "affiliate_id": 2,
          "affiliate_name": "Bovada",
          "affiliate_url": "https://www.bovada.lv/"
        }
      },
      "3": {
        "line_id": 10978226,
        "moneyline": {
          "line_id": 10978226,
          "moneyline_away": 196,
          "moneyline_away_delta": 0,
          "moneyline_home": -222,
          "moneyline_home_delta": 0,
          "moneyline_draw": 0.0001,
          "moneyline_draw_delta": 0,
          "date_updated": "2020-09-20T17:01:58.698796Z",
          "format": "American"
        },
        "spread": {
          "line_id": 10978226,
          "event_id": "5527455bb80a5e9884153786aeb5f2b2",
          "affiliate_id": 3,
          "point_spread_away": 4.5,
          "point_spread_away_delta": 0,
          "point_spread_home": -4.5,
          "point_spread_home_delta": 0,
          "point_spread_away_money": -105,
          "point_spread_away_money_delta": 0,
          "point_spread_home_money": -105,
          "point_spread_home_money_delta": 0,
          "extended_spreads": [
            {
              "affiliate_id": 3,
              "point_spread_away": 2,
              "point_spread_away_delta": 0,
              "point_spread_home": -2,
              "point_spread_home_delta": 0,
              "point_spread_away_money": 162,
              "point_spread_away_money_delta": 0,
              "point_spread_home_money": -187,
              "point_spread_home_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "point_spread_away": 2.5,
              "point_spread_away_delta": 0,
              "point_spread_home": -2.5,
              "point_spread_home_delta": 0,
              "point_spread_away_money": 151,
              "point_spread_away_money_delta": 0,
              "point_spread_home_money": -174,
              "point_spread_home_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "point_spread_away": 3,
              "point_spread_away_delta": 0,
              "point_spread_home": -3,
              "point_spread_home_delta": 0,
              "point_spread_away_money": 131,
              "point_spread_away_money_delta": 0,
              "point_spread_home_money": -150,
              "point_spread_home_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "point_spread_away": 3.5,
              "point_spread_away_delta": 0,
              "point_spread_home": -3.5,
              "point_spread_home_delta": 0,
              "point_spread_away_money": 108,
              "point_spread_away_money_delta": 0,
              "point_spread_home_money": -122,
              "point_spread_home_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "point_spread_away": 4,
              "point_spread_away_delta": 0,
              "point_spread_home": -4,
              "point_spread_home_delta": 0,
              "point_spread_away_money": 102,
              "point_spread_away_money_delta": 0,
              "point_spread_home_money": -114,
              "point_spread_home_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "point_spread_away": 4.5,
              "point_spread_away_delta": 0,
              "point_spread_home": -4.5,
              "point_spread_home_delta": 0,
              "point_spread_away_money": -105,
              "point_spread_away_money_delta": 0,
              "point_spread_home_money": -105,
              "point_spread_home_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "point_spread_away": 5,
              "point_spread_away_delta": 0,
              "point_spread_home": -5,
              "point_spread_home_delta": 0,
              "point_spread_away_money": -111,
              "point_spread_away_money_delta": 0,
              "point_spread_home_money": -100,
              "point_spread_home_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "point_spread_away": 5.5,
              "point_spread_away_delta": 0,
              "point_spread_home": -5.5,
              "point_spread_home_delta": 0,
              "point_spread_away_money": -117,
              "point_spread_away_money_delta": 0,
              "point_spread_home_money": 104,
              "point_spread_home_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "point_spread_away": 6,
              "point_spread_away_delta": 0,
              "point_spread_home": -6,
              "point_spread_home_delta": 0,
              "point_spread_away_money": -128,
              "point_spread_away_money_delta": 0,
              "point_spread_home_money": 113,
              "point_spread_home_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "point_spread_away": 6.5,
              "point_spread_away_delta": 0,
              "point_spread_home": -6.5,
              "point_spread_home_delta": 0,
              "point_spread_away_money": -138,
              "point_spread_away_money_delta": 0,
              "point_spread_home_money": 121,
              "point_spread_home_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "point_spread_away": 7,
              "point_spread_away_delta": 0,
              "point_spread_home": -7,
              "point_spread_home_delta": 0,
              "point_spread_away_money": -159,
              "point_spread_away_money_delta": 0,
              "point_spread_home_money": 139,
              "point_spread_home_money_delta": 0
            }
          ],
          "date_updated": "2020-09-20T17:01:58.705943Z",
          "format": "American"
        },
        "total": {
          "line_id": 10978226,
          "event_id": "5527455bb80a5e9884153786aeb5f2b2",
          "affiliate_id": 3,
          "total_over": 42.5,
          "total_over_delta": 0,
          "total_under": 42.5,
          "total_under_delta": 0,
          "total_over_money": -108,
          "total_over_money_delta": 0,
          "total_under_money": -103,
          "total_under_money_delta": 0,
          "extended_totals": [
            {
              "affiliate_id": 3,
              "total_over": 40,
              "total_over_delta": 0,
              "total_under": 40,
              "total_under_delta": 0,
              "total_over_money": -150,
              "total_over_money_delta": 0,
              "total_under_money": 131,
              "total_under_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "total_over": 40.5,
              "total_over_delta": 0,
              "total_under": 40.5,
              "total_under_delta": 0,
              "total_over_money": -140,
              "total_over_money_delta": 0,
              "total_under_money": 123,
              "total_under_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "total_over": 41,
              "total_over_delta": 0,
              "total_under": 41,
              "total_under_delta": 0,
              "total_over_money": -131,
              "total_over_money_delta": 0,
              "total_under_money": 115,
              "total_under_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "total_over": 41.5,
              "total_over_delta": 0,
              "total_under": 41.5,
              "total_under_delta": 0,
              "total_over_money": -121,
              "total_over_money_delta": 0,
              "total_under_money": 107,
              "total_under_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "total_over": 42,
              "total_over_delta": 0,
              "total_under": 42,
              "total_under_delta": 0,
              "total_over_money": -115,
              "total_over_money_delta": 0,
              "total_under_money": 101,
              "total_under_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "total_over": 42.5,
              "total_over_delta": 0,
              "total_under": 42.5,
              "total_under_delta": 0,
              "total_over_money": -108,
              "total_over_money_delta": 0,
              "total_under_money": -103,
              "total_under_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "total_over": 43,
              "total_over_delta": 0,
              "total_under": 43,
              "total_under_delta": 0,
              "total_over_money": -101,
              "total_over_money_delta": 0,
              "total_under_money": -113,
              "total_under_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "total_over": 43.5,
              "total_over_delta": 0,
              "total_under": 43.5,
              "total_under_delta": 0,
              "total_over_money": 107,
              "total_over_money_delta": 0,
              "total_under_money": -122,
              "total_under_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "total_over": 44,
              "total_over_delta": 0,
              "total_under": 44,
              "total_under_delta": 0,
              "total_over_money": 114,
              "total_over_money_delta": 0,
              "total_under_money": -130,
              "total_under_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "total_over": 44.5,
              "total_over_delta": 0,
              "total_under": 44.5,
              "total_under_delta": 0,
              "total_over_money": 121,
              "total_over_money_delta": 0,
              "total_under_money": -138,
              "total_under_money_delta": 0
            },
            {
              "affiliate_id": 3,
              "total_over": 45,
              "total_over_delta": 0,
              "total_under": 45,
              "total_under_delta": 0,
              "total_over_money": 132,
              "total_over_money_delta": 0,
              "total_under_money": -151,
              "total_under_money_delta": 0
            }
          ],
          "date_updated": "2020-09-20T16:46:40.741951Z",
          "format": "American"
        },
        "affiliate": {
          "affiliate_id": 3,
          "affiliate_name": "Pinnacle",
          "affiliate_url": "https://www.pinnacle.com/en/rtn"
        }
      },
      "4": {
        "line_id": 10972470,
        "moneyline": {
          "line_id": 10972470,
          "moneyline_away": 190,
          "moneyline_away_delta": 0,
          "moneyline_home": -220,
          "moneyline_home_delta": 0,
          "moneyline_draw": -220,
          "moneyline_draw_delta": 0,
          "date_updated": "2020-09-20T16:16:59.033795Z",
          "format": "American"
        },
        "spread": {
          "line_id": 10972470,
          "event_id": "5527455bb80a5e9884153786aeb5f2b2",
          "affiliate_id": 4,
          "point_spread_away": 4.5,
          "point_spread_away_delta": 0,
          "point_spread_home": -4.5,
          "point_spread_home_delta": 0,
          "point_spread_away_money": -110,
          "point_spread_away_money_delta": 2,
...
```

---

## Schedule Endpoint

`schedule` is the only supported name for this endpoint.

### Input Params

| Required? |       Name        | Aliases |                                                        Description                                                        |  Type   |                                           Options                                           | Default | Depends On | Not Valid With |
| :-------: | :---------------: | :-----: | :-----------------------------------------------------------------------------------------------------------------------: | :-----: | :-----------------------------------------------------------------------------------------: | :-----: | :--------: | :------------: |
|    ✅     |      sportId      |         |                                               The ID of the sport to query                                                | number  | `1`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `18`, `2`, `3`, `4`, `5`, `6`, `7`, `7`, `8` |         |            |                |
|    ✅     |       date        |         |                                          The date of the games to query in epoch                                          | number  |                                                                                             |         |            |                |
|    ✅     |      market       |         |                                             Chose to create or resolve market                                             | string  |                                     `create`, `resolve`                                     |         |            |                |
|           |     statusIds     |         |                               The statuses of the games to query. Examples: `["1","2","3"]`                               |         |                                                                                             |         |            |                |
|           |      gameIds      |         |       The IDs of games to query. Example: `["23660869053591173981da79133fe4c2","fb78cede8c9aa942b2569b048e649a3f"]`       |         |                                                                                             |         |            |                |
|           | hasScoresByPeriod |         | The scores are returned for each team as 2 uint8 arrays. Each element of the array represents the score from each period. | boolean |                                                                                             |         |            |                |

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "schedule",
    "sportId": 4,
    "date": 1635529231,
    "market": "create",
    "hasScoresByPeriod": false
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
          "event_status": "STATUS_SCHEDULED",
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
      "0x0000000000000000000000000000000000000000000000000000000000000020346437336363383137376239346434643965323035326661353765626366316300000000000000000000000000000000000000000000000000000000617b3980000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000f486f7573746f6e20526f636b6574730000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000955746168204a617a7a0000000000000000000000000000000000000000000000"
    ]
  },
  "result": [
    "0x0000000000000000000000000000000000000000000000000000000000000020346437336363383137376239346434643965323035326661353765626366316300000000000000000000000000000000000000000000000000000000617b3980000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000f486f7573746f6e20526f636b6574730000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000955746168204a617a7a0000000000000000000000000000000000000000000000"
  ],
  "statusCode": 200,
  "providerStatusCode": 200
}
```

<details>
<summary>Additional Examples</summary>

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "schedule",
    "sportId": 1,
    "date": 1662817303,
    "market": "create",
    "gameIds": ["0017049a376cd9c73345507767295c74", "03a242a346a63835d9ba1797f3a10ff8"],
    "hasScoresByPeriod": false
  },
  "debug": {
    "cacheKey": "/hTi7dgcA/AANVMzTFV0XPu40pQ="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "meta": {
      "delta_last_id": "11ed-3121-9f9e8000-8d67-e900fae2cc44"
    },
    "events": [
      {
        "event_id": "5576affd4c18740983cd389c85bbdd07",
        "event_uuid": "11ed-30a3-e51c6800-8eea-db7656cb634e",
        "sport_id": 1,
        "event_date": "2022-09-10T01:00:00Z",
        "rotation_number_away": 317,
        "rotation_number_home": 318,
        "score": {
          "event_id": "5576affd4c18740983cd389c85bbdd07",
          "event_status": "STATUS_SCHEDULED",
          "score_away": 0,
          "score_home": 0,
          "winner_away": 0,
          "winner_home": 0,
          "score_away_by_period": [],
          "score_home_by_period": [],
          "venue_name": "University Stadium (NM)",
          "venue_location": "Albuquerque, NM",
          "game_clock": 0,
          "display_clock": "0.00",
          "game_period": 0,
          "broadcast": "CBSSN",
          "event_status_detail": "9/9 - 9:00 PM EDT",
          "updated_at": "2022-07-29T07:11:54Z"
        },
        "teams": [
          {
            "team_id": 3548,
            "team_normalized_id": 133,
            "name": "Boise State",
            "is_away": true,
            "is_home": false
          },
          {
            "team_id": 5041,
            "team_normalized_id": 185,
            "name": "New Mexico",
            "is_away": false,
            "is_home": true
          }
        ],
        "teams_normalized": [
          {
            "team_id": 133,
            "name": "Boise State",
            "mascot": "Broncos",
            "abbreviation": "BOISE",
            "ranking": 99,
            "record": "0-1",
            "is_away": true,
            "is_home": false
          },
          {
            "team_id": 185,
            "name": "New Mexico",
            "mascot": "Lobos",
            "abbreviation": "UNM",
            "ranking": 99,
            "record": "1-0",
            "is_away": false,
            "is_home": true
          }
        ],
        "schedule": {
          "season_type": "Regular Season",
          "season_year": 2022,
          "event_name": "Boise State at New Mexico - 2022-09-10",
          "attendance": "0"
        },
        "lines": {
          "1": {
            "line_id": 17109765,
            "moneyline": {
              "moneyline_away": -750,
              "moneyline_away_delta": 90,
              "moneyline_home": 600,
              "moneyline_home_delta": -60,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "line_id": 17109765,
              "event_id": "5576affd4c18740983cd389c85bbdd07",
              "sport_id": 1,
              "affiliate_id": 1,
              "date_updated": "2022-09-05T16:30:22.573061Z",
              "format": "American"
            },
            "spread": {
              "point_spread_away": -16.5,
              "point_spread_home": 16.5,
              "point_spread_away_delta": 0,
              "point_spread_home_delta": 0,
              "point_spread_away_money": -108,
              "point_spread_away_money_delta": -3,
              "point_spread_home_money": -102,
              "point_spread_home_money_delta": 3,
              "line_id": 17109765,
              "event_id": "5576affd4c18740983cd389c85bbdd07",
              "sport_id": 1,
              "affiliate_id": 1,
              "date_updated": "2022-09-05T12:53:56.251792Z",
              "format": "American"
            },
            "total": {
              "total_over": 44,
              "total_over_delta": -0.5,
              "total_under": 44,
              "total_under_delta": -0.5,
              "total_over_money": -105,
              "total_over_money_delta": 0,
              "total_under_money": -105,
              "total_under_money_delta": 0,
              "line_id": 17109765,
              "event_id": "5576affd4c18740983cd389c85bbdd07",
              "sport_id": 1,
              "affiliate_id": 1,
              "date_updated": "2022-09-06T13:16:04.657026Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 1,
              "affiliate_name": "5Dimes",
              "affiliate_url": "https://bit.ly/3rKIuBh"
            }
          },
          "2": {
            "line_id": 17109793,
            "moneyline": {
              "moneyline_away": -800,
              "moneyline_away_delta": -800.0001,
              "moneyline_home": 525,
              "moneyline_home_delta": 524.9999,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "line_id": 17109793,
              "event_id": "5576affd4c18740983cd389c85bbdd07",
              "sport_id": 1,
              "affiliate_id": 2,
              "date_updated": "2022-09-05T18:55:03.046148Z",
              "format": "American"
            },
            "spread": {
              "point_spread_away": -16.5,
              "point_spread_home": 16.5,
              "point_spread_away_delta": 0.5,
              "point_spread_home_delta": -0.5,
              "point_spread_away_money": -110,
              "point_spread_away_money_delta": 0,
              "point_spread_home_money": -110,
              "point_spread_home_money_delta": 0,
              "line_id": 17109793,
              "event_id": "5576affd4c18740983cd389c85bbdd07",
              "sport_id": 1,
              "affiliate_id": 2,
              "date_updated": "2022-09-05T19:16:41.649657Z",
              "format": "American"
            },
            "total": {
              "total_over": 44,
              "total_over_delta": -0.5,
              "total_under": 44,
              "total_under_delta": -0.5,
              "total_over_money": -110,
              "total_over_money_delta": 0,
              "total_under_money": -110,
              "total_under_money_delta": 0,
              "line_id": 17109793,
              "event_id": "5576affd4c18740983cd389c85bbdd07",
              "sport_id": 1,
              "affiliate_id": 2,
              "date_updated": "2022-09-06T13:17:47.132389Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 2,
              "affiliate_name": "Bovada",
              "affiliate_url": "https://www.bovada.lv/"
            }
          },
          "3": {
            "line_id": 16929108,
            "moneyline": {
              "moneyline_away": -900,
              "moneyline_away_delta": -10,
              "moneyline_home": 534,
              "moneyline_home_delta": 4,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "line_id": 16929108,
              "event_id": "5576affd4c18740983cd389c85bbdd07",
              "sport_id": 1,
              "affiliate_id": 3,
              "date_updated": "2022-09-06T13:34:34.453316Z",
              "format": "American"
            },
            "spread": {
              "point_spread_away": -16.5,
              "point_spread_home": 16.5,
              "point_spread_away_delta": 0,
              "point_spread_home_delta": 0,
              "point_spread_away_money": -111,
              "point_spread_away_money_delta": -1,
              "point_spread_home_money": -107,
              "point_spread_home_money_delta": 1,
              "extended_spreads": [
                {
                  "point_spread_away": -14.5,
                  "point_spread_home": 14.5,
                  "point_spread_away_delta": 0,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": -126,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": 103,
                  "point_spread_home_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "point_spread_away": -15,
                  "point_spread_home": 15,
                  "point_spread_away_delta": 0,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": -123,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": 100,
                  "point_spread_home_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "point_spread_away": -15.5,
                  "point_spread_home": 15.5,
                  "point_spread_away_delta": 0,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": -119,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": -102,
                  "point_spread_home_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "point_spread_away": -16,
                  "point_spread_home": 16,
                  "point_spread_away_delta": 0,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": -115,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": -104,
                  "point_spread_home_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "point_spread_away": -16.5,
                  "point_spread_home": 16.5,
                  "point_spread_away_delta": 0,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": -111,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": -107,
                  "point_spread_home_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "point_spread_away": -17,
                  "point_spread_home": 17,
                  "point_spread_away_delta": 0,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": -100,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": -120,
                  "point_spread_home_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "point_spread_away": -17.5,
                  "point_spread_home": 17.5,
                  "point_spread_away_delta": 0,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": 109,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": -133,
                  "point_spread_home_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "point_spread_away": -18,
                  "point_spread_home": 18,
                  "point_spread_away_delta": 0,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": 115,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": -141,
                  "point_spread_home_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "point_spread_away": -18.5,
                  "point_spread_home": 18.5,
                  "point_spread_away_delta": 0,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": 120,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": -148,
                  "point_spread_home_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                }
              ],
              "line_id": 16929108,
              "event_id": "5576affd4c18740983cd389c85bbdd07",
              "sport_id": 1,
              "affiliate_id": 3,
              "date_updated": "2022-09-06T13:34:34.483508Z",
              "format": "American"
            },
            "total": {
              "total_over": 44,
              "total_over_delta": 0,
              "total_under": 44,
              "total_under_delta": 0,
              "total_over_money": -109,
              "total_over_money_delta": 1,
              "total_under_money": -111,
              "total_under_money_delta": -1,
              "extended_totals": [
                {
                  "total_over": 46,
                  "total_over_delta": 0,
                  "total_under": 46,
                  "total_under_delta": 0,
                  "total_over_money": 120,
                  "total_over_money_delta": 0,
                  "total_under_money": -146,
                  "total_under_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "total_over": 45.5,
                  "total_over_delta": 0,
                  "total_under": 45.5,
                  "total_under_delta": 0,
                  "total_over_money": 112,
                  "total_over_money_delta": 0,
                  "total_under_money": -137,
                  "total_under_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "total_over": 45,
                  "total_over_delta": 0,
                  "total_under": 45,
                  "total_under_delta": 0,
                  "total_over_money": 105,
                  "total_over_money_delta": 0,
                  "total_under_money": -128,
                  "total_under_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "total_over": 44.5,
                  "total_over_delta": 0,
                  "total_under": 44.5,
                  "total_under_delta": 0,
                  "total_over_money": -103,
                  "total_over_money_delta": 0,
                  "total_under_money": -118,
                  "total_under_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "total_over": 44,
                  "total_over_delta": 0,
                  "total_under": 44,
                  "total_under_delta": 0,
                  "total_over_money": -109,
                  "total_over_money_delta": 0,
                  "total_under_money": -111,
                  "total_under_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "total_over": 43.5,
                  "total_over_delta": 0,
                  "total_under": 43.5,
                  "total_under_delta": 0,
                  "total_over_money": -117,
                  "total_over_money_delta": 0,
                  "total_under_money": -104,
                  "total_under_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "total_over": 43,
                  "total_over_delta": 0,
                  "total_under": 43,
                  "total_under_delta": 0,
                  "total_over_money": -124,
                  "total_over_money_delta": 0,
                  "total_under_money": 103,
                  "total_under_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "total_over": 42.5,
                  "total_over_delta": 0,
                  "total_under": 42.5,
                  "total_under_delta": 0,
                  "total_over_money": -132,
                  "total_over_money_delta": 0,
                  "total_under_money": 108,
                  "total_under_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "total_over": 42,
                  "total_over_delta": 0,
                  "total_under": 42,
                  "total_under_delta": 0,
                  "total_over_money": -139,
                  "total_over_money_delta": 0,
                  "total_under_money": 115,
                  "total_under_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                }
              ],
...
```

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "schedule",
    "sportId": 1,
    "date": 1662817303,
    "market": "create",
    "gameIds": ["00000000000000000000000000000000"],
    "hasScoresByPeriod": false
  },
  "debug": {
    "cacheKey": "AFz7Yn+VlDGvFxPKsngR4qmfmPA="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "meta": {
      "delta_last_id": "11ed-3121-9f9e8000-8d67-e900fae2cc44"
    },
    "events": [
      {
        "event_id": "5576affd4c18740983cd389c85bbdd07",
        "event_uuid": "11ed-30a3-e51c6800-8eea-db7656cb634e",
        "sport_id": 1,
        "event_date": "2022-09-10T01:00:00Z",
        "rotation_number_away": 317,
        "rotation_number_home": 318,
        "score": {
          "event_id": "5576affd4c18740983cd389c85bbdd07",
          "event_status": "STATUS_SCHEDULED",
          "score_away": 0,
          "score_home": 0,
          "winner_away": 0,
          "winner_home": 0,
          "score_away_by_period": [],
          "score_home_by_period": [],
          "venue_name": "University Stadium (NM)",
          "venue_location": "Albuquerque, NM",
          "game_clock": 0,
          "display_clock": "0.00",
          "game_period": 0,
          "broadcast": "CBSSN",
          "event_status_detail": "9/9 - 9:00 PM EDT",
          "updated_at": "2022-07-29T07:11:54Z"
        },
        "teams": [
          {
            "team_id": 3548,
            "team_normalized_id": 133,
            "name": "Boise State",
            "is_away": true,
            "is_home": false
          },
          {
            "team_id": 5041,
            "team_normalized_id": 185,
            "name": "New Mexico",
            "is_away": false,
            "is_home": true
          }
        ],
        "teams_normalized": [
          {
            "team_id": 133,
            "name": "Boise State",
            "mascot": "Broncos",
            "abbreviation": "BOISE",
            "ranking": 99,
            "record": "0-1",
            "is_away": true,
            "is_home": false
          },
          {
            "team_id": 185,
            "name": "New Mexico",
            "mascot": "Lobos",
            "abbreviation": "UNM",
            "ranking": 99,
            "record": "1-0",
            "is_away": false,
            "is_home": true
          }
        ],
        "schedule": {
          "season_type": "Regular Season",
          "season_year": 2022,
          "event_name": "Boise State at New Mexico - 2022-09-10",
          "attendance": "0"
        },
        "lines": {
          "1": {
            "line_id": 17109765,
            "moneyline": {
              "moneyline_away": -750,
              "moneyline_away_delta": 90,
              "moneyline_home": 600,
              "moneyline_home_delta": -60,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "line_id": 17109765,
              "event_id": "5576affd4c18740983cd389c85bbdd07",
              "sport_id": 1,
              "affiliate_id": 1,
              "date_updated": "2022-09-05T16:30:22.573061Z",
              "format": "American"
            },
            "spread": {
              "point_spread_away": -16.5,
              "point_spread_home": 16.5,
              "point_spread_away_delta": 0,
              "point_spread_home_delta": 0,
              "point_spread_away_money": -108,
              "point_spread_away_money_delta": -3,
              "point_spread_home_money": -102,
              "point_spread_home_money_delta": 3,
              "line_id": 17109765,
              "event_id": "5576affd4c18740983cd389c85bbdd07",
              "sport_id": 1,
              "affiliate_id": 1,
              "date_updated": "2022-09-05T12:53:56.251792Z",
              "format": "American"
            },
            "total": {
              "total_over": 44,
              "total_over_delta": -0.5,
              "total_under": 44,
              "total_under_delta": -0.5,
              "total_over_money": -105,
              "total_over_money_delta": 0,
              "total_under_money": -105,
              "total_under_money_delta": 0,
              "line_id": 17109765,
              "event_id": "5576affd4c18740983cd389c85bbdd07",
              "sport_id": 1,
              "affiliate_id": 1,
              "date_updated": "2022-09-06T13:16:04.657026Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 1,
              "affiliate_name": "5Dimes",
              "affiliate_url": "https://bit.ly/3rKIuBh"
            }
          },
          "2": {
            "line_id": 17109793,
            "moneyline": {
              "moneyline_away": -800,
              "moneyline_away_delta": -800.0001,
              "moneyline_home": 525,
              "moneyline_home_delta": 524.9999,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "line_id": 17109793,
              "event_id": "5576affd4c18740983cd389c85bbdd07",
              "sport_id": 1,
              "affiliate_id": 2,
              "date_updated": "2022-09-05T18:55:03.046148Z",
              "format": "American"
            },
            "spread": {
              "point_spread_away": -16.5,
              "point_spread_home": 16.5,
              "point_spread_away_delta": 0.5,
              "point_spread_home_delta": -0.5,
              "point_spread_away_money": -110,
              "point_spread_away_money_delta": 0,
              "point_spread_home_money": -110,
              "point_spread_home_money_delta": 0,
              "line_id": 17109793,
              "event_id": "5576affd4c18740983cd389c85bbdd07",
              "sport_id": 1,
              "affiliate_id": 2,
              "date_updated": "2022-09-05T19:16:41.649657Z",
              "format": "American"
            },
            "total": {
              "total_over": 44,
              "total_over_delta": -0.5,
              "total_under": 44,
              "total_under_delta": -0.5,
              "total_over_money": -110,
              "total_over_money_delta": 0,
              "total_under_money": -110,
              "total_under_money_delta": 0,
              "line_id": 17109793,
              "event_id": "5576affd4c18740983cd389c85bbdd07",
              "sport_id": 1,
              "affiliate_id": 2,
              "date_updated": "2022-09-06T13:17:47.132389Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 2,
              "affiliate_name": "Bovada",
              "affiliate_url": "https://www.bovada.lv/"
            }
          },
          "3": {
            "line_id": 16929108,
            "moneyline": {
              "moneyline_away": -900,
              "moneyline_away_delta": -10,
              "moneyline_home": 534,
              "moneyline_home_delta": 4,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "line_id": 16929108,
              "event_id": "5576affd4c18740983cd389c85bbdd07",
              "sport_id": 1,
              "affiliate_id": 3,
              "date_updated": "2022-09-06T13:34:34.453316Z",
              "format": "American"
            },
            "spread": {
              "point_spread_away": -16.5,
              "point_spread_home": 16.5,
              "point_spread_away_delta": 0,
              "point_spread_home_delta": 0,
              "point_spread_away_money": -111,
              "point_spread_away_money_delta": -1,
              "point_spread_home_money": -107,
              "point_spread_home_money_delta": 1,
              "extended_spreads": [
                {
                  "point_spread_away": -14.5,
                  "point_spread_home": 14.5,
                  "point_spread_away_delta": 0,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": -126,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": 103,
                  "point_spread_home_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "point_spread_away": -15,
                  "point_spread_home": 15,
                  "point_spread_away_delta": 0,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": -123,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": 100,
                  "point_spread_home_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "point_spread_away": -15.5,
                  "point_spread_home": 15.5,
                  "point_spread_away_delta": 0,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": -119,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": -102,
                  "point_spread_home_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "point_spread_away": -16,
                  "point_spread_home": 16,
                  "point_spread_away_delta": 0,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": -115,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": -104,
                  "point_spread_home_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "point_spread_away": -16.5,
                  "point_spread_home": 16.5,
                  "point_spread_away_delta": 0,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": -111,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": -107,
                  "point_spread_home_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "point_spread_away": -17,
                  "point_spread_home": 17,
                  "point_spread_away_delta": 0,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": -100,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": -120,
                  "point_spread_home_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "point_spread_away": -17.5,
                  "point_spread_home": 17.5,
                  "point_spread_away_delta": 0,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": 109,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": -133,
                  "point_spread_home_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "point_spread_away": -18,
                  "point_spread_home": 18,
                  "point_spread_away_delta": 0,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": 115,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": -141,
                  "point_spread_home_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "point_spread_away": -18.5,
                  "point_spread_home": 18.5,
                  "point_spread_away_delta": 0,
                  "point_spread_home_delta": 0,
                  "point_spread_away_money": 120,
                  "point_spread_away_money_delta": 0,
                  "point_spread_home_money": -148,
                  "point_spread_home_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                }
              ],
              "line_id": 16929108,
              "event_id": "5576affd4c18740983cd389c85bbdd07",
              "sport_id": 1,
              "affiliate_id": 3,
              "date_updated": "2022-09-06T13:34:34.483508Z",
              "format": "American"
            },
            "total": {
              "total_over": 44,
              "total_over_delta": 0,
              "total_under": 44,
              "total_under_delta": 0,
              "total_over_money": -109,
              "total_over_money_delta": 1,
              "total_under_money": -111,
              "total_under_money_delta": -1,
              "extended_totals": [
                {
                  "total_over": 46,
                  "total_over_delta": 0,
                  "total_under": 46,
                  "total_under_delta": 0,
                  "total_over_money": 120,
                  "total_over_money_delta": 0,
                  "total_under_money": -146,
                  "total_under_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "total_over": 45.5,
                  "total_over_delta": 0,
                  "total_under": 45.5,
                  "total_under_delta": 0,
                  "total_over_money": 112,
                  "total_over_money_delta": 0,
                  "total_under_money": -137,
                  "total_under_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "total_over": 45,
                  "total_over_delta": 0,
                  "total_under": 45,
                  "total_under_delta": 0,
                  "total_over_money": 105,
                  "total_over_money_delta": 0,
                  "total_under_money": -128,
                  "total_under_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "total_over": 44.5,
                  "total_over_delta": 0,
                  "total_under": 44.5,
                  "total_under_delta": 0,
                  "total_over_money": -103,
                  "total_over_money_delta": 0,
                  "total_under_money": -118,
                  "total_under_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "total_over": 44,
                  "total_over_delta": 0,
                  "total_under": 44,
                  "total_under_delta": 0,
                  "total_over_money": -109,
                  "total_over_money_delta": 0,
                  "total_under_money": -111,
                  "total_under_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "total_over": 43.5,
                  "total_over_delta": 0,
                  "total_under": 43.5,
                  "total_under_delta": 0,
                  "total_over_money": -117,
                  "total_over_money_delta": 0,
                  "total_under_money": -104,
                  "total_under_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "total_over": 43,
                  "total_over_delta": 0,
                  "total_under": 43,
                  "total_under_delta": 0,
                  "total_over_money": -124,
                  "total_over_money_delta": 0,
                  "total_under_money": 103,
                  "total_under_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "total_over": 42.5,
                  "total_over_delta": 0,
                  "total_under": 42.5,
                  "total_under_delta": 0,
                  "total_over_money": -132,
                  "total_over_money_delta": 0,
                  "total_under_money": 108,
                  "total_under_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                },
                {
                  "total_over": 42,
                  "total_over_delta": 0,
                  "total_under": 42,
                  "total_under_delta": 0,
                  "total_over_money": -139,
                  "total_over_money_delta": 0,
                  "total_under_money": 115,
                  "total_under_money_delta": 0,
                  "line_id": 16929108,
                  "event_id": "",
                  "sport_id": 1,
                  "affiliate_id": 3,
                  "format": ""
                }
              ],
...
```

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "schedule",
    "sportId": 4,
    "date": 1635529231,
    "market": "resolve",
    "hasScoresByPeriod": true
  },
  "debug": {
    "cacheKey": "mrtn1bH1vQuJHoZfLkzHhoUFJr8="
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
          "event_status_detail": "Final",
          "updated_at": "2022-07-23T00:17:41Z"
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
      "0x0000000000000000000000000000000000000000000000000000000000000020346437336363383137376239346434643965323035326661353765626366316300000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000062db3e250000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001300000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001d000000000000000000000000000000000000000000000000000000000000001f000000000000000000000000000000000000000000000000000000000000001e"
    ]
  },
  "result": [
    "0x0000000000000000000000000000000000000000000000000000000000000020346437336363383137376239346434643965323035326661353765626366316300000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000062db3e250000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001300000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001d000000000000000000000000000000000000000000000000000000000000001f000000000000000000000000000000000000000000000000000000000000001e"
  ],
  "statusCode": 200,
  "providerStatusCode": 200
}
```

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "schedule",
    "sportId": 1,
    "date": 1662222667,
    "market": "resolve",
    "gameIds": ["392546e145079d0d3d3282b4075d7127", "040265cdc1022e13ef1764b9a72cca43"],
    "hasScoresByPeriod": false
  },
  "debug": {
    "cacheKey": "1f3H48yNa3Zn1moERZvJ3KryCc8="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "meta": {
      "delta_last_id": "11ed-2ba1-76ba4000-8abb-6ce0bc65650d"
    },
    "events": [
      {
        "event_id": "16e079e20382533f0d3548d5146c057f",
        "event_uuid": "11ed-2b1b-5a73c000-8efb-1ccdebf9ca4a",
        "sport_id": 1,
        "event_date": "2022-09-03T00:00:00Z",
        "rotation_number_away": 153,
        "rotation_number_home": 154,
        "score": {
          "event_id": "16e079e20382533f0d3548d5146c057f",
          "event_status": "STATUS_FINAL",
          "score_away": 20,
          "score_home": 23,
          "winner_away": 0,
          "winner_home": 1,
          "score_away_by_period": [
            7,
            3,
            7,
            3
          ],
          "score_home_by_period": [
            3,
            13,
            0,
            7
          ],
          "venue_name": "Memorial Stadium (Bloomington, IN)",
          "venue_location": "Bloomington, IN",
          "game_clock": 0,
          "display_clock": "0.00",
          "game_period": 4,
          "broadcast": "FS1",
          "event_status_detail": "Final",
          "updated_at": "2022-09-03T05:04:24Z"
        },
        "teams": [
          {
            "team_id": 3439,
            "team_normalized_id": 158,
            "name": "Illinois",
            "is_away": true,
            "is_home": false
          },
          {
            "team_id": 3414,
            "team_normalized_id": 159,
            "name": "Indiana",
            "is_away": false,
            "is_home": true
          }
        ],
        "teams_normalized": [
          {
            "team_id": 158,
            "name": "Illinois",
            "mascot": "Fighting Illini",
            "abbreviation": "ILL",
            "ranking": 99,
            "record": "1-1",
            "is_away": true,
            "is_home": false
          },
          {
            "team_id": 159,
            "name": "Indiana",
            "mascot": "Hoosiers",
            "abbreviation": "IND",
            "ranking": 99,
            "record": "1-0",
            "is_away": false,
            "is_home": true
          }
        ],
        "schedule": {
          "season_type": "Regular Season",
          "season_year": 2022,
          "event_name": "Illinois at Indiana - 2022-09-03",
          "attendance": "0"
        },
        "lines": {
          "1": {
            "line_id": 15008513,
            "moneyline": {
              "moneyline_away": 0.0001,
              "moneyline_away_delta": 105.0001,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 105.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "line_id": 15008513,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 1,
              "date_updated": "2022-09-03T00:06:54.334258Z",
              "format": "American"
            },
            "spread": {
              "point_spread_away": 0.0001,
              "point_spread_home": 0.0001,
              "point_spread_away_delta": 0.0001,
              "point_spread_home_delta": 0.0001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 105.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 105.0001,
              "line_id": 15008513,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 1,
              "date_updated": "2022-09-03T00:06:54.364765Z",
              "format": "American"
            },
            "total": {
              "total_over": 0.0001,
              "total_over_delta": -47.4999,
              "total_under": 0.0001,
              "total_under_delta": -47.4999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 107.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 103.0001,
              "line_id": 15008513,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 1,
              "date_updated": "2022-09-03T00:06:54.390576Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 1,
              "affiliate_name": "5Dimes",
              "affiliate_url": "https://bit.ly/3rKIuBh"
            }
          },
          "2": {
            "line_id": 15012246,
            "moneyline": {
              "moneyline_away": 0.0001,
              "moneyline_away_delta": 105.0001,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 115.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "line_id": 15012246,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 2,
              "date_updated": "2022-09-03T00:05:26.939201Z",
              "format": "American"
            },
            "spread": {
              "point_spread_away": 0.0001,
              "point_spread_home": 0.0001,
              "point_spread_away_delta": -0.9999,
              "point_spread_home_delta": 1.0001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 115.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 105.0001,
              "line_id": 15012246,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 2,
              "date_updated": "2022-09-03T00:05:26.958051Z",
              "format": "American"
            },
            "total": {
              "total_over": 0.0001,
              "total_over_delta": -47.9999,
              "total_under": 0.0001,
              "total_under_delta": -47.9999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 105.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 115.0001,
              "line_id": 15012246,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 2,
              "date_updated": "2022-09-03T00:05:26.982924Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 2,
              "affiliate_name": "Bovada",
              "affiliate_url": "https://www.bovada.lv/"
            }
          },
          "3": {
            "line_id": 16928973,
            "moneyline": {
              "moneyline_away": 0.0001,
              "moneyline_away_delta": 108.0001,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 104.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "line_id": 16928973,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 3,
              "date_updated": "2022-09-03T00:01:09.882917Z",
              "format": "American"
            },
            "spread": {
              "point_spread_away": 0.0001,
              "point_spread_home": 0.0001,
              "point_spread_away_delta": -0.9999,
              "point_spread_home_delta": 1.0001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 114.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": -100.9999,
              "line_id": 16928973,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 3,
              "date_updated": "2022-09-03T00:01:09.977683Z",
              "format": "American"
            },
            "total": {
              "total_over": 0.0001,
              "total_over_delta": -46.9999,
              "total_under": 0.0001,
              "total_under_delta": -46.9999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 115.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 102.0001,
              "line_id": 16928973,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 3,
              "date_updated": "2022-09-03T00:01:10.091249Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 3,
              "affiliate_name": "Pinnacle",
              "affiliate_url": "https://www.pinnacle.com/en/rtn"
            }
          },
          "4": {
            "line_id": 15007969,
            "moneyline": {
              "moneyline_away": 0.0001,
              "moneyline_away_delta": 102.0001,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 118.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 118.0001,
              "line_id": 15007969,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 4,
              "date_updated": "2022-09-03T00:10:29.110007Z",
              "format": "American"
            },
            "spread": {
              "point_spread_away": 0.0001,
              "point_spread_home": 0.0001,
              "point_spread_away_delta": -0.9999,
              "point_spread_home_delta": 1.0001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 107.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 113.0001,
              "line_id": 15007969,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 4,
              "date_updated": "2022-09-03T00:10:29.136193Z",
              "format": "American"
            },
            "total": {
              "total_over": 0.0001,
              "total_over_delta": -47.4999,
              "total_under": 0.0001,
              "total_under_delta": -47.4999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 110.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 110.0001,
              "line_id": 15007969,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 4,
              "date_updated": "2022-09-03T00:10:29.169133Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 4,
              "affiliate_name": "SportsBetting",
              "affiliate_url": "http://bit.ly/2JT73M1"
            }
          },
          "6": {
            "line_id": 15008351,
            "moneyline": {
              "moneyline_away": 0.0001,
              "moneyline_away_delta": 102.0001,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 118.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 118.0001,
              "line_id": 15008351,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 6,
              "date_updated": "2022-09-03T00:08:58.619342Z",
              "format": "American"
            },
            "spread": {
              "point_spread_away": 0.0001,
              "point_spread_home": 0.0001,
              "point_spread_away_delta": -0.9999,
              "point_spread_home_delta": 1.0001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 107.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 113.0001,
              "line_id": 15008351,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 6,
              "date_updated": "2022-09-03T00:08:58.636024Z",
              "format": "American"
            },
            "total": {
              "total_over": 0.0001,
              "total_over_delta": -47.4999,
              "total_under": 0.0001,
              "total_under_delta": -47.4999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 110.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 110.0001,
              "line_id": 15008351,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 6,
              "date_updated": "2022-09-03T00:08:58.669144Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 6,
              "affiliate_name": "BetOnline",
              "affiliate_url": "http://bit.ly/3oogty4"
            }
          },
          "11": {
            "line_id": 15008221,
            "moneyline": {
              "moneyline_away": 0.0001,
              "moneyline_away_delta": 102.0001,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 118.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 118.0001,
              "line_id": 15008221,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 11,
              "date_updated": "2022-09-03T00:07:18.616959Z",
              "format": "American"
            },
            "spread": {
              "point_spread_away": 0.0001,
              "point_spread_home": 0.0001,
              "point_spread_away_delta": -0.9999,
              "point_spread_home_delta": 1.0001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 105.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 105.0001,
              "line_id": 15008221,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 11,
              "date_updated": "2022-09-03T00:07:18.861281Z",
              "format": "American"
            },
            "total": {
              "total_over": 0.0001,
              "total_over_delta": -47.4999,
              "total_under": 0.0001,
              "total_under_delta": -47.4999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 108.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 108.0001,
              "line_id": 15008221,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 11,
              "date_updated": "2022-09-03T00:07:19.161881Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 11,
              "affiliate_name": "LowVig",
              "affiliate_url": "https://sportsbook.lowvig.ag/"
            }
          },
          "12": {
            "line_id": 15012329,
            "moneyline": {
              "moneyline_away": 0.0001,
              "moneyline_away_delta": 105.0001,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 115.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "line_id": 15012329,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 12,
              "date_updated": "2022-09-03T00:05:40.316622Z",
              "format": "American"
            },
            "spread": {
              "point_spread_away": 0.0001,
              "point_spread_home": 0.0001,
              "point_spread_away_delta": -0.9999,
              "point_spread_home_delta": 1.0001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 115.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 105.0001,
              "line_id": 15012329,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 12,
              "date_updated": "2022-09-03T00:05:40.341062Z",
              "format": "American"
            },
            "total": {
              "total_over": 0.0001,
              "total_over_delta": -47.9999,
              "total_under": 0.0001,
              "total_under_delta": -47.9999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 105.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 115.0001,
              "line_id": 15012329,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 12,
              "date_updated": "2022-09-03T00:05:40.369711Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 12,
              "affiliate_name": "Bodog",
              "affiliate_url": "https://bit.ly/2Z5uFkw"
            }
          },
          "14": {
            "line_id": 15008013,
            "moneyline": {
              "moneyline_away": 0.0001,
              "moneyline_away_delta": 105.0001,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 115.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "line_id": 15008013,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 14,
              "date_updated": "2022-09-02T23:24:36.913681Z",
              "format": "American"
            },
            "spread": {
              "point_spread_away": 0.0001,
              "point_spread_home": 0.0001,
              "point_spread_away_delta": 0.0001,
              "point_spread_home_delta": 0.0001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 110.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 110.0001,
              "line_id": 15008013,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 14,
              "date_updated": "2022-09-03T00:00:14.082703Z",
              "format": "American"
            },
            "total": {
              "total_over": 0.0001,
              "total_over_delta": -47.4999,
...
```

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "schedule",
    "sportId": 1,
    "date": 1662222667,
    "market": "resolve",
    "gameIds": ["00000000000000000000000000000000"],
    "hasScoresByPeriod": false
  },
  "debug": {
    "cacheKey": "TK1bQjQ8sYPusVFr/IrM7C/j8hs="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "meta": {
      "delta_last_id": "11ed-2ba1-76ba4000-8abb-6ce0bc65650d"
    },
    "events": [
      {
        "event_id": "16e079e20382533f0d3548d5146c057f",
        "event_uuid": "11ed-2b1b-5a73c000-8efb-1ccdebf9ca4a",
        "sport_id": 1,
        "event_date": "2022-09-03T00:00:00Z",
        "rotation_number_away": 153,
        "rotation_number_home": 154,
        "score": {
          "event_id": "16e079e20382533f0d3548d5146c057f",
          "event_status": "STATUS_FINAL",
          "score_away": 20,
          "score_home": 23,
          "winner_away": 0,
          "winner_home": 1,
          "score_away_by_period": [
            7,
            3,
            7,
            3
          ],
          "score_home_by_period": [
            3,
            13,
            0,
            7
          ],
          "venue_name": "Memorial Stadium (Bloomington, IN)",
          "venue_location": "Bloomington, IN",
          "game_clock": 0,
          "display_clock": "0.00",
          "game_period": 4,
          "broadcast": "FS1",
          "event_status_detail": "Final",
          "updated_at": "2022-09-03T05:04:24Z"
        },
        "teams": [
          {
            "team_id": 3439,
            "team_normalized_id": 158,
            "name": "Illinois",
            "is_away": true,
            "is_home": false
          },
          {
            "team_id": 3414,
            "team_normalized_id": 159,
            "name": "Indiana",
            "is_away": false,
            "is_home": true
          }
        ],
        "teams_normalized": [
          {
            "team_id": 158,
            "name": "Illinois",
            "mascot": "Fighting Illini",
            "abbreviation": "ILL",
            "ranking": 99,
            "record": "1-1",
            "is_away": true,
            "is_home": false
          },
          {
            "team_id": 159,
            "name": "Indiana",
            "mascot": "Hoosiers",
            "abbreviation": "IND",
            "ranking": 99,
            "record": "1-0",
            "is_away": false,
            "is_home": true
          }
        ],
        "schedule": {
          "season_type": "Regular Season",
          "season_year": 2022,
          "event_name": "Illinois at Indiana - 2022-09-03",
          "attendance": "0"
        },
        "lines": {
          "1": {
            "line_id": 15008513,
            "moneyline": {
              "moneyline_away": 0.0001,
              "moneyline_away_delta": 105.0001,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 105.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "line_id": 15008513,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 1,
              "date_updated": "2022-09-03T00:06:54.334258Z",
              "format": "American"
            },
            "spread": {
              "point_spread_away": 0.0001,
              "point_spread_home": 0.0001,
              "point_spread_away_delta": 0.0001,
              "point_spread_home_delta": 0.0001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 105.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 105.0001,
              "line_id": 15008513,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 1,
              "date_updated": "2022-09-03T00:06:54.364765Z",
              "format": "American"
            },
            "total": {
              "total_over": 0.0001,
              "total_over_delta": -47.4999,
              "total_under": 0.0001,
              "total_under_delta": -47.4999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 107.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 103.0001,
              "line_id": 15008513,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 1,
              "date_updated": "2022-09-03T00:06:54.390576Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 1,
              "affiliate_name": "5Dimes",
              "affiliate_url": "https://bit.ly/3rKIuBh"
            }
          },
          "2": {
            "line_id": 15012246,
            "moneyline": {
              "moneyline_away": 0.0001,
              "moneyline_away_delta": 105.0001,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 115.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "line_id": 15012246,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 2,
              "date_updated": "2022-09-03T00:05:26.939201Z",
              "format": "American"
            },
            "spread": {
              "point_spread_away": 0.0001,
              "point_spread_home": 0.0001,
              "point_spread_away_delta": -0.9999,
              "point_spread_home_delta": 1.0001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 115.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 105.0001,
              "line_id": 15012246,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 2,
              "date_updated": "2022-09-03T00:05:26.958051Z",
              "format": "American"
            },
            "total": {
              "total_over": 0.0001,
              "total_over_delta": -47.9999,
              "total_under": 0.0001,
              "total_under_delta": -47.9999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 105.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 115.0001,
              "line_id": 15012246,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 2,
              "date_updated": "2022-09-03T00:05:26.982924Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 2,
              "affiliate_name": "Bovada",
              "affiliate_url": "https://www.bovada.lv/"
            }
          },
          "3": {
            "line_id": 16928973,
            "moneyline": {
              "moneyline_away": 0.0001,
              "moneyline_away_delta": 108.0001,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 104.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "line_id": 16928973,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 3,
              "date_updated": "2022-09-03T00:01:09.882917Z",
              "format": "American"
            },
            "spread": {
              "point_spread_away": 0.0001,
              "point_spread_home": 0.0001,
              "point_spread_away_delta": -0.9999,
              "point_spread_home_delta": 1.0001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 114.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": -100.9999,
              "line_id": 16928973,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 3,
              "date_updated": "2022-09-03T00:01:09.977683Z",
              "format": "American"
            },
            "total": {
              "total_over": 0.0001,
              "total_over_delta": -46.9999,
              "total_under": 0.0001,
              "total_under_delta": -46.9999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 115.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 102.0001,
              "line_id": 16928973,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 3,
              "date_updated": "2022-09-03T00:01:10.091249Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 3,
              "affiliate_name": "Pinnacle",
              "affiliate_url": "https://www.pinnacle.com/en/rtn"
            }
          },
          "4": {
            "line_id": 15007969,
            "moneyline": {
              "moneyline_away": 0.0001,
              "moneyline_away_delta": 102.0001,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 118.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 118.0001,
              "line_id": 15007969,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 4,
              "date_updated": "2022-09-03T00:10:29.110007Z",
              "format": "American"
            },
            "spread": {
              "point_spread_away": 0.0001,
              "point_spread_home": 0.0001,
              "point_spread_away_delta": -0.9999,
              "point_spread_home_delta": 1.0001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 107.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 113.0001,
              "line_id": 15007969,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 4,
              "date_updated": "2022-09-03T00:10:29.136193Z",
              "format": "American"
            },
            "total": {
              "total_over": 0.0001,
              "total_over_delta": -47.4999,
              "total_under": 0.0001,
              "total_under_delta": -47.4999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 110.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 110.0001,
              "line_id": 15007969,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 4,
              "date_updated": "2022-09-03T00:10:29.169133Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 4,
              "affiliate_name": "SportsBetting",
              "affiliate_url": "http://bit.ly/2JT73M1"
            }
          },
          "6": {
            "line_id": 15008351,
            "moneyline": {
              "moneyline_away": 0.0001,
              "moneyline_away_delta": 102.0001,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 118.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 118.0001,
              "line_id": 15008351,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 6,
              "date_updated": "2022-09-03T00:08:58.619342Z",
              "format": "American"
            },
            "spread": {
              "point_spread_away": 0.0001,
              "point_spread_home": 0.0001,
              "point_spread_away_delta": -0.9999,
              "point_spread_home_delta": 1.0001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 107.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 113.0001,
              "line_id": 15008351,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 6,
              "date_updated": "2022-09-03T00:08:58.636024Z",
              "format": "American"
            },
            "total": {
              "total_over": 0.0001,
              "total_over_delta": -47.4999,
              "total_under": 0.0001,
              "total_under_delta": -47.4999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 110.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 110.0001,
              "line_id": 15008351,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 6,
              "date_updated": "2022-09-03T00:08:58.669144Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 6,
              "affiliate_name": "BetOnline",
              "affiliate_url": "http://bit.ly/3oogty4"
            }
          },
          "11": {
            "line_id": 15008221,
            "moneyline": {
              "moneyline_away": 0.0001,
              "moneyline_away_delta": 102.0001,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 118.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 118.0001,
              "line_id": 15008221,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 11,
              "date_updated": "2022-09-03T00:07:18.616959Z",
              "format": "American"
            },
            "spread": {
              "point_spread_away": 0.0001,
              "point_spread_home": 0.0001,
              "point_spread_away_delta": -0.9999,
              "point_spread_home_delta": 1.0001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 105.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 105.0001,
              "line_id": 15008221,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 11,
              "date_updated": "2022-09-03T00:07:18.861281Z",
              "format": "American"
            },
            "total": {
              "total_over": 0.0001,
              "total_over_delta": -47.4999,
              "total_under": 0.0001,
              "total_under_delta": -47.4999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 108.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 108.0001,
              "line_id": 15008221,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 11,
              "date_updated": "2022-09-03T00:07:19.161881Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 11,
              "affiliate_name": "LowVig",
              "affiliate_url": "https://sportsbook.lowvig.ag/"
            }
          },
          "12": {
            "line_id": 15012329,
            "moneyline": {
              "moneyline_away": 0.0001,
              "moneyline_away_delta": 105.0001,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 115.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "line_id": 15012329,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 12,
              "date_updated": "2022-09-03T00:05:40.316622Z",
              "format": "American"
            },
            "spread": {
              "point_spread_away": 0.0001,
              "point_spread_home": 0.0001,
              "point_spread_away_delta": -0.9999,
              "point_spread_home_delta": 1.0001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 115.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 105.0001,
              "line_id": 15012329,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 12,
              "date_updated": "2022-09-03T00:05:40.341062Z",
              "format": "American"
            },
            "total": {
              "total_over": 0.0001,
              "total_over_delta": -47.9999,
              "total_under": 0.0001,
              "total_under_delta": -47.9999,
              "total_over_money": 0.0001,
              "total_over_money_delta": 105.0001,
              "total_under_money": 0.0001,
              "total_under_money_delta": 115.0001,
              "line_id": 15012329,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 12,
              "date_updated": "2022-09-03T00:05:40.369711Z",
              "format": "American"
            },
            "affiliate": {
              "affiliate_id": 12,
              "affiliate_name": "Bodog",
              "affiliate_url": "https://bit.ly/2Z5uFkw"
            }
          },
          "14": {
            "line_id": 15008013,
            "moneyline": {
              "moneyline_away": 0.0001,
              "moneyline_away_delta": 105.0001,
              "moneyline_home": 0.0001,
              "moneyline_home_delta": 115.0001,
              "moneyline_draw": 0.0001,
              "moneyline_draw_delta": 0,
              "line_id": 15008013,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 14,
              "date_updated": "2022-09-02T23:24:36.913681Z",
              "format": "American"
            },
            "spread": {
              "point_spread_away": 0.0001,
              "point_spread_home": 0.0001,
              "point_spread_away_delta": 0.0001,
              "point_spread_home_delta": 0.0001,
              "point_spread_away_money": 0.0001,
              "point_spread_away_money_delta": 110.0001,
              "point_spread_home_money": 0.0001,
              "point_spread_home_money_delta": 110.0001,
              "line_id": 15008013,
              "event_id": "16e079e20382533f0d3548d5146c057f",
              "sport_id": 1,
              "affiliate_id": 14,
              "date_updated": "2022-09-03T00:00:14.082703Z",
              "format": "American"
            },
            "total": {
              "total_over": 0.0001,
              "total_over_delta": -47.4999,
...
```

</details>

---

MIT License
