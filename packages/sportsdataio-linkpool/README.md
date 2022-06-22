# Chainlink External Adapter for Sportsdataio (LinkPool version)

![1.0.1](https://img.shields.io/github/package-json/v/smartcontractkit/external-adapters-js?filename=packages/sources/sportsdataio-linkpool/package.json)

Adapter got get data from Sportsdata.io

Base URL https://api.sportsdata.io/v3

This document was generated automatically. Please see [README Generator](../../scripts#readme-generator) for more info.

## Environment Variables

| Required? |    Name     |      Description      |  Type  | Options | Default |
| :-------: | :---------: | :-------------------: | :----: | :-----: | :-----: |
|    ✅     | MLB_API_KEY | API key for MLB stats | string |         |         |

---

## Input Parameters

Every EA supports base input parameters from [this list](../../core/bootstrap#base-input-parameters)

| Required? |   Name   |     Description     |  Type  |            Options             | Default |
| :-------: | :------: | :-----------------: | :----: | :----------------------------: | :-----: |
|           | endpoint | The endpoint to use | string | [schedule](#schedule-endpoint) |         |

## Schedule Endpoint

Request games data for markets to be either created or resolved

`schedule` is the only supported name for this endpoint.

### Input Params

| Required? |   Name   | Aliases |                                               Description                                                |  Type  | Options  | Default | Depends On | Not Valid With |
| :-------: | :------: | :-----: | :------------------------------------------------------------------------------------------------------: | :----: | :------: | :-----: | :--------: | :------------: |
|    ✅     |  market  |         | The context of the games data to be requested: `0` (markets to be created), `1` (markets to be resolved) | number | `0`, `1` |         |            |                |
|    ✅     | leagueId |         |                                       The tournament ID: `0` (MLB)                                       | number |   `0`    |         |            |                |
|    ✅     |   date   |         |                        The date to request games by, as UNIX timestamp in seconds                        | number |          |         |            |                |
|           | gameIds  |         |     The list of game IDs to filter by for market `1`, otherwise the value is ignored. Type: number[]     |        |          |         |            |                |

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "schedule",
    "market": 0,
    "leagueId": 0,
    "date": 1650758400
  },
  "debug": {
    "cacheKey": "UtC1ri9cVOWwGmmLuGFVOjrkC10="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "payload": [
      "0x0000fc3b00626584680000000000000044455400000000000000434f4c000000",
      "0x0000fc3e0062658a440000000000000041544c000000000000004d4941000000"
    ],
    "result": [
      "0x0000fc3b00626584680000000000000044455400000000000000434f4c000000",
      "0x0000fc3e0062658a440000000000000041544c000000000000004d4941000000"
    ]
  },
  "result": [
    "0x0000fc3b00626584680000000000000044455400000000000000434f4c000000",
    "0x0000fc3e0062658a440000000000000041544c000000000000004d4941000000"
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
    "leagueId": 0,
    "date": 1650585600
  },
  "debug": {
    "cacheKey": "uVpCzbkU+J4S3dYEZliFKAggC+A="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "payload": [
      "0x0000fc24020400000000000000000000000000000046696e616c000000000000",
      "0x0000fc21040200000000000000000000000000000046696e616c000000000000"
    ],
    "result": [
      "0x0000fc24020400000000000000000000000000000046696e616c000000000000",
      "0x0000fc21040200000000000000000000000000000046696e616c000000000000"
    ]
  },
  "result": [
    "0x0000fc24020400000000000000000000000000000046696e616c000000000000",
    "0x0000fc21040200000000000000000000000000000046696e616c000000000000"
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
    "leagueId": 0,
    "date": 1650585600,
    "gameIds": [64545, 64546]
  },
  "debug": {
    "cacheKey": "MJFURgcHNS8FY4/7NcgKfp6bodQ="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "payload": ["0x0000fc21040200000000000000000000000000000046696e616c000000000000"],
    "result": ["0x0000fc21040200000000000000000000000000000046696e616c000000000000"]
  },
  "result": ["0x0000fc21040200000000000000000000000000000046696e616c000000000000"],
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
    "leagueId": 0,
    "date": 1650637200
  },
  "debug": {
    "cacheKey": "aN2jpRZpJkXMs3U9fQID2qTfpRM="
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
    "leagueId": 0,
    "date": 1650585600
  },
  "debug": {
    "cacheKey": "uVpCzbkU+J4S3dYEZliFKAggC+A="
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
