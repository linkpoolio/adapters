# Chainlink External Adapter to control optional request parameters

An adapter that helps TOML jobspec tasks dealing with optional request parameters not present in the request parameters (`cborparse` task output).

**BE AWARE**: run this adapter with caching, rate limiting and cache warming features disabled:

- `CACHE_ENABLED=false`
- `RATE_LIMIT_ENABLED=false`
- `WARMUP_ENABLED=false`

### Input Parameters

| Required? |   Name   |     Description     |                             Options                              | Defaults to |
| :-------: | :------: | :-----------------: | :--------------------------------------------------------------: | :---------: |
|           | endpoint | The endpoint to use | [request-params-controller](#request-params-controller-endpoint) |             |

---

## Request-params-controller Endpoint

Sets to `default` (e.g. `null`) the optional parameters (in `optionalParams`) that don't exist in `params` (a JSON object, e.g. `cborparse` task output).

This endpoint output is not returned as `result`.

### Input Params

| Required? |       Name       |                                                                Description                                                                 | Options | Defaults to |
| :-------: | :--------------: | :----------------------------------------------------------------------------------------------------------------------------------------: | :-----: | :---------: |
|    ✅     |     `params`     |                      A map containing the request parameters (i.e. the JSON object returned by the `cborparse` task)                       |         |             |
|    ✅     | `optionalParams` | An array that contains the optional request parameters names. These will be set to the `default` value if they are not present in `params` |         |             |
|           |    `default`     |                    The value an optional parameter will be set to if it is not present in `params`. Defaults to `null`                     |         |             |

### Sample Input

```json
{
  "id": "1",
  "data": {
    "params": {
      "endpoint": "location-current-conditions",
      "lat": 40.78136100040876,
      "lon": -77.89687509335249
    },
    "optionalParams": ["units"]
  }
}
```

### Sample Output

```json
{
  "jobRunID": "1",
  "data": {
    "endpoint": "location-current-conditions",
    "lat": 40.78136100040876,
    "lon": -77.89687509335249,
    "units": null
  },
  "statusCode": 200
}
```
