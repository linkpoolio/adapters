# Chainlink External Adapter for Enetscores

![1.1.0](https://img.shields.io/github/package-json/v/linkpoolio/adapters?filename=packages/enetscores/package.json)

Base URL https://eapi.enetpulse.com/

This document was generated automatically. Please see [README Generator](../../scripts#readme-generator) for more info.

## Environment Variables

| Required? |     Name     |                                           Description                                            |  Type  | Options | Default |
| :-------: | :----------: | :----------------------------------------------------------------------------------------------: | :----: | :-----: | :-----: |
|    ✅     |  API_TOKEN   |  The `token` query string parameter required for API authentication. Contact the data provider   | string |         |         |
|    ✅     | API_USERNAME | The `username` query string parameter required for API authentication. Contact the data provider | string |         |         |

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

| Required? |   Name   | Aliases |                                               Description                                                |  Type  | Options  | Default | Depends On | Not Valid With |
| :-------: | :------: | :-----: | :------------------------------------------------------------------------------------------------------: | :----: | :------: | :-----: | :--------: | :------------: |
|    ✅     |  market  |         | The context of the games data to be requested: `0` (markets to be created), `1` (markets to be resolved) | number | `0`, `1` |         |            |                |
|    ✅     | leagueId |         |                                            The tournament ID                                             | number |          |         |            |                |
|    ✅     |   date   |         |                       The date to request events by, as UNIX timestamp in seconds                        | number |          |         |            |                |
|           | gameIds  |         |             The list of game IDs to filter by for market `1`, otherwise the value is ignored             |        |          |         |            |                |

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "schedule",
    "market": 0,
    "leagueId": 47,
    "date": 1650672000
  },
  "debug": {
    "cacheKey": "nnDrSHgseU9o60wuSd1nXKzGyws="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "events": {
      "3610260": {
        "id": "3610260",
        "name": "Norwich City-Newcastle United",
        "tournament_stageFK": "873678",
        "startdate": "2022-04-23T14:00:00+00:00",
        "status_type": "started",
        "status_descFK": "1",
        "round_typeFK": "71",
        "n": "0",
        "ut": "2022-03-15T16:41:29+00:00",
        "tournamentFK": "16390",
        "tournament_templateFK": "47",
        "sportFK": "1",
        "tournament_stage_name": "Premier League",
        "tournament_name": "2021/2022",
        "tournament_template_name": "England 1",
        "sport_name": "Soccer",
        "gender": "male",
        "property": {
          "50254799": {
            "id": "50254799",
            "type": "metadata",
            "name": "Round",
            "value": "34",
            "n": "0",
            "ut": "2021-06-16T08:42:22+00:00"
          },
          "50254800": {
            "id": "50254800",
            "type": "metadata",
            "name": "Live",
            "value": "yes",
            "n": "0",
            "ut": "2021-06-16T08:42:22+00:00"
          },
          "50254801": {
            "id": "50254801",
            "type": "metadata",
            "name": "LiveStatsType",
            "value": "livestats",
            "n": "0",
            "ut": "2021-06-16T08:42:22+00:00"
          },
          "50255053": {
            "id": "50255053",
            "type": "metadata",
            "name": "VenueName",
            "value": "Carrow Road",
            "n": "0",
            "ut": "2021-06-16T08:42:33+00:00"
          },
          "50255054": {
            "id": "50255054",
            "type": "metadata",
            "name": "Commentary",
            "value": "full",
            "n": "0",
            "ut": "2021-06-16T08:42:33+00:00"
          }
        },
        "event_participants": {
          "13066722": {
            "id": "13066722",
            "number": "1",
            "participantFK": "9850",
            "eventFK": "3610260",
            "n": "0",
            "ut": "2021-06-16T08:42:22+00:00",
            "result": {
              "50971444": {
                "id": "50971444",
                "event_participantsFK": "13066722",
                "result_typeFK": "1",
                "result_code": "ordinarytime",
                "value": "0",
                "n": "0",
                "ut": "2021-06-16T08:42:22+00:00"
              },
              "50971446": {
                "id": "50971446",
                "event_participantsFK": "13066722",
                "result_typeFK": "6",
                "result_code": "runningscore",
                "value": "0",
                "n": "0",
                "ut": "2021-06-16T08:42:22+00:00"
              }
            },
            "participant": {
              "id": "9850",
              "name": "Norwich City",
              "gender": "male",
              "type": "team",
              "countryFK": "2",
              "n": "3",
              "ut": "2022-04-12T12:43:50+00:00",
              "country_name": "England"
            }
          },
          "13066723": {
            "id": "13066723",
            "number": "2",
            "participantFK": "10261",
            "eventFK": "3610260",
            "n": "0",
            "ut": "2021-06-16T08:42:22+00:00",
            "result": {
              "50971445": {
                "id": "50971445",
                "event_participantsFK": "13066723",
                "result_typeFK": "1",
                "result_code": "ordinarytime",
                "value": "0",
                "n": "0",
                "ut": "2021-06-16T08:42:22+00:00"
              },
              "50971447": {
                "id": "50971447",
                "event_participantsFK": "13066723",
                "result_typeFK": "6",
                "result_code": "runningscore",
                "value": "0",
                "n": "0",
                "ut": "2021-06-16T08:42:22+00:00"
              }
            },
            "participant": {
              "id": "10261",
              "name": "Newcastle United",
              "gender": "male",
              "type": "team",
              "countryFK": "2",
              "n": "4",
              "ut": "2022-04-12T12:43:53+00:00",
              "country_name": "England"
            }
          }
        }
      },
      "3610261": {
        "id": "3610261",
        "name": "Manchester City-Watford",
        "tournament_stageFK": "873678",
        "startdate": "2022-04-23T14:00:00+00:00",
        "status_type": "notstarted",
        "status_descFK": "1",
        "round_typeFK": "71",
        "n": "0",
        "ut": "2022-03-15T16:41:29+00:00",
        "tournamentFK": "16390",
        "tournament_templateFK": "47",
        "sportFK": "1",
        "tournament_stage_name": "Premier League",
        "tournament_name": "2021/2022",
        "tournament_template_name": "England 1",
        "sport_name": "Soccer",
        "gender": "male",
        "property": {
          "50254805": {
            "id": "50254805",
            "type": "metadata",
            "name": "Round",
            "value": "34",
            "n": "0",
            "ut": "2021-06-16T08:42:22+00:00"
          },
          "50254806": {
            "id": "50254806",
            "type": "metadata",
            "name": "Live",
            "value": "yes",
            "n": "0",
            "ut": "2021-06-16T08:42:22+00:00"
          },
          "50254807": {
            "id": "50254807",
            "type": "metadata",
            "name": "LiveStatsType",
            "value": "livestats",
            "n": "0",
            "ut": "2021-06-16T08:42:22+00:00"
          },
          "50255055": {
            "id": "50255055",
            "type": "metadata",
            "name": "VenueName",
            "value": "Etihad Stadium",
            "n": "0",
            "ut": "2021-06-16T08:42:34+00:00"
          },
          "50255056": {
            "id": "50255056",
            "type": "metadata",
            "name": "Commentary",
            "value": "full",
            "n": "0",
            "ut": "2021-06-16T08:42:34+00:00"
          }
        },
        "event_participants": {
          "13066724": {
            "id": "13066724",
            "number": "1",
            "participantFK": "8456",
            "eventFK": "3610261",
            "n": "0",
            "ut": "2021-06-16T08:42:22+00:00",
            "result": {
              "50971448": {
                "id": "50971448",
                "event_participantsFK": "13066724",
                "result_typeFK": "1",
                "result_code": "ordinarytime",
                "value": "0",
                "n": "0",
                "ut": "2021-06-16T08:42:22+00:00"
              },
              "50971450": {
                "id": "50971450",
                "event_participantsFK": "13066724",
                "result_typeFK": "6",
                "result_code": "runningscore",
                "value": "0",
                "n": "0",
                "ut": "2021-06-16T08:42:22+00:00"
              }
            },
            "participant": {
              "id": "8456",
              "name": "Manchester City",
              "gender": "male",
              "type": "team",
              "countryFK": "2",
              "n": "2",
              "ut": "2022-04-12T12:43:48+00:00",
              "country_name": "England"
            }
          },
          "13066725": {
            "id": "13066725",
            "number": "2",
            "participantFK": "9817",
            "eventFK": "3610261",
            "n": "0",
            "ut": "2021-06-16T08:42:22+00:00",
            "result": {
              "50971449": {
                "id": "50971449",
                "event_participantsFK": "13066725",
                "result_typeFK": "1",
                "result_code": "ordinarytime",
                "value": "0",
                "n": "0",
                "ut": "2021-06-16T08:42:22+00:00"
              },
              "50971451": {
                "id": "50971451",
                "event_participantsFK": "13066725",
                "result_typeFK": "6",
                "result_code": "runningscore",
                "value": "0",
                "n": "0",
                "ut": "2021-06-16T08:42:22+00:00"
              }
            },
            "participant": {
              "id": "9817",
              "name": "Watford",
              "gender": "male",
              "type": "team",
              "countryFK": "2",
              "n": "2",
              "ut": "2022-04-12T12:43:50+00:00",
              "country_name": "England"
            }
          }
        }
      },
      "3610269": {
        "id": "3610269",
        "name": "Arsenal-Manchester United",
        "tournament_stageFK": "873678",
        "startdate": "2022-04-23T11:30:00+00:00",
        "status_type": "notstarted",
        "status_descFK": "1",
        "round_typeFK": "71",
        "n": "1",
        "ut": "2022-03-15T16:41:29+00:00",
        "tournamentFK": "16390",
        "tournament_templateFK": "47",
        "sportFK": "1",
        "tournament_stage_name": "Premier League",
        "tournament_name": "2021/2022",
        "tournament_template_name": "England 1",
        "sport_name": "Soccer",
        "gender": "male",
        "property": {
          "50254839": {
            "id": "50254839",
            "type": "metadata",
            "name": "Round",
            "value": "34",
            "n": "0",
            "ut": "2021-06-16T08:42:22+00:00"
          },
          "50254840": {
            "id": "50254840",
            "type": "metadata",
            "name": "Live",
            "value": "yes",
            "n": "0",
            "ut": "2021-06-16T08:42:22+00:00"
          },
          "50254841": {
            "id": "50254841",
            "type": "metadata",
            "name": "LiveStatsType",
            "value": "livestats",
            "n": "0",
            "ut": "2021-06-16T08:42:22+00:00"
          },
          "50255071": {
            "id": "50255071",
            "type": "metadata",
            "name": "VenueName",
            "value": "Emirates Stadium",
            "n": "0",
            "ut": "2021-06-16T08:42:37+00:00"
          },
          "50255072": {
            "id": "50255072",
            "type": "metadata",
            "name": "Commentary",
            "value": "full",
            "n": "0",
            "ut": "2021-06-16T08:42:37+00:00"
          }
        },
        "event_participants": {
          "13066740": {
            "id": "13066740",
            "number": "1",
            "participantFK": "9825",
            "eventFK": "3610269",
            "n": "0",
            "ut": "2021-06-16T08:42:22+00:00",
            "result": {
              "50971480": {
                "id": "50971480",
                "event_participantsFK": "13066740",
                "result_typeFK": "1",
                "result_code": "ordinarytime",
                "value": "0",
                "n": "0",
                "ut": "2021-06-16T08:42:23+00:00"
              },
              "50971482": {
                "id": "50971482",
                "event_participantsFK": "13066740",
                "result_typeFK": "6",
                "result_code": "runningscore",
                "value": "0",
                "n": "0",
                "ut": "2021-06-16T08:42:23+00:00"
              }
            },
            "participant": {
              "id": "9825",
              "name": "Arsenal",
              "gender": "male",
              "type": "team",
              "countryFK": "2",
              "n": "2",
              "ut": "2022-04-12T12:43:50+00:00",
              "country_name": "England"
            }
          },
          "13066741": {
            "id": "13066741",
            "number": "2",
            "participantFK": "10260",
            "eventFK": "3610269",
            "n": "0",
            "ut": "2021-06-16T08:42:22+00:00",
            "result": {
              "50971481": {
                "id": "50971481",
                "event_participantsFK": "13066741",
                "result_typeFK": "1",
                "result_code": "ordinarytime",
                "value": "0",
                "n": "0",
                "ut": "2021-06-16T08:42:23+00:00"
              },
              "50971483": {
                "id": "50971483",
                "event_participantsFK": "13066741",
                "result_typeFK": "6",
                "result_code": "runningscore",
                "value": "0",
                "n": "0",
                "ut": "2021-06-16T08:42:23+00:00"
              }
            },
            "participant": {
              "id": "10260",
              "name": "Manchester United",
              "gender": "male",
              "type": "team",
              "countryFK": "2",
              "n": "2",
              "ut": "2022-04-12T12:43:53+00:00",
              "country_name": "England"
            }
          }
        }
      }
    },
    "result": [
      "0x0037169500626406600f4d616e636865737465722043697479576174666f7264",
      "0x0037169d006263e33807417273656e616c4d616e6368657374657220556e69746564"
    ]
  },
  "result": [
    "0x0037169500626406600f4d616e636865737465722043697479576174666f7264",
    "0x0037169d006263e33807417273656e616c4d616e6368657374657220556e69746564"
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
    "leagueId": 47,
    "date": 1650067200
  },
  "debug": {
    "cacheKey": "r78zBVI78AZS6RQCTD1gTCYusEo="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "events": {
      "3610252": {
        "id": "3610252",
        "name": "Watford-Brentford",
        "tournament_stageFK": "873678",
        "startdate": "2022-04-16T14:00:00+00:00",
        "status_type": "notstarted",
        "status_descFK": "6",
        "round_typeFK": "70",
        "n": "4",
        "ut": "2022-04-16T16:00:48+00:00",
        "tournamentFK": "16390",
        "tournament_templateFK": "47",
        "sportFK": "1",
        "tournament_stage_name": "Premier League",
        "tournament_name": "2021/2022",
        "tournament_template_name": "England 1",
        "sport_name": "Soccer",
        "gender": "male",
        "property": {
          "50254765": {
            "id": "50254765",
            "type": "metadata",
            "name": "Round",
            "value": "33",
            "n": "0",
            "ut": "2021-06-16T08:42:21+00:00"
          },
          "50254766": {
            "id": "50254766",
            "type": "metadata",
            "name": "Live",
            "value": "yes",
            "n": "0",
            "ut": "2021-06-16T08:42:21+00:00"
          },
          "50254767": {
            "id": "50254767",
            "type": "metadata",
            "name": "LiveStatsType",
            "value": "livestats",
            "n": "0",
            "ut": "2021-06-16T08:42:21+00:00"
          },
          "50255037": {
            "id": "50255037",
            "type": "metadata",
            "name": "VenueName",
            "value": "Vicarage Road Stadium",
            "n": "0",
            "ut": "2021-06-16T08:42:30+00:00"
          },
          "50255038": {
            "id": "50255038",
            "type": "metadata",
            "name": "Commentary",
            "value": "full",
            "n": "0",
            "ut": "2021-06-16T08:42:30+00:00"
          },
          "55599778": {
            "id": "55599778",
            "type": "ref:participant",
            "name": "refereeFK",
            "value": "299220",
            "n": "0",
            "ut": "2022-04-12T07:30:27+00:00"
          },
          "55599779": {
            "id": "55599779",
            "type": "ref:participant",
            "name": "assistant1_refereeFK",
            "value": "954870",
            "n": "0",
            "ut": "2022-04-12T07:30:27+00:00"
          },
          "55599780": {
            "id": "55599780",
            "type": "ref:participant",
            "name": "assistant2_refereeFK",
            "value": "956216",
            "n": "0",
            "ut": "2022-04-12T07:30:27+00:00"
          },
          "55599781": {
            "id": "55599781",
            "type": "ref:participant",
            "name": "fourth_refereeFK",
            "value": "1195530",
            "n": "0",
            "ut": "2022-04-12T07:30:27+00:00"
          },
          "55599782": {
            "id": "55599782",
            "type": "ref:participant",
            "name": "var1_refereeFK",
            "value": "602126",
            "n": "0",
            "ut": "2022-04-12T07:30:27+00:00"
          },
          "55599783": {
            "id": "55599783",
            "type": "ref:participant",
            "name": "var2_refereeFK",
            "value": "956215",
            "n": "0",
            "ut": "2022-04-12T07:30:27+00:00"
          },
          "55649041": {
            "id": "55649041",
            "type": "metadata",
            "name": "LineupConfirmed",
            "value": "yes",
            "n": "1",
            "ut": "2022-04-16T13:03:34+00:00"
          },
          "55673057": {
            "id": "55673057",
            "type": "metadata",
            "name": "GameStarted",
            "value": "2022-04-16T14:00:31+00:00",
            "n": "0",
            "ut": "2022-04-16T14:00:31+00:00"
          },
          "55675389": {
            "id": "55675389",
            "type": "metadata",
            "name": "FirstHalfEnded",
            "value": "2022-04-16T14:47:46+00:00",
            "n": "0",
            "ut": "2022-04-16T14:47:46+00:00"
          },
          "55676234": {
            "id": "55676234",
            "type": "metadata",
            "name": "SecondHalfStarted",
            "value": "2022-04-16T15:03:08+00:00",
            "n": "0",
            "ut": "2022-04-16T15:03:08+00:00"
          },
          "55678472": {
            "id": "55678472",
            "type": "metadata",
            "name": "SecondHalfEnded",
            "value": "2022-04-16T15:54:07+00:00",
            "n": "0",
            "ut": "2022-04-16T15:54:07+00:00"
          },
          "55678473": {
            "id": "55678473",
            "type": "metadata",
            "name": "GameEnded",
            "value": "2022-04-16T15:54:07+00:00",
            "n": "0",
            "ut": "2022-04-16T15:54:07+00:00"
          },
          "55678832": {
            "id": "55678832",
            "type": "metadata",
            "name": "Verified",
            "value": "yes",
            "n": "0",
            "ut": "2022-04-16T16:00:48+00:00"
          }
        },
        "event_participants": {
          "13066706": {
            "id": "13066706",
            "number": "1",
            "participantFK": "9817",
            "eventFK": "3610252",
            "n": "0",
            "ut": "2022-04-15T12:15:49+00:00",
            "result": {
              "50971412": {
                "id": "50971412",
                "event_participantsFK": "13066706",
                "result_typeFK": "1",
                "result_code": "ordinarytime",
                "value": "1",
                "n": "1",
                "ut": "2022-04-16T15:12:47+00:00"
              },
              "50971414": {
                "id": "50971414",
                "event_participantsFK": "13066706",
                "result_typeFK": "6",
                "result_code": "runningscore",
                "value": "1",
                "n": "1",
                "ut": "2022-04-16T15:12:48+00:00"
              },
              "56994752": {
                "id": "56994752",
                "event_participantsFK": "13066706",
                "result_typeFK": "5",
                "result_code": "halftime",
                "value": "0",
                "n": "0",
                "ut": "2022-04-16T14:47:46+00:00"
              },
              "56996304": {
                "id": "56996304",
                "event_participantsFK": "13066706",
                "result_typeFK": "4",
                "result_code": "finalresult",
                "value": "1",
                "n": "0",
                "ut": "2022-04-16T15:54:07+00:00"
              }
            },
            "participant": {
              "id": "9817",
              "name": "Watford",
              "gender": "male",
              "type": "team",
              "countryFK": "2",
              "n": "2",
              "ut": "2022-04-12T12:43:50+00:00",
              "country_name": "England"
            }
          },
          "13066707": {
            "id": "13066707",
            "number": "2",
            "participantFK": "9937",
            "eventFK": "3610252",
            "n": "0",
            "ut": "2022-04-16T13:59:42+00:00",
            "result": {
              "50971413": {
                "id": "50971413",
                "event_participantsFK": "13066707",
                "result_typeFK": "1",
                "result_code": "ordinarytime",
                "value": "2",
                "n": "2",
                "ut": "2022-04-16T15:52:48+00:00"
              },
              "50971415": {
                "id": "50971415",
                "event_participantsFK": "13066707",
                "result_typeFK": "6",
                "result_code": "runningscore",
                "value": "2",
                "n": "2",
                "ut": "2022-04-16T15:52:48+00:00"
              },
              "56994753": {
                "id": "56994753",
                "event_participantsFK": "13066707",
                "result_typeFK": "5",
                "result_code": "halftime",
                "value": "1",
                "n": "0",
                "ut": "2022-04-16T14:47:46+00:00"
              },
              "56996305": {
                "id": "56996305",
                "event_participantsFK": "13066707",
                "result_typeFK": "4",
                "result_code": "finalresult",
                "value": "2",
                "n": "0",
                "ut": "2022-04-16T15:54:07+00:00"
              }
            },
            "participant": {
              "id": "9937",
              "name": "Brentford",
              "gender": "male",
              "type": "team",
              "countryFK": "2",
              "n": "2",
              "ut": "2022-04-12T12:43:50+00:00",
              "country_name": "England"
            }
          }
        },
        "elapsed": {
          "1700709": {
            "id": "1700709",
            "elapsed": "90",
            "injury_time": "no",
            "injury_time_elapsed": "0",
            "time_type": "minute",
            "n": "100",
            "ut": "2022-04-16T15:54:07+00:00"
          }
        }
      },
      "3610253": {
        "id": "3610253",
        "name": "Tottenham Hotspur-Brighton & Hove Albion",
        "tournament_stageFK": "873678",
        "startdate": "2022-04-16T11:30:00+00:00",
        "status_type": "finished",
        "status_descFK": "6",
        "round_typeFK": "70",
        "n": "5",
        "ut": "2022-04-16T13:31:10+00:00",
        "tournamentFK": "16390",
        "tournament_templateFK": "47",
        "sportFK": "1",
        "tournament_stage_name": "Premier League",
        "tournament_name": "2021/2022",
        "tournament_template_name": "England 1",
        "sport_name": "Soccer",
        "gender": "male",
        "property": {
          "50254769": {
            "id": "50254769",
            "type": "metadata",
            "name": "Round",
            "value": "33",
            "n": "0",
            "ut": "2021-06-16T08:42:21+00:00"
          },
          "50254770": {
            "id": "50254770",
            "type": "metadata",
            "name": "Live",
            "value": "yes",
            "n": "0",
            "ut": "2021-06-16T08:42:21+00:00"
          },
          "50254771": {
            "id": "50254771",
            "type": "metadata",
            "name": "LiveStatsType",
            "value": "livestats",
            "n": "0",
            "ut": "2021-06-16T08:42:21+00:00"
          },
          "50255039": {
            "id": "50255039",
            "type": "metadata",
            "name": "VenueName",
            "value": "Tottenham Hotspur Stadium",
            "n": "0",
            "ut": "2021-06-16T08:42:31+00:00"
          },
          "50255040": {
            "id": "50255040",
            "type": "metadata",
            "name": "Commentary",
            "value": "full",
            "n": "0",
            "ut": "2021-06-16T08:42:31+00:00"
          },
          "55599103": {
            "id": "55599103",
            "type": "ref:participant",
            "name": "refereeFK",
            "value": "431322",
            "n": "0",
            "ut": "2022-04-12T07:23:00+00:00"
          },
          "55599104": {
            "id": "55599104",
            "type": "ref:participant",
            "name": "assistant1_refereeFK",
            "value": "954874",
            "n": "0",
            "ut": "2022-04-12T07:23:00+00:00"
          },
          "55599105": {
            "id": "55599105",
            "type": "ref:participant",
            "name": "assistant2_refereeFK",
            "value": "954875",
            "n": "0",
            "ut": "2022-04-12T07:23:00+00:00"
          },
          "55599106": {
            "id": "55599106",
            "type": "ref:participant",
            "name": "fourth_refereeFK",
            "value": "1216555",
            "n": "0",
            "ut": "2022-04-12T07:23:00+00:00"
          },
          "55599108": {
            "id": "55599108",
            "type": "ref:participant",
            "name": "var1_refereeFK",
            "value": "117804",
            "n": "0",
            "ut": "2022-04-12T07:23:00+00:00"
          },
          "55599110": {
            "id": "55599110",
            "type": "ref:participant",
            "name": "var2_refereeFK",
            "value": "954883",
            "n": "0",
            "ut": "2022-04-12T07:23:00+00:00"
          },
          "55643799": {
            "id": "55643799",
            "type": "metadata",
            "name": "LineupConfirmed",
            "value": "yes",
            "n": "1",
            "ut": "2022-04-16T10:33:53+00:00"
          },
          "55669058": {
            "id": "55669058",
            "type": "metadata",
            "name": "GameStarted",
            "value": "2022-04-16T11:30:34+00:00",
            "n": "0",
            "ut": "2022-04-16T11:30:34+00:00"
          },
          "55670066": {
            "id": "55670066",
            "type": "metadata",
            "name": "FirstHalfEnded",
            "value": "2022-04-16T12:18:42+00:00",
            "n": "0",
            "ut": "2022-04-16T12:18:42+00:00"
          },
          "55670559": {
            "id": "55670559",
            "type": "metadata",
            "name": "SecondHalfStarted",
            "value": "2022-04-16T12:34:12+00:00",
            "n": "0",
            "ut": "2022-04-16T12:34:12+00:00"
          },
          "55672104": {
            "id": "55672104",
            "type": "metadata",
            "name": "SecondHalfEnded",
            "value": "2022-04-16T13:25:24+00:00",
            "n": "0",
            "ut": "2022-04-16T13:25:24+00:00"
          },
          "55672105": {
            "id": "55672105",
            "type": "metadata",
            "name": "GameEnded",
            "value": "2022-04-16T13:25:24+00:00",
            "n": "0",
            "ut": "2022-04-16T13:25:24+00:00"
          },
          "55672113": {
            "id": "55672113",
            "type": "metadata",
            "name": "Spectators",
            "value": "58685",
            "n": "0",
            "ut": "2022-04-16T13:26:22+00:00"
          },
          "55672228": {
            "id": "55672228",
            "type": "metadata",
            "name": "Verified",
            "value": "yes",
            "n": "0",
            "ut": "2022-04-16T13:31:10+00:00"
          }
        },
        "event_participants": {
          "13066708": {
            "id": "13066708",
            "number": "1",
            "participantFK": "8586",
            "eventFK": "3610253",
            "n": "0",
            "ut": "2022-04-16T10:33:19+00:00",
            "result": {
              "50971416": {
                "id": "50971416",
                "event_participantsFK": "13066708",
                "result_typeFK": "1",
                "result_code": "ordinarytime",
                "value": "0",
                "n": "0",
                "ut": "2021-06-16T08:42:21+00:00"
              },
              "50971418": {
                "id": "50971418",
                "event_participantsFK": "13066708",
                "result_typeFK": "6",
                "result_code": "runningscore",
                "value": "0",
                "n": "0",
                "ut": "2021-06-16T08:42:21+00:00"
              },
              "56991709": {
                "id": "56991709",
                "event_participantsFK": "13066708",
                "result_typeFK": "5",
                "result_code": "halftime",
                "value": "0",
                "n": "0",
...
```

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "schedule",
    "market": 1,
    "leagueId": 47,
    "date": 1650067200,
    "gameIds": [3610254, 3610255]
  },
  "debug": {
    "cacheKey": "cm7387otmsnbT52ZW6C6QnugDiM="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "events": {
      "3610252": {
        "id": "3610252",
        "name": "Watford-Brentford",
        "tournament_stageFK": "873678",
        "startdate": "2022-04-16T14:00:00+00:00",
        "status_type": "notstarted",
        "status_descFK": "6",
        "round_typeFK": "70",
        "n": "4",
        "ut": "2022-04-16T16:00:48+00:00",
        "tournamentFK": "16390",
        "tournament_templateFK": "47",
        "sportFK": "1",
        "tournament_stage_name": "Premier League",
        "tournament_name": "2021/2022",
        "tournament_template_name": "England 1",
        "sport_name": "Soccer",
        "gender": "male",
        "property": {
          "50254765": {
            "id": "50254765",
            "type": "metadata",
            "name": "Round",
            "value": "33",
            "n": "0",
            "ut": "2021-06-16T08:42:21+00:00"
          },
          "50254766": {
            "id": "50254766",
            "type": "metadata",
            "name": "Live",
            "value": "yes",
            "n": "0",
            "ut": "2021-06-16T08:42:21+00:00"
          },
          "50254767": {
            "id": "50254767",
            "type": "metadata",
            "name": "LiveStatsType",
            "value": "livestats",
            "n": "0",
            "ut": "2021-06-16T08:42:21+00:00"
          },
          "50255037": {
            "id": "50255037",
            "type": "metadata",
            "name": "VenueName",
            "value": "Vicarage Road Stadium",
            "n": "0",
            "ut": "2021-06-16T08:42:30+00:00"
          },
          "50255038": {
            "id": "50255038",
            "type": "metadata",
            "name": "Commentary",
            "value": "full",
            "n": "0",
            "ut": "2021-06-16T08:42:30+00:00"
          },
          "55599778": {
            "id": "55599778",
            "type": "ref:participant",
            "name": "refereeFK",
            "value": "299220",
            "n": "0",
            "ut": "2022-04-12T07:30:27+00:00"
          },
          "55599779": {
            "id": "55599779",
            "type": "ref:participant",
            "name": "assistant1_refereeFK",
            "value": "954870",
            "n": "0",
            "ut": "2022-04-12T07:30:27+00:00"
          },
          "55599780": {
            "id": "55599780",
            "type": "ref:participant",
            "name": "assistant2_refereeFK",
            "value": "956216",
            "n": "0",
            "ut": "2022-04-12T07:30:27+00:00"
          },
          "55599781": {
            "id": "55599781",
            "type": "ref:participant",
            "name": "fourth_refereeFK",
            "value": "1195530",
            "n": "0",
            "ut": "2022-04-12T07:30:27+00:00"
          },
          "55599782": {
            "id": "55599782",
            "type": "ref:participant",
            "name": "var1_refereeFK",
            "value": "602126",
            "n": "0",
            "ut": "2022-04-12T07:30:27+00:00"
          },
          "55599783": {
            "id": "55599783",
            "type": "ref:participant",
            "name": "var2_refereeFK",
            "value": "956215",
            "n": "0",
            "ut": "2022-04-12T07:30:27+00:00"
          },
          "55649041": {
            "id": "55649041",
            "type": "metadata",
            "name": "LineupConfirmed",
            "value": "yes",
            "n": "1",
            "ut": "2022-04-16T13:03:34+00:00"
          },
          "55673057": {
            "id": "55673057",
            "type": "metadata",
            "name": "GameStarted",
            "value": "2022-04-16T14:00:31+00:00",
            "n": "0",
            "ut": "2022-04-16T14:00:31+00:00"
          },
          "55675389": {
            "id": "55675389",
            "type": "metadata",
            "name": "FirstHalfEnded",
            "value": "2022-04-16T14:47:46+00:00",
            "n": "0",
            "ut": "2022-04-16T14:47:46+00:00"
          },
          "55676234": {
            "id": "55676234",
            "type": "metadata",
            "name": "SecondHalfStarted",
            "value": "2022-04-16T15:03:08+00:00",
            "n": "0",
            "ut": "2022-04-16T15:03:08+00:00"
          },
          "55678472": {
            "id": "55678472",
            "type": "metadata",
            "name": "SecondHalfEnded",
            "value": "2022-04-16T15:54:07+00:00",
            "n": "0",
            "ut": "2022-04-16T15:54:07+00:00"
          },
          "55678473": {
            "id": "55678473",
            "type": "metadata",
            "name": "GameEnded",
            "value": "2022-04-16T15:54:07+00:00",
            "n": "0",
            "ut": "2022-04-16T15:54:07+00:00"
          },
          "55678832": {
            "id": "55678832",
            "type": "metadata",
            "name": "Verified",
            "value": "yes",
            "n": "0",
            "ut": "2022-04-16T16:00:48+00:00"
          }
        },
        "event_participants": {
          "13066706": {
            "id": "13066706",
            "number": "1",
            "participantFK": "9817",
            "eventFK": "3610252",
            "n": "0",
            "ut": "2022-04-15T12:15:49+00:00",
            "result": {
              "50971412": {
                "id": "50971412",
                "event_participantsFK": "13066706",
                "result_typeFK": "1",
                "result_code": "ordinarytime",
                "value": "1",
                "n": "1",
                "ut": "2022-04-16T15:12:47+00:00"
              },
              "50971414": {
                "id": "50971414",
                "event_participantsFK": "13066706",
                "result_typeFK": "6",
                "result_code": "runningscore",
                "value": "1",
                "n": "1",
                "ut": "2022-04-16T15:12:48+00:00"
              },
              "56994752": {
                "id": "56994752",
                "event_participantsFK": "13066706",
                "result_typeFK": "5",
                "result_code": "halftime",
                "value": "0",
                "n": "0",
                "ut": "2022-04-16T14:47:46+00:00"
              },
              "56996304": {
                "id": "56996304",
                "event_participantsFK": "13066706",
                "result_typeFK": "4",
                "result_code": "finalresult",
                "value": "1",
                "n": "0",
                "ut": "2022-04-16T15:54:07+00:00"
              }
            },
            "participant": {
              "id": "9817",
              "name": "Watford",
              "gender": "male",
              "type": "team",
              "countryFK": "2",
              "n": "2",
              "ut": "2022-04-12T12:43:50+00:00",
              "country_name": "England"
            }
          },
          "13066707": {
            "id": "13066707",
            "number": "2",
            "participantFK": "9937",
            "eventFK": "3610252",
            "n": "0",
            "ut": "2022-04-16T13:59:42+00:00",
            "result": {
              "50971413": {
                "id": "50971413",
                "event_participantsFK": "13066707",
                "result_typeFK": "1",
                "result_code": "ordinarytime",
                "value": "2",
                "n": "2",
                "ut": "2022-04-16T15:52:48+00:00"
              },
              "50971415": {
                "id": "50971415",
                "event_participantsFK": "13066707",
                "result_typeFK": "6",
                "result_code": "runningscore",
                "value": "2",
                "n": "2",
                "ut": "2022-04-16T15:52:48+00:00"
              },
              "56994753": {
                "id": "56994753",
                "event_participantsFK": "13066707",
                "result_typeFK": "5",
                "result_code": "halftime",
                "value": "1",
                "n": "0",
                "ut": "2022-04-16T14:47:46+00:00"
              },
              "56996305": {
                "id": "56996305",
                "event_participantsFK": "13066707",
                "result_typeFK": "4",
                "result_code": "finalresult",
                "value": "2",
                "n": "0",
                "ut": "2022-04-16T15:54:07+00:00"
              }
            },
            "participant": {
              "id": "9937",
              "name": "Brentford",
              "gender": "male",
              "type": "team",
              "countryFK": "2",
              "n": "2",
              "ut": "2022-04-12T12:43:50+00:00",
              "country_name": "England"
            }
          }
        },
        "elapsed": {
          "1700709": {
            "id": "1700709",
            "elapsed": "90",
            "injury_time": "no",
            "injury_time_elapsed": "0",
            "time_type": "minute",
            "n": "100",
            "ut": "2022-04-16T15:54:07+00:00"
          }
        }
      },
      "3610253": {
        "id": "3610253",
        "name": "Tottenham Hotspur-Brighton & Hove Albion",
        "tournament_stageFK": "873678",
        "startdate": "2022-04-16T11:30:00+00:00",
        "status_type": "finished",
        "status_descFK": "6",
        "round_typeFK": "70",
        "n": "5",
        "ut": "2022-04-16T13:31:10+00:00",
        "tournamentFK": "16390",
        "tournament_templateFK": "47",
        "sportFK": "1",
        "tournament_stage_name": "Premier League",
        "tournament_name": "2021/2022",
        "tournament_template_name": "England 1",
        "sport_name": "Soccer",
        "gender": "male",
        "property": {
          "50254769": {
            "id": "50254769",
            "type": "metadata",
            "name": "Round",
            "value": "33",
            "n": "0",
            "ut": "2021-06-16T08:42:21+00:00"
          },
          "50254770": {
            "id": "50254770",
            "type": "metadata",
            "name": "Live",
            "value": "yes",
            "n": "0",
            "ut": "2021-06-16T08:42:21+00:00"
          },
          "50254771": {
            "id": "50254771",
            "type": "metadata",
            "name": "LiveStatsType",
            "value": "livestats",
            "n": "0",
            "ut": "2021-06-16T08:42:21+00:00"
          },
          "50255039": {
            "id": "50255039",
            "type": "metadata",
            "name": "VenueName",
            "value": "Tottenham Hotspur Stadium",
            "n": "0",
            "ut": "2021-06-16T08:42:31+00:00"
          },
          "50255040": {
            "id": "50255040",
            "type": "metadata",
            "name": "Commentary",
            "value": "full",
            "n": "0",
            "ut": "2021-06-16T08:42:31+00:00"
          },
          "55599103": {
            "id": "55599103",
            "type": "ref:participant",
            "name": "refereeFK",
            "value": "431322",
            "n": "0",
            "ut": "2022-04-12T07:23:00+00:00"
          },
          "55599104": {
            "id": "55599104",
            "type": "ref:participant",
            "name": "assistant1_refereeFK",
            "value": "954874",
            "n": "0",
            "ut": "2022-04-12T07:23:00+00:00"
          },
          "55599105": {
            "id": "55599105",
            "type": "ref:participant",
            "name": "assistant2_refereeFK",
            "value": "954875",
            "n": "0",
            "ut": "2022-04-12T07:23:00+00:00"
          },
          "55599106": {
            "id": "55599106",
            "type": "ref:participant",
            "name": "fourth_refereeFK",
            "value": "1216555",
            "n": "0",
            "ut": "2022-04-12T07:23:00+00:00"
          },
          "55599108": {
            "id": "55599108",
            "type": "ref:participant",
            "name": "var1_refereeFK",
            "value": "117804",
            "n": "0",
            "ut": "2022-04-12T07:23:00+00:00"
          },
          "55599110": {
            "id": "55599110",
            "type": "ref:participant",
            "name": "var2_refereeFK",
            "value": "954883",
            "n": "0",
            "ut": "2022-04-12T07:23:00+00:00"
          },
          "55643799": {
            "id": "55643799",
            "type": "metadata",
            "name": "LineupConfirmed",
            "value": "yes",
            "n": "1",
            "ut": "2022-04-16T10:33:53+00:00"
          },
          "55669058": {
            "id": "55669058",
            "type": "metadata",
            "name": "GameStarted",
            "value": "2022-04-16T11:30:34+00:00",
            "n": "0",
            "ut": "2022-04-16T11:30:34+00:00"
          },
          "55670066": {
            "id": "55670066",
            "type": "metadata",
            "name": "FirstHalfEnded",
            "value": "2022-04-16T12:18:42+00:00",
            "n": "0",
            "ut": "2022-04-16T12:18:42+00:00"
          },
          "55670559": {
            "id": "55670559",
            "type": "metadata",
            "name": "SecondHalfStarted",
            "value": "2022-04-16T12:34:12+00:00",
            "n": "0",
            "ut": "2022-04-16T12:34:12+00:00"
          },
          "55672104": {
            "id": "55672104",
            "type": "metadata",
            "name": "SecondHalfEnded",
            "value": "2022-04-16T13:25:24+00:00",
            "n": "0",
            "ut": "2022-04-16T13:25:24+00:00"
          },
          "55672105": {
            "id": "55672105",
            "type": "metadata",
            "name": "GameEnded",
            "value": "2022-04-16T13:25:24+00:00",
            "n": "0",
            "ut": "2022-04-16T13:25:24+00:00"
          },
          "55672113": {
            "id": "55672113",
            "type": "metadata",
            "name": "Spectators",
            "value": "58685",
            "n": "0",
            "ut": "2022-04-16T13:26:22+00:00"
          },
          "55672228": {
            "id": "55672228",
            "type": "metadata",
            "name": "Verified",
            "value": "yes",
            "n": "0",
            "ut": "2022-04-16T13:31:10+00:00"
          }
        },
        "event_participants": {
          "13066708": {
            "id": "13066708",
            "number": "1",
            "participantFK": "8586",
            "eventFK": "3610253",
            "n": "0",
            "ut": "2022-04-16T10:33:19+00:00",
            "result": {
              "50971416": {
                "id": "50971416",
                "event_participantsFK": "13066708",
                "result_typeFK": "1",
                "result_code": "ordinarytime",
                "value": "0",
                "n": "0",
                "ut": "2021-06-16T08:42:21+00:00"
              },
              "50971418": {
                "id": "50971418",
                "event_participantsFK": "13066708",
                "result_typeFK": "6",
                "result_code": "runningscore",
                "value": "0",
                "n": "0",
                "ut": "2021-06-16T08:42:21+00:00"
              },
              "56991709": {
                "id": "56991709",
                "event_participantsFK": "13066708",
                "result_typeFK": "5",
                "result_code": "halftime",
                "value": "0",
                "n": "0",
...
```

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "schedule",
    "market": 0,
    "leagueId": 47,
    "date": 1650067200
  },
  "debug": {
    "cacheKey": "UzQCuuJpkOI6co4/2u4r7mOTeQk="
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
    "leagueId": 47,
    "date": 1650067200
  },
  "debug": {
    "cacheKey": "r78zBVI78AZS6RQCTD1gTCYusEo="
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
