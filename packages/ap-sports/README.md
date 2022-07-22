# Chainlink External Adapter for AP Sports API

![2.0.0](https://img.shields.io/github/package-json/v/linkpoolio/adapters?filename=packages/ap-sports/package.json)

Base URL https://api.sportradar.us/

This document was generated automatically. Please see [README Generator](../../scripts#readme-generator) for more info.

## Environment Variables

| Required? |  Name   |                            Description                             |  Type  | Options | Default |
| :-------: | :-----: | :----------------------------------------------------------------: | :----: | :-----: | :-----: |
|    ✅     | API_KEY | The key required for API authentication. Contact the data provider | string |         |         |

---

## Input Parameters

Every EA supports base input parameters from [this list](../../core/bootstrap#base-input-parameters)

| Required? |   Name   |     Description     |  Type  |            Options             | Default |
| :-------: | :------: | :-----------------: | :----: | :----------------------------: | :-----: |
|           | endpoint | The endpoint to use | string | [schedule](#schedule-endpoint) |         |

## Schedule Endpoint

Request events (games) data for markets to be either created or resolved

`schedule` is the only supported name for this endpoint.

### Input Params

| Required? |  Name   | Aliases |                                               Description                                                |  Type  | Options  | Default | Depends On | Not Valid With |
| :-------: | :-----: | :-----: | :------------------------------------------------------------------------------------------------------: | :----: | :------: | :-----: | :--------: | :------------: |
|    ✅     | market  |         | The context of the games data to be requested: `0` (markets to be created), `1` (markets to be resolved) | number | `0`, `1` |         |            |                |
|    ✅     | sportId |         |                                               The sport ID                                               | number |   `1`    |         |            |                |
|    ✅     |  date   |         |                       The date to request events by, as UNIX timestamp in seconds                        | number |          |         |            |                |
|           | gameIds |         |                                  The list of game IDs to filter games.                                   |        |          |         |            |                |

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "schedule",
    "market": 0,
    "sportId": 1,
    "date": 1655777031
  },
  "debug": {
    "cacheKey": "PrUiE2IDJpPqSEGjDIFNaq4CLYI="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "league": {
      "alias": "MLB",
      "name": "Major League Baseball",
      "id": "2fa448bc-fc17-4d3d-be03-e60e080fdc26",
      "date": "2022-06-21",
      "games": [
        {
          "game": {
            "id": "32aec692-7974-4d97-b078-45c3c60fe1e0",
            "status": "scheduled",
            "scheduled": "2022-06-22T00:10:00+00:00",
            "home": {
              "name": "White Sox",
              "market": "Chicago",
              "id": "47f490cd-2f58-4ef7-9dfd-2ad6ba6c1ae8",
              "runs": 7
            },
            "away": {
              "name": "Blue Jays",
              "market": "Toronto",
              "id": "1d678440-b4b1-4954-9b39-70afb3ebbcfa",
              "runs": 6
            }
          }
        }
      ]
    },
    "_comment": "Generation started @ 2022-07-14 03:14:49 UTC ended @ 2022-07-14 03:14:50 UTC",
    "result": [
      "0x33326165633639323739373434643937623037383435633363363066653165300062b25dd8114368696361676f20576869746520536f78546f726f6e746f20426c7565204a617973"
    ]
  },
  "result": [
    "0x33326165633639323739373434643937623037383435633363363066653165300062b25dd8114368696361676f20576869746520536f78546f726f6e746f20426c7565204a617973"
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
    "market": 1,
    "sportId": 1,
    "date": 1655777031
  },
  "debug": {
    "cacheKey": "eSm7p3ftegy3wuVxSDmu4PHoCNk="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "league": {
      "alias": "MLB",
      "name": "Major League Baseball",
      "id": "2fa448bc-fc17-4d3d-be03-e60e080fdc26",
      "date": "2022-06-21",
      "games": [
        {
          "game": {
            "id": "32aec692-7974-4d97-b078-45c3c60fe1e0",
            "status": "closed",
            "scheduled": "2022-06-22T00:10:00+00:00",
            "home": {
              "name": "White Sox",
              "market": "Chicago",
              "id": "47f490cd-2f58-4ef7-9dfd-2ad6ba6c1ae8",
              "runs": 7
            },
            "away": {
              "name": "Blue Jays",
              "market": "Toronto",
              "id": "1d678440-b4b1-4954-9b39-70afb3ebbcfa",
              "runs": 6
            }
          }
        },
        {
          "game": {
            "id": "de3ca292-4b6a-4269-8f80-be5c37f366f5",
            "status": "closed",
            "scheduled": "2022-06-22T00:10:00+00:00",
            "home": {
              "name": "Angels",
              "market": "Los Angeles",
              "id": "47f490cd-2f58-4ef7-9dfd-2ad6ba6c1ae8",
              "runs": 7
            },
            "away": {
              "name": "Royals",
              "market": "Kansas City",
              "id": "1d678440-b4b1-4954-9b39-70afb3ebbcfa",
              "runs": 6
            }
          }
        }
      ]
    },
    "_comment": "Generation started @ 2022-07-14 03:14:49 UTC ended @ 2022-07-14 03:14:50 UTC",
    "result": [
      "0x3332616563363932373937343464393762303738343563336336306665316530070604",
      "0x6465336361323932346236613432363938663830626535633337663336366635070604"
    ]
  },
  "result": [
    "0x3332616563363932373937343464393762303738343563336336306665316530070604",
    "0x6465336361323932346236613432363938663830626535633337663336366635070604"
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
    "market": 1,
    "sportId": 1,
    "date": 1655777031,
    "gameIds": ["de3ca2924b6a42698f80be5c37f366f5"]
  },
  "debug": {
    "cacheKey": "8Gm0jQ++o36cVjapa49ZmOgLT1k="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "league": {
      "alias": "MLB",
      "name": "Major League Baseball",
      "id": "2fa448bc-fc17-4d3d-be03-e60e080fdc26",
      "date": "2022-06-21",
      "games": [
        {
          "game": {
            "id": "32aec692-7974-4d97-b078-45c3c60fe1e0",
            "status": "closed",
            "scheduled": "2022-06-22T00:10:00+00:00",
            "home": {
              "name": "White Sox",
              "market": "Chicago",
              "id": "47f490cd-2f58-4ef7-9dfd-2ad6ba6c1ae8",
              "runs": 7
            },
            "away": {
              "name": "Blue Jays",
              "market": "Toronto",
              "id": "1d678440-b4b1-4954-9b39-70afb3ebbcfa",
              "runs": 6
            }
          }
        },
        {
          "game": {
            "id": "de3ca292-4b6a-4269-8f80-be5c37f366f5",
            "status": "closed",
            "scheduled": "2022-06-22T00:10:00+00:00",
            "home": {
              "name": "Angels",
              "market": "Los Angeles",
              "id": "47f490cd-2f58-4ef7-9dfd-2ad6ba6c1ae8",
              "runs": 7
            },
            "away": {
              "name": "Royals",
              "market": "Kansas City",
              "id": "1d678440-b4b1-4954-9b39-70afb3ebbcfa",
              "runs": 6
            }
          }
        }
      ]
    },
    "_comment": "Generation started @ 2022-07-14 03:14:49 UTC ended @ 2022-07-14 03:14:50 UTC",
    "result": ["0x6465336361323932346236613432363938663830626535633337663336366635070604"]
  },
  "result": ["0x6465336361323932346236613432363938663830626535633337663336366635070604"],
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
    "market": 0,
    "sportId": 1,
    "date": 1655777031
  },
  "debug": {
    "cacheKey": "PrUiE2IDJpPqSEGjDIFNaq4CLYI="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "payload": [],
    "result": []
  },
  "result": [],
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
    "market": 1,
    "sportId": 1,
    "date": 1655777031
  },
  "debug": {
    "cacheKey": "eSm7p3ftegy3wuVxSDmu4PHoCNk="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "payload": [],
    "result": []
  },
  "result": [],
  "statusCode": 200,
  "providerStatusCode": 200
}
```

</details>

---

MIT License
