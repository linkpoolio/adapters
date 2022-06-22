# Chainlink External Adapter for TheRundown

![1.2.32](https://img.shields.io/github/package-json/v/smartcontractkit/external-adapters-js?filename=packages/sources/therundown/package.json)

Base URL https://therundown-therundown-v1.p.rapidapi.com/

This document was generated automatically. Please see [README Generator](../../scripts#readme-generator) for more info.

## Environment Variables

| Required? |   Name   |     Description     |                                                          Options                                                           | Defaults to |
| :-------: | :------: | :-----------------: | :------------------------------------------------------------------------------------------------------------------------: | :---------: |
|           | endpoint | The endpoint to use | [total-score](#total-score-endpoint), [event](#event-endpoint), [events](#events-endpoint), [schedule](#schedule-endpoint) | total-score |

---

## Input Parameters

Every EA supports base input parameters from [this list](../../core/bootstrap#base-input-parameters)

| Required? |   Name   |     Description     |  Type  |                                          Options                                          |    Default    |
| :-------: | :------: | :-----------------: | :----: | :---------------------------------------------------------------------------------------: | :-----------: |
|           | endpoint | The endpoint to use | string | [event](#event-endpoint), [events](#events-endpoint), [total-score](#totalscore-endpoint) | `total-score` |

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

| Required? |   Name    |                Description                | Options | Defaults to |
| :-------: | :-------: | :---------------------------------------: | :-----: | :---------: |
|    ✅     | `sportId` |  The ID of the sport to get events from   |         |             |
|    ✅     |  `date`   |        The date to get events from        |         |             |
|           | `status`  | Optional status param to filter events on |         |             |

## Schedule Endpoint

Creates and resolves markets for NHL, MLB, NBA and NFL.

### Input Params

| Required? |    Name     |            Description             |                                                   Options                                                    | Defaults to |
| :-------: | :---------: | :--------------------------------: | :----------------------------------------------------------------------------------------------------------: | :---------: |
|    ✅     |  `sportId`  |    The ID of the sport to query    |                                              `2`, `3`, `4`, `6`                                              |             |
|    ✅     |   `date`    |   The date of the games to query   |                                                 `1645895641`                                                 |             |
|    ✅     |  `market`   | Chose to create or resolve market  |                                             `create`, `resolve`                                              |             |
|           | `statusIds` | The statuses of the games to query |                              Array of string statusId. Example: `["2","4","7"]`                              |             |
|           |  `gameIds`  |     The IDs of games to query      | Array of string statusId. Example: `["23660869053591173981da79133fe4c2","fb78cede8c9aa942b2569b048e649a3f"]` |             |

List of sports

| sportId |      Sport      |
| :-----: | :-------------: |
|    1    |  NCAA Football  |
|    2    |       NFL       |
|    3    |       MLB       |
|    4    |       NBA       |
|    5    | NCAA_Basketball |
|    6    |       NHL       |
|    8    |      WNBA       |
|   10    |       MLS       |
|   11    |       EPL       |
|   12    |      FRA1       |
|   13    |      GER1       |
|   14    |      ESP1       |
|   15    |      ITA1       |
|   16    |    UEFACHAMP    |

List of statuses (todo)

| id  |            status            |
| :-: | :--------------------------: |
|  1  |       STATUS_CANCELED        |
|  2  |        STATUS_DELAYED        |
|  3  |     STATUS_END_OF_FIGHT      |
|  4  |     STATUS_END_OF_ROUND      |
|  5  |      STATUS_END_PERIOD       |
|  6  | STATUS_FIGHTERS_INTRODUCTION |
|  7  |   STATUS_FIGHTERS_WALKING    |
|  8  |         STATUS_FINAL         |
|  9  |       STATUS_FINAL_PEN       |
| 10  |      STATUS_FIRST_HALF       |
| 11  |       STATUS_FULL_TIME       |
| 12  |       STATUS_HALFTIME        |
| 13  |      STATUS_IN_PROGRESS      |
| 14  |     STATUS_IN_PROGRESS_2     |
| 15  |       STATUS_POSTPONED       |
| 16  |       STATUS_PRE_FIGHT       |
| 17  |      STATUS_RAIN_DELAY       |
| 18  |       STATUS_SCHEDULED       |
| 19  |      STATUS_SECOND_HALF      |
| 20  |          STATUS_TBD          |
| 21  |      STATUS_UNCONTESTED      |
| 22  |       STATUS_ABANDONED       |
| 23  |        STATUS_FORFEIT        |

### Sample Input

Creating market

```json
{
  "id": "1",
  "data": {
    "endpoint": "schedule",
    "sportId": 4,
    "date": 1647352284,
    "market": "create"
  }
}
```

Resolving market

```json
{
  "id": "1",
  "data": {
    "endpoint": "schedule",
    "sportId": 4,
    "date": 1638297631,
    "market": "resolve"
  }
}
```

### Sample Output

Creating market

Returns an array of encoded tuples for games with `statusId`: `18` (STATUS_SCHEDULED).
Each game contains: homeTeamName as string, awayTeamName as string, startTime as uint256 in epoch format and gameId as bytes32.

```json
{
  "jobRunID": "1",
  "result": [
    "0x0000000000000000000000000000000000000000000000000000000000000020393766656631653637393735666330363061373038393363353835333964323200000000000000000000000000000000000000000000000000000000622fd700000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000154f6b6c61686f6d612043697479205468756e64657200000000000000000000000000000000000000000000000000000000000000000000000000000000000011436861726c6f74746520486f726e657473000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000000000000000000000000020613234363638633936663731613233303031373333623162303164613234643000000000000000000000000000000000000000000000000000000000622fde08000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000001153616e20416e746f6e696f20537075727300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000164d696e6e65736f74612054696d626572776f6c76657300000000000000000000",
    "0x0000000000000000000000000000000000000000000000000000000000000020323338313266626264366639646335323664626430653139336662656466626100000000000000000000000000000000000000000000000000000000622ff320000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000955746168204a617a7a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f4d696c7761756b6565204275636b730000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000000000000000000000000020363235613362616531373463363238663535303339636639636361666461633100000000000000000000000000000000000000000000000000000000622ff320000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000015476f6c64656e2053746174652057617272696f72730000000000000000000000000000000000000000000000000000000000000000000000000000000000001257617368696e67746f6e2057697a617264730000000000000000000000000000",
    "0x0000000000000000000000000000000000000000000000000000000000000020616661333337613762376337643530323561643835333261643166666339336100000000000000000000000000000000000000000000000000000000622ff320000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000001053616372616d656e746f204b696e677300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d4368696361676f2042756c6c7300000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000000000000000000000000020366530353463363537653561343331323466636566333863336263313739396300000000000000000000000000000000000000000000000000000000622ffa28000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000124c6f7320416e67656c6573204c616b6572730000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f546f726f6e746f20526170746f72730000000000000000000000000000000000",
    "0x000000000000000000000000000000000000000000000000000000000000002033643332663366313566353066643532326665653230366466333133623730330000000000000000000000000000000000000000000000000000000062311a70000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000e496e6469616e612050616365727300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000114d656d70686973204772697a7a6c696573000000000000000000000000000000",
    "0x000000000000000000000000000000000000000000000000000000000000002039613934633864323665326161663432323037613935323963313338633965300000000000000000000000000000000000000000000000000000000062311a70000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000d4f726c616e646f204d6167696300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d42726f6f6b6c796e204e65747300000000000000000000000000000000000000",
    "0x000000000000000000000000000000000000000000000000000000000000002032613265616533656561353730383261323233336338373763393465656437340000000000000000000000000000000000000000000000000000000062312178000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000a4d69616d69204865617400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f446574726f697420506973746f6e730000000000000000000000000000000000"
  ],
  "statusCode": 200,
  "data": {
    "result": [
      "0x0000000000000000000000000000000000000000000000000000000000000020393766656631653637393735666330363061373038393363353835333964323200000000000000000000000000000000000000000000000000000000622fd700000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000154f6b6c61686f6d612043697479205468756e64657200000000000000000000000000000000000000000000000000000000000000000000000000000000000011436861726c6f74746520486f726e657473000000000000000000000000000000",
      "0x0000000000000000000000000000000000000000000000000000000000000020613234363638633936663731613233303031373333623162303164613234643000000000000000000000000000000000000000000000000000000000622fde08000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000001153616e20416e746f6e696f20537075727300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000164d696e6e65736f74612054696d626572776f6c76657300000000000000000000",
      "0x0000000000000000000000000000000000000000000000000000000000000020323338313266626264366639646335323664626430653139336662656466626100000000000000000000000000000000000000000000000000000000622ff320000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000955746168204a617a7a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f4d696c7761756b6565204275636b730000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000000000000000000000000000020363235613362616531373463363238663535303339636639636361666461633100000000000000000000000000000000000000000000000000000000622ff320000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000015476f6c64656e2053746174652057617272696f72730000000000000000000000000000000000000000000000000000000000000000000000000000000000001257617368696e67746f6e2057697a617264730000000000000000000000000000",
      "0x0000000000000000000000000000000000000000000000000000000000000020616661333337613762376337643530323561643835333261643166666339336100000000000000000000000000000000000000000000000000000000622ff320000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000001053616372616d656e746f204b696e677300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d4368696361676f2042756c6c7300000000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000000000000000000000000000020366530353463363537653561343331323466636566333863336263313739396300000000000000000000000000000000000000000000000000000000622ffa28000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000124c6f7320416e67656c6573204c616b6572730000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f546f726f6e746f20526170746f72730000000000000000000000000000000000",
      "0x000000000000000000000000000000000000000000000000000000000000002033643332663366313566353066643532326665653230366466333133623730330000000000000000000000000000000000000000000000000000000062311a70000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000e496e6469616e612050616365727300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000114d656d70686973204772697a7a6c696573000000000000000000000000000000",
      "0x000000000000000000000000000000000000000000000000000000000000002039613934633864323665326161663432323037613935323963313338633965300000000000000000000000000000000000000000000000000000000062311a70000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000d4f726c616e646f204d6167696300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d42726f6f6b6c796e204e65747300000000000000000000000000000000000000",
      "0x000000000000000000000000000000000000000000000000000000000000002032613265616533656561353730383261323233336338373763393465656437340000000000000000000000000000000000000000000000000000000062312178000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000a4d69616d69204865617400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f446574726f697420506973746f6e730000000000000000000000000000000000"
    ]
  }
}
```

Resolving market

Returns an array of encoded tuples for games with all statuses except `statusId`: `18` (STATUS_SCHEDULED) unless `statusIds` parameter is passed.
Each game contains: homeScore as uint8, awayScore as uint8, gameId as bytes32, statusId as uint8.

```json
{
  "jobRunID": "1",
  "result": [
    "0x0000000000000000000000000000000000000000000000000000000000000065000000000000000000000000000000000000000000000000000000000000006034663761666639363038346232396636396430663832333065643538343939330000000000000000000000000000000000000000000000000000000000000008",
    "0x000000000000000000000000000000000000000000000000000000000000006f000000000000000000000000000000000000000000000000000000000000007863653739353037623838623832353030366261313063373963653266623562300000000000000000000000000000000000000000000000000000000000000008",
    "0x0000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000006233656531386634666232346162373961313565656530663634633035303833300000000000000000000000000000000000000000000000000000000000000008",
    "0x0000000000000000000000000000000000000000000000000000000000000085000000000000000000000000000000000000000000000000000000000000007762373335663232373535626330396437343732363631663737636639333564310000000000000000000000000000000000000000000000000000000000000008",
    "0x0000000000000000000000000000000000000000000000000000000000000066000000000000000000000000000000000000000000000000000000000000005965613837663464666435643163333936313763393232346661643933373334610000000000000000000000000000000000000000000000000000000000000008",
    "0x0000000000000000000000000000000000000000000000000000000000000074000000000000000000000000000000000000000000000000000000000000006338326131353731363561326266643466633330366136323631653137326635360000000000000000000000000000000000000000000000000000000000000008",
    "0x0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000007239313434326663393630333165636536303166643834643662366331393161360000000000000000000000000000000000000000000000000000000000000008",
    "0x0000000000000000000000000000000000000000000000000000000000000081000000000000000000000000000000000000000000000000000000000000006b32623335643832343765636436653233383836383731316163656532363434310000000000000000000000000000000000000000000000000000000000000008",
    "0x0000000000000000000000000000000000000000000000000000000000000068000000000000000000000000000000000000000000000000000000000000007b65646638653663656466636336313561636338323333303630353137323633630000000000000000000000000000000000000000000000000000000000000008"
  ],
  "statusCode": 200,
  "data": {
    "result": [
      "0x0000000000000000000000000000000000000000000000000000000000000065000000000000000000000000000000000000000000000000000000000000006034663761666639363038346232396636396430663832333065643538343939330000000000000000000000000000000000000000000000000000000000000008",
      "0x000000000000000000000000000000000000000000000000000000000000006f000000000000000000000000000000000000000000000000000000000000007863653739353037623838623832353030366261313063373963653266623562300000000000000000000000000000000000000000000000000000000000000008",
      "0x0000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000006233656531386634666232346162373961313565656530663634633035303833300000000000000000000000000000000000000000000000000000000000000008",
      "0x0000000000000000000000000000000000000000000000000000000000000085000000000000000000000000000000000000000000000000000000000000007762373335663232373535626330396437343732363631663737636639333564310000000000000000000000000000000000000000000000000000000000000008",
      "0x0000000000000000000000000000000000000000000000000000000000000066000000000000000000000000000000000000000000000000000000000000005965613837663464666435643163333936313763393232346661643933373334610000000000000000000000000000000000000000000000000000000000000008",
      "0x0000000000000000000000000000000000000000000000000000000000000074000000000000000000000000000000000000000000000000000000000000006338326131353731363561326266643466633330366136323631653137326635360000000000000000000000000000000000000000000000000000000000000008",
      "0x0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000007239313434326663393630333165636536303166643834643662366331393161360000000000000000000000000000000000000000000000000000000000000008",
      "0x0000000000000000000000000000000000000000000000000000000000000081000000000000000000000000000000000000000000000000000000000000006b32623335643832343765636436653233383836383731316163656532363434310000000000000000000000000000000000000000000000000000000000000008",
      "0x0000000000000000000000000000000000000000000000000000000000000068000000000000000000000000000000000000000000000000000000000000007b65646638653663656466636336313561636338323333303630353137323633630000000000000000000000000000000000000000000000000000000000000008"
    ]
  }
}
```
