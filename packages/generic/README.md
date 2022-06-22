# @chainlink/generic-adapter env var schema

![1.0.0](https://img.shields.io/github/package-json/v/linkpoolio/adapters?filename=packages/generic/package.json)

This document was generated automatically. Please see [README Generator](../../scripts#readme-generator) for more info.

## Environment Variables

| Required? |       Name       | Description | Type | Options | Default |
| :-------: | :--------------: | :---------: | :--: | :-----: | :-----: |
|    ✅     | GENERIC_BASE_URL |             |      |         |         |

---

## Input Parameters

Every EA supports base input parameters from [this list](../../core/bootstrap#base-input-parameters)

| Required? |   Name   |     Description     |  Type  |                   Options                   |      Default      |
| :-------: | :------: | :-----------------: | :----: | :-----------------------------------------: | :---------------: |
|           | endpoint | The endpoint to use | string | [generic-request](#genericrequest-endpoint) | `generic-request` |

## GenericRequest Endpoint

`generic-request` is the only supported name for this endpoint.

### Input Params

| Required? |  Name   | Aliases | Description | Type | Options | Default | Depends On | Not Valid With |
| :-------: | :-----: | :-----: | :---------: | :--: | :-----: | :-----: | :--------: | :------------: |
|           | method  |         |             |      |         |         |            |                |
|           |   url   |         |             |      |         |         |            |                |
|           | headers |         |             |      |         |         |            |                |
|           | params  |         |             |      |         |         |            |                |
|           |  data   |         |             |      |         |         |            |                |

### Example

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "generic-request",
    "method": "post",
    "url": "/subpath",
    "headers": {
      "Header-1": "hvalue1",
      "Header-2": "hvalue2"
    },
    "params": {
      "param1": "pvalue1",
      "param2": "pvalue2"
    },
    "data": {
      "data1": "dvalue1",
      "data2": ["dvalue2a", "dvalue2b"]
    }
  },
  "debug": {
    "cacheKey": "hZ95pTIL9tKhkimX2aAwihJO5zM="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "value": 42.777,
    "result": {
      "value": 42.777
    }
  },
  "result": {
    "value": 42.777
  },
  "statusCode": 200
}
```

<details>
<summary>Additional Examples</summary>

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "generic-request",
    "method": "post",
    "url": "/subpath",
    "headers": {
      "Header-1": "hvalue1",
      "Header-2": "hvalue2"
    },
    "params": {
      "param1": "pvalue1",
      "param2": "pvalue2"
    },
    "data": {
      "data1": "dvalue1",
      "data2": ["dvalue2a", "dvalue2b"]
    }
  },
  "debug": {
    "cacheKey": "hZ95pTIL9tKhkimX2aAwihJO5zM="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "data": [
      {
        "value": 42.777
      }
    ],
    "result": [
      {
        "value": 42.777
      }
    ]
  },
  "result": [
    {
      "value": 42.777
    }
  ],
  "statusCode": 200
}
```

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "generic-request",
    "method": "post",
    "url": "/subpath",
    "headers": {
      "Header-1": "hvalue1",
      "Header-2": "hvalue2"
    },
    "params": {
      "param1": "pvalue1",
      "param2": "pvalue2"
    },
    "data": {
      "data1": "dvalue1",
      "data2": ["dvalue2a", "dvalue2b"]
    }
  },
  "debug": {
    "cacheKey": "hZ95pTIL9tKhkimX2aAwihJO5zM="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "value": 42.777,
    "result": {
      "value": 42.777
    }
  },
  "result": {
    "value": 42.777
  },
  "statusCode": 200
}
```

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "generic-request",
    "method": "post",
    "url": "/subpath",
    "headers": {
      "Header-1": "hvalue1",
      "Header-2": "hvalue2"
    },
    "params": {
      "param1": "pvalue1",
      "param2": "pvalue2"
    },
    "data": {
      "data1": "dvalue1",
      "data2": ["dvalue2a", "dvalue2b"]
    }
  },
  "debug": {
    "cacheKey": "hZ95pTIL9tKhkimX2aAwihJO5zM="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "data": [
      {
        "value": 42.777
      }
    ],
    "result": [
      {
        "value": 42.777
      }
    ]
  },
  "result": [
    {
      "value": 42.777
    }
  ],
  "statusCode": 200
}
```

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "generic-request",
    "method": "post",
    "url": "/subpath",
    "headers": {
      "Header-1": "hvalue1",
      "Header-2": "hvalue2"
    },
    "params": {
      "param1": "pvalue1",
      "param2": "pvalue2"
    },
    "data": {
      "data1": "dvalue1",
      "data2": ["dvalue2a", "dvalue2b"]
    }
  },
  "debug": {
    "cacheKey": "hZ95pTIL9tKhkimX2aAwihJO5zM="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "value": 42.777,
    "result": {
      "value": 42.777
    }
  },
  "result": {
    "value": 42.777
  },
  "statusCode": 200
}
```

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "generic-request",
    "method": "post",
    "url": "/subpath",
    "headers": {
      "Header-1": "hvalue1",
      "Header-2": "hvalue2"
    },
    "params": {
      "param1": "pvalue1",
      "param2": "pvalue2"
    },
    "data": {
      "data1": "dvalue1",
      "data2": ["dvalue2a", "dvalue2b"]
    }
  },
  "debug": {
    "cacheKey": "hZ95pTIL9tKhkimX2aAwihJO5zM="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "data": [
      {
        "value": 42.777
      }
    ],
    "result": [
      {
        "value": 42.777
      }
    ]
  },
  "result": [
    {
      "value": 42.777
    }
  ],
  "statusCode": 200
}
```

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "generic-request",
    "method": "post",
    "url": "/subpath",
    "headers": {
      "Header-1": "hvalue1",
      "Header-2": "hvalue2"
    },
    "params": {
      "param1": "pvalue1",
      "param2": "pvalue2"
    },
    "data": {
      "data1": "dvalue1",
      "data2": ["dvalue2a", "dvalue2b"]
    }
  },
  "debug": {
    "cacheKey": "hZ95pTIL9tKhkimX2aAwihJO5zM="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "value": 42.777,
    "result": {
      "value": 42.777
    }
  },
  "result": {
    "value": 42.777
  },
  "statusCode": 200
}
```

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "generic-request",
    "method": "post",
    "url": "/subpath",
    "headers": {
      "Header-1": "hvalue1",
      "Header-2": "hvalue2"
    },
    "params": {
      "param1": "pvalue1",
      "param2": "pvalue2"
    },
    "data": {
      "data1": "dvalue1",
      "data2": ["dvalue2a", "dvalue2b"]
    }
  },
  "debug": {
    "cacheKey": "hZ95pTIL9tKhkimX2aAwihJO5zM="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "data": [
      {
        "value": 42.777
      }
    ],
    "result": [
      {
        "value": 42.777
      }
    ]
  },
  "result": [
    {
      "value": 42.777
    }
  ],
  "statusCode": 200
}
```

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "generic-request",
    "method": "post",
    "url": "/subpath",
    "headers": {
      "Header-3": "hvalue3",
      "Header-4": "hvalue4"
    },
    "params": {
      "param3": "pvalue3",
      "param4": "pvalue4"
    },
    "data": {
      "data3": "dvalue3",
      "data4": ["dvalue4a", "dvalue4b"]
    }
  },
  "debug": {
    "cacheKey": "8g/7IJqCZuA/GipyUOWJBAi8+dE="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "value": 42.777,
    "result": {
      "value": 42.777
    }
  },
  "result": {
    "value": 42.777
  },
  "statusCode": 200
}
```

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "generic-request",
    "method": "post",
    "url": "/subpath",
    "headers": {
      "Header-3": "hvalue3",
      "Header-4": "hvalue4"
    },
    "params": {
      "param3": "pvalue3",
      "param4": "pvalue4"
    },
    "data": {
      "data3": "dvalue3",
      "data4": ["dvalue4a", "dvalue4b"]
    }
  },
  "debug": {
    "cacheKey": "8g/7IJqCZuA/GipyUOWJBAi8+dE="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "data": [
      {
        "value": 42.777
      }
    ],
    "result": [
      {
        "value": 42.777
      }
    ]
  },
  "result": [
    {
      "value": 42.777
    }
  ],
  "statusCode": 200
}
```

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "generic-request",
    "method": "post",
    "url": "/subpath",
    "headers": {
      "Header-1": "hvalue1",
      "Header-2": "hvalue2"
    },
    "params": {
      "param1": "pvalue1",
      "param2": "pvalue2"
    },
    "data": {
      "data1": "dvalue1",
      "data2": ["dvalue2a", "dvalue2b"]
    }
  },
  "debug": {
    "cacheKey": "hZ95pTIL9tKhkimX2aAwihJO5zM="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "value": 42.777,
    "result": {
      "value": 42.777
    }
  },
  "result": {
    "value": 42.777
  },
  "statusCode": 200
}
```

Request:

```json
{
  "id": "1",
  "data": {
    "endpoint": "generic-request",
    "method": "post",
    "url": "/subpath",
    "headers": {
      "Header-1": "hvalue1",
      "Header-2": "hvalue2"
    },
    "params": {
      "param1": "pvalue1",
      "param2": "pvalue2"
    },
    "data": {
      "data1": "dvalue1",
      "data2": ["dvalue2a", "dvalue2b"]
    }
  },
  "debug": {
    "cacheKey": "hZ95pTIL9tKhkimX2aAwihJO5zM="
  }
}
```

Response:

```json
{
  "jobRunID": "1",
  "data": {
    "data": [
      {
        "value": 42.777
      }
    ],
    "result": [
      {
        "value": 42.777
      }
    ]
  },
  "result": [
    {
      "value": 42.777
    }
  ],
  "statusCode": 200
}
```

</details>

---

MIT License
