# Chainlink External Adapter for TheRundown Thales

![2.1.1](https://img.shields.io/github/package-json/v/linkpoolio/adapters?filename=packages/therundown-thales/package.json)

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

| Required? |         Name          | Aliases |                                                                             Description                                                                             |  Type  |                                     Options                                      | Default | Depends On | Not Valid With |
| :-------: | :-------------------: | :-----: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----: | :------------------------------------------------------------------------------: | :-----: | :--------: | :------------: |
|    ✅     |        sportId        |         |                                                                    The ID of the sport to query                                                                     | number | `1`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `2`, `3`, `4`, `5`, `6`, `7`, `8` |         |            |                |
|    ✅     |         date          |         |                                                     The date of the games to query as a Unix timestamp seconds.                                                     | number |                                                                                  |         |            |                |
|    ✅     |        market         |         |                                                                  Chose to create or resolve market                                                                  | string |                               `create`, `resolve`                                |         |            |                |
|           |       statusIds       |         |                                                    The statuses of the games to query. Examples: `["1","2","3"]`                                                    |        |                                                                                  |         |            |                |
|           |        gameIds        |         |                            The IDs of games to query. Example: `["23660869053591173981da79133fe4c2","fb78cede8c9aa942b2569b048e649a3f"]`                            |        |                                                                                  |         |            |                |
|    ✅     | sportIdToBookmakerIds |         | A JSON object with sportId as key and an Array of bookmaker IDs (Integer) as value. The order of the bookmakers' IDs set the priority where to fetch the game odds) |        |                                                                                  |         |            |                |

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
    "sportIdToBookmakerIds": {
      "4": [3, 11]
    }
  },
  "debug": {
    "cacheKey": "9GkhsH3Xm2rGQxt9hixrapAhIAw="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "meta": {
      "delta_last_id": "11ec-fc76-1239e674-800a-6f874db9643e"
    },
    "events": [
      {
        "event_id": "647d6bbdc2a7e33529fe0106fbb47748",
        "event_uuid": "11ed-0144-ad954c00-8b44-c10719b58e07",
        "sport_id": 4,
        "event_date": "2022-07-11T18:10:00Z",
        "score": {
          "event_id": "647d6bbdc2a7e33529fe0106fbb47748",
          "event_status": "STATUS_SCHEDULED",
          "score_away": 0,
          "score_home": 0,
          "winner_away": 0,
          "winner_home": 0,
          "score_away_by_period": [],
          "score_home_by_period": [],
          "venue_name": "Kauffman Stadium",
          "venue_location": "Kansas City, Missouri",
          "game_clock": 0,
          "display_clock": "0.00",
          "game_period": 0,
          "broadcast": "ESPN+",
          "event_status_detail": "7/11 - 2:10 PM EDT"
        },
        "teams_normalized": [
          {
            "team_id": 53,
            "name": "Detroit",
            "mascot": "Tigers",
            "abbreviation": "DET",
            "ranking": 0,
            "record": "32-47",
            "is_away": true,
            "is_home": false
          },
          {
            "team_id": 54,
            "name": "Kansas City",
            "mascot": "Royals",
            "abbreviation": "KC",
            "ranking": 0,
            "record": "29-49",
            "is_away": false,
            "is_home": true
          }
        ],
        "schedule": {
          "season_type": "Regular Season",
          "season_year": 2022,
          "event_headline": "Doubleheader - Game 1 - Makeup from April 17",
          "event_name": "Doubleheader - Game 1 - Makeup from April 17 - Detroit at Kansas City - 2022-07-11",
          "attendance": "0"
        },
        "line_periods": null
      },
      {
        "event_id": "114c32bfe19a4d13b4507a3bee2f875a",
        "event_uuid": "11ed-016a-65892000-8f86-ce0fb6e15b09",
        "sport_id": 4,
        "event_date": "2022-07-11T22:40:00Z",
        "score": {
          "event_id": "114c32bfe19a4d13b4507a3bee2f875a",
          "event_status": "STATUS_SCHEDULED",
          "score_away": 0,
          "score_home": 0,
          "winner_away": 0,
          "winner_home": 0,
          "score_away_by_period": [],
          "score_home_by_period": [],
          "venue_name": "loanDepot park",
          "venue_location": "Miami, Florida",
          "game_clock": 0,
          "display_clock": "0.00",
          "game_period": 0,
          "broadcast": "",
          "event_status_detail": "7/11 - 6:40 PM EDT"
        },
        "teams_normalized": [
          {
            "team_id": 39,
            "name": "Pittsburgh",
            "mascot": "Pirates",
            "abbreviation": "PIT",
            "ranking": 0,
            "record": "32-47",
            "is_away": true,
            "is_home": false
          },
          {
            "team_id": 32,
            "name": "Miami",
            "mascot": "Marlins",
            "abbreviation": "MIA",
            "ranking": 0,
            "record": "38-40",
            "is_away": false,
            "is_home": true
          }
        ],
        "schedule": {
          "season_type": "Regular Season",
          "season_year": 2022,
          "event_name": "Pittsburgh at Miami - 2022-07-11",
          "attendance": "0"
        },
        "line_periods": null
      },
      {
        "event_id": "88da82bc135157faea219ced8e4a4c38",
        "event_uuid": "11ed-016e-966b5400-8407-c4e594da7c7f",
        "sport_id": 4,
        "event_date": "2022-07-11T23:10:00Z",
        "score": {
          "event_id": "88da82bc135157faea219ced8e4a4c38",
          "event_status": "STATUS_SCHEDULED",
          "score_away": 0,
          "score_home": 0,
          "winner_away": 0,
          "winner_home": 0,
          "score_away_by_period": [],
          "score_home_by_period": [],
          "venue_name": "Tropicana Field",
          "venue_location": "St. Petersburg, Florida",
          "game_clock": 0,
          "display_clock": "0.00",
          "game_period": 0,
          "broadcast": "",
          "event_status_detail": "7/11 - 7:10 PM EDT"
        },
        "teams_normalized": [
          {
            "team_id": 47,
            "name": "Boston",
            "mascot": "Red Sox",
            "abbreviation": "BOS",
            "ranking": 0,
            "record": "45-35",
            "is_away": true,
            "is_home": false
          },
          {
            "team_id": 49,
            "name": "Tampa Bay",
            "mascot": "Rays",
            "abbreviation": "TB",
            "ranking": 0,
            "record": "43-37",
            "is_away": false,
            "is_home": true
          }
        ],
        "schedule": {
          "season_type": "Regular Season",
          "season_year": 2022,
          "event_name": "Boston at Tampa Bay - 2022-07-11",
          "attendance": "0"
        },
        "line_periods": null
      },
      {
        "event_id": "b44fdfd8127787a260a885e69ff5fa44",
        "event_uuid": "11ed-016e-966b5400-8d82-ea2ffaff8a1c",
        "sport_id": 4,
        "event_date": "2022-07-11T23:10:00Z",
        "score": {
          "event_id": "b44fdfd8127787a260a885e69ff5fa44",
          "event_status": "STATUS_SCHEDULED",
          "score_away": 0,
          "score_home": 0,
          "winner_away": 0,
          "winner_home": 0,
          "score_away_by_period": [],
          "score_home_by_period": [],
          "venue_name": "Progressive Field",
          "venue_location": "Cleveland, Ohio",
          "game_clock": 0,
          "display_clock": "0.00",
          "game_period": 0,
          "broadcast": "",
          "event_status_detail": "7/11 - 7:10 PM EDT"
        },
        "teams_normalized": [
          {
            "team_id": 51,
            "name": "Chicago",
            "mascot": "White Sox",
            "abbreviation": "CWS",
            "ranking": 0,
            "record": "38-40",
            "is_away": true,
            "is_home": false
          },
          {
            "team_id": 52,
            "name": "Cleveland",
            "mascot": "Guardians",
            "abbreviation": "CLE",
            "ranking": 0,
            "record": "40-38",
            "is_away": false,
            "is_home": true
          }
        ],
        "schedule": {
          "season_type": "Regular Season",
          "season_year": 2022,
          "event_name": "Chicago at Cleveland - 2022-07-11",
          "attendance": "0"
        },
        "line_periods": null
      },
      {
        "event_id": "a726e8c32aed43e48f5693b1b8710c2d",
        "event_uuid": "11ed-016f-493bb200-85a2-41eca0d0f57e",
        "sport_id": 4,
        "event_date": "2022-07-11T23:15:00Z",
        "score": {
          "event_id": "a726e8c32aed43e48f5693b1b8710c2d",
          "event_status": "STATUS_SCHEDULED",
          "score_away": 0,
          "score_home": 0,
          "winner_away": 0,
          "winner_home": 0,
          "score_away_by_period": [],
          "score_home_by_period": [],
          "venue_name": "Busch Stadium",
          "venue_location": "St. Louis, Missouri",
          "game_clock": 0,
          "display_clock": "0.00",
          "game_period": 0,
          "broadcast": "",
          "event_status_detail": "7/11 - 7:15 PM EDT"
        },
        "teams_normalized": [
          {
            "team_id": 34,
            "name": "Philadelphia",
            "mascot": "Phillies",
            "abbreviation": "PHI",
            "ranking": 0,
            "record": "42-38",
            "is_away": true,
            "is_home": false
          },
          {
            "team_id": 40,
            "name": "St. Louis",
            "mascot": "Cardinals",
            "abbreviation": "STL",
            "ranking": 0,
            "record": "44-38",
            "is_away": false,
            "is_home": true
          }
        ],
        "schedule": {
          "season_type": "Regular Season",
          "season_year": 2022,
          "event_name": "Philadelphia at St. Louis - 2022-07-11",
          "attendance": "0"
        },
        "line_periods": null
      },
      {
        "event_id": "8fdb6e79f0473bcf99bfe2d31481b2a8",
        "event_uuid": "11ed-016f-fc0c1000-8ac4-167bccf6c2a5",
        "sport_id": 4,
        "event_date": "2022-07-11T23:20:00Z",
        "score": {
          "event_id": "8fdb6e79f0473bcf99bfe2d31481b2a8",
          "event_status": "STATUS_SCHEDULED",
          "score_away": 0,
          "score_home": 0,
          "winner_away": 0,
          "winner_home": 0,
          "score_away_by_period": [],
          "score_home_by_period": [],
          "venue_name": "Truist Park",
          "venue_location": "Atlanta, Georgia",
          "game_clock": 0,
          "display_clock": "0.00",
          "game_period": 0,
          "broadcast": "FS1",
          "event_status_detail": "7/11 - 7:20 PM EDT"
        },
        "teams_normalized": [
          {
            "team_id": 33,
            "name": "New York",
            "mascot": "Mets",
            "abbreviation": "NYM",
            "ranking": 0,
            "record": "50-30",
            "is_away": true,
            "is_home": false
          },
          {
            "team_id": 31,
            "name": "Atlanta",
            "mascot": "Braves",
            "abbreviation": "ATL",
            "ranking": 0,
            "record": "47-34",
            "is_away": false,
            "is_home": true
          }
        ],
        "schedule": {
          "season_type": "Regular Season",
          "season_year": 2022,
          "event_name": "New York at Atlanta - 2022-07-11",
          "attendance": "0"
        },
        "line_periods": null
      }
    ],
    "result": [
      "0x000000000000000000000000000000000000000000000000000000000000002036343764366262646332613765333335323966653031303666626234373734380000000000000000000000000000000000000000000000000000000062cc677800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000000124b616e736173204369747920526f79616c730000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e446574726f697420546967657273000000000000000000000000000000000000",
      "0x000000000000000000000000000000000000000000000000000000000000002031313463333262666531396134643133623435303761336265653266383735610000000000000000000000000000000000000000000000000000000062cca6c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000d4d69616d69204d61726c696e730000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000125069747473627572676820506972617465730000000000000000000000000000",
      "0x000000000000000000000000000000000000000000000000000000000000002038386461383262633133353135376661656132313963656438653461346333380000000000000000000000000000000000000000000000000000000062ccadc800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000e54616d7061204261792052617973000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e426f73746f6e2052656420536f78000000000000000000000000000000000000",
      "0x000000000000000000000000000000000000000000000000000000000000002062343466646664383132373738376132363061383835653639666635666134340000000000000000000000000000000000000000000000000000000062ccadc800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000013436c6576656c616e6420477561726469616e730000000000000000000000000000000000000000000000000000000000000000000000000000000000000000114368696361676f20576869746520536f78000000000000000000000000000000",
      "0x000000000000000000000000000000000000000000000000000000000000002061373236653863333261656434336534386635363933623162383731306332640000000000000000000000000000000000000000000000000000000062ccaef400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000001353742e204c6f7569732043617264696e616c730000000000000000000000000000000000000000000000000000000000000000000000000000000000000000155068696c6164656c70686961205068696c6c6965730000000000000000000000",
      "0x000000000000000000000000000000000000000000000000000000000000002038666462366537396630343733626366393962666532643331343831623261380000000000000000000000000000000000000000000000000000000062ccb02000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000e41746c616e746120427261766573000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d4e657720596f726b204d65747300000000000000000000000000000000000000"
    ]
  },
  "result": [
    "0x000000000000000000000000000000000000000000000000000000000000002036343764366262646332613765333335323966653031303666626234373734380000000000000000000000000000000000000000000000000000000062cc677800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000000124b616e736173204369747920526f79616c730000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e446574726f697420546967657273000000000000000000000000000000000000",
    "0x000000000000000000000000000000000000000000000000000000000000002031313463333262666531396134643133623435303761336265653266383735610000000000000000000000000000000000000000000000000000000062cca6c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000d4d69616d69204d61726c696e730000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000125069747473627572676820506972617465730000000000000000000000000000",
    "0x000000000000000000000000000000000000000000000000000000000000002038386461383262633133353135376661656132313963656438653461346333380000000000000000000000000000000000000000000000000000000062ccadc800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000e54616d7061204261792052617973000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e426f73746f6e2052656420536f78000000000000000000000000000000000000",
    "0x000000000000000000000000000000000000000000000000000000000000002062343466646664383132373738376132363061383835653639666635666134340000000000000000000000000000000000000000000000000000000062ccadc800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000013436c6576656c616e6420477561726469616e730000000000000000000000000000000000000000000000000000000000000000000000000000000000000000114368696361676f20576869746520536f78000000000000000000000000000000",
    "0x000000000000000000000000000000000000000000000000000000000000002061373236653863333261656434336534386635363933623162383731306332640000000000000000000000000000000000000000000000000000000062ccaef400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000001353742e204c6f7569732043617264696e616c730000000000000000000000000000000000000000000000000000000000000000000000000000000000000000155068696c6164656c70686961205068696c6c6965730000000000000000000000",
    "0x000000000000000000000000000000000000000000000000000000000000002038666462366537396630343733626366393962666532643331343831623261380000000000000000000000000000000000000000000000000000000062ccb02000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000e41746c616e746120427261766573000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d4e657720596f726b204d65747300000000000000000000000000000000000000"
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
    "sportId": 4,
    "date": 1635529231,
    "market": "create",
    "sportIdToBookmakerIds": {
      "4": [3, 11]
    }
  },
  "debug": {
    "cacheKey": "9GkhsH3Xm2rGQxt9hixrapAhIAw="
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
          "event_status": "STATUS_SCHEDULED",
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
              "moneyline_away": 456,
              "moneyline_away_delta": -413.9999,
              "moneyline_home": -555,
              "moneyline_home_delta": 514.0001,
              "moneyline_draw": 300,
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
              "moneyline_away": 777,
              "moneyline_away_delta": -394.9999,
              "moneyline_home": 888,
              "moneyline_home_delta": 500.0001,
              "moneyline_draw": 222,
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
    "sportIdToBookmakerIds": {
      "1": [3, 11]
    }
  },
  "debug": {
    "cacheKey": "3mVFU7oMncnXFcmmUqZBZWsjW7I="
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
    "sportIdToBookmakerIds": {
      "1": [3, 11]
    }
  },
  "debug": {
    "cacheKey": "ofJNWcFBIzJmxKyWFtNKoKhV4lQ="
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
    "sportIdToBookmakerIds": {
      "4": [3, 11]
    }
  },
  "debug": {
    "cacheKey": "KD/SEEt/btf+3+q0ffARg6usdMc="
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
    "sportIdToBookmakerIds": {
      "1": [3, 11]
    }
  },
  "debug": {
    "cacheKey": "jnUXMRtVoSxObAs1Kbo0Hd122ZY="
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
    "sportIdToBookmakerIds": {
      "1": [3, 11]
    }
  },
  "debug": {
    "cacheKey": "uarWEJstzB/+AhfttEUEfZ5+WXQ="
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

## Odds Endpoint

`odds` is the only supported name for this endpoint.

### Input Params

| Required? |         Name          | Aliases |                                                                             Description                                                                             |  Type  |                                     Options                                      | Default | Depends On | Not Valid With |
| :-------: | :-------------------: | :-----: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----: | :------------------------------------------------------------------------------: | :-----: | :--------: | :------------: |
|    ✅     |        sportId        |         |                                                                    The ID of the sport to query                                                                     | number | `1`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `2`, `3`, `4`, `5`, `6`, `7`, `8` |         |            |                |
|    ✅     |         date          |         |                                                     The date of the games to query as a Unix timestamp seconds.                                                     | number |                                                                                  |         |            |                |
|           |        gameIds        |         |                            The IDs of games to query. Example: `["23660869053591173981da79133fe4c2","fb78cede8c9aa942b2569b048e649a3f"]`                            |        |                                                                                  |         |            |                |
|    ✅     | sportIdToBookmakerIds |         | A JSON object with sportId as key and an Array of bookmaker IDs (Integer) as value. The order of the bookmakers' IDs set the priority where to fetch the game odds) |        |                                                                                  |         |            |                |

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "odds",
    "sportId": 4,
    "date": 1635529231,
    "sportIdToBookmakerIds": {
      "4": [11, 3]
    }
  },
  "debug": {
    "cacheKey": "A3hb9s0YkcvI45IdICemX05tPA0="
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
          "event_status": "STATUS_SCHEDULED",
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
              "moneyline_away": 456,
              "moneyline_away_delta": -413.9999,
              "moneyline_home": -555,
              "moneyline_home_delta": 514.0001,
              "moneyline_draw": 300,
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
              "moneyline_away": 777,
              "moneyline_away_delta": -394.9999,
              "moneyline_home": 888,
              "moneyline_home_delta": 500.0001,
              "moneyline_draw": 222,
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
    "endpoint": "odds",
    "sportId": 1,
    "date": 1662817303,
    "gameIds": ["0017049a376cd9c73345507767295c74", "03a242a346a63835d9ba1797f3a10ff8"],
    "sportIdToBookmakerIds": {
      "1": [3, 11]
    }
  },
  "debug": {
    "cacheKey": "sgH6HOdMrUPzHrejvBQbVcW+lAM="
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
    "endpoint": "odds",
    "sportId": 1,
    "date": 1662817303,
    "gameIds": ["00000000000000000000000000000000"],
    "sportIdToBookmakerIds": {
      "1": [3, 11]
    }
  },
  "debug": {
    "cacheKey": "rbPm9PJ+Yr5vFDXEZiJqPTJQJVg="
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

</details>

---

MIT License
