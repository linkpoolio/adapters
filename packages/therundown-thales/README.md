# Chainlink External Adapter for TheRundown Thales

![4.0.0](https://img.shields.io/github/package-json/v/linkpoolio/adapters?filename=packages/therundown-thales/package.json)

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

| Required? |         Name          | Aliases |                                                                              Description                                                                               |  Type   |                                        Options                                         | Default | Depends On | Not Valid With |
| :-------: | :-------------------: | :-----: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----: | :------------------------------------------------------------------------------------: | :-----: | :--------: | :------------: |
|    ✅     |        sportId        |         |                                                                     The ID of the sport to query.                                                                      | number  | `1`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `18`, `2`, `3`, `4`, `5`, `6`, `7`, `8` |         |            |                |
|    ✅     |         date          |         |                                                      The date of the games to query as a Unix timestamp seconds.                                                       | number  |                                                                                        |         |            |                |
|           |        gameIds        |         |                             The IDs of games to query. Example: `["23660869053591173981da79133fe4c2","fb78cede8c9aa942b2569b048e649a3f"]`.                             |         |                                                                                        |         |            |                |
|           |       statusIds       |         |  The statuses of the games to query in this moment. Examples: `["1","2","3"]. Bear in mind that the status of an unfinished game can change on the Data Provider side  |         |                                                                                        |         |            |                |
|           | sportIdToBookmakerIds |         | A JSON object with sportId as key and an Array of bookmaker IDs (Integer) as value. The order of the bookmaker IDs sets the priority for where to fetch the game odds. |         |                                                                                        |         |            |                |
|    ✅     |         limit         |         |                                                 The maximum number of results to be returned. The minumum value is `1`                                                 | number  |                                                                                        |         |            |                |
|           |   startAfterGameId    |         |                 A cursor for use in pagination. It is the game ID that defines your place in the list and after which game start fetching new results.                 | string  |                                                                                        |         |            |                |
|    ✅     |        market         |         |                                                                  Choose to create or resolve market.                                                                   | string  |                                  `create`, `resolve`                                   |         |            |                |
|           |   hasScoresByPeriod   |         |                       The scores are returned for each team as 2 uint8 arrays. Each element of the array represents the score from each period.                        | boolean |                                                                                        |         |            |                |

### Example

There are no examples for this endpoint.

---

## Odds Endpoint

`odds` is the only supported name for this endpoint.

### Input Params

| Required? |         Name          | Aliases |                                                                              Description                                                                               |  Type  |                                        Options                                         | Default | Depends On | Not Valid With |
| :-------: | :-------------------: | :-----: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----: | :------------------------------------------------------------------------------------: | :-----: | :--------: | :------------: |
|    ✅     |        sportId        |         |                                                                     The ID of the sport to query.                                                                      | number | `1`, `10`, `11`, `12`, `13`, `14`, `15`, `16`, `18`, `2`, `3`, `4`, `5`, `6`, `7`, `8` |         |            |                |
|    ✅     |         date          |         |                                                      The date of the games to query as a Unix timestamp seconds.                                                       | number |                                                                                        |         |            |                |
|           |        gameIds        |         |                             The IDs of games to query. Example: `["23660869053591173981da79133fe4c2","fb78cede8c9aa942b2569b048e649a3f"]`.                             |        |                                                                                        |         |            |                |
|           |       statusIds       |         |  The statuses of the games to query in this moment. Examples: `["1","2","3"]. Bear in mind that the status of an unfinished game can change on the Data Provider side  |        |                                                                                        |         |            |                |
|           | sportIdToBookmakerIds |         | A JSON object with sportId as key and an Array of bookmaker IDs (Integer) as value. The order of the bookmaker IDs sets the priority for where to fetch the game odds. |        |                                                                                        |         |            |                |
|    ✅     |         limit         |         |                                                 The maximum number of results to be returned. The minumum value is `1`                                                 | number |                                                                                        |         |            |                |
|           |   startAfterGameId    |         |                 A cursor for use in pagination. It is the game ID that defines your place in the list and after which game start fetching new results.                 | string |                                                                                        |         |            |                |

### Example

There are no examples for this endpoint.

---

MIT License
