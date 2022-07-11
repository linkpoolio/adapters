# Boilerplate Adapter

This adapter serves as a boilerplate starting point for building all other adapters.

## Example

### coins endpoint

```
Request
{
  "id": 1,
  "data": {
    "endpoint": "coins",
    "filter": "", // "BTC,ETH,LINK"
    "parse": "", // "symbol"
  }
}

Response
{
  "jobRunID": 1,
  "result": 1,
  "statusCode": 200,
  "data": [
    {
      name: "Bitcoin",
      symbol: "BTC",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
    },
    {
      name: "Chainlink",
      symbol: "LINK",
    },
  ]
}
```

### market endpoint

```
Request
{
    "id": 1,
    "data": {
        "endpoint": "market",
        "id": "bitcoin",
        "currency": "usd",
        "parse": "" // "symbol,price,marketCap"
    }
}

Response
{
    "jobRunID": 1,
    "statusCode": 200,
    "data": [
        {
            "symbol": "btc",
            "name": "Bitcoin",
            "price": 20472,
            "marketCap": 390891952249,
            "marketCapRank": 1,
            "supply": 21000000,
            "circulatingSupply": 19093768
        }
    ]
}
```
