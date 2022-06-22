# Chainlink External Adapter to query DNS

![1.2.28](https://img.shields.io/github/package-json/v/linkpoolio/adapters?filename=packages/dns-query/package.json)

DNS Query lets query DNS over HTTPS (DoH)

This document was generated automatically. Please see [README Generator](../../scripts#readme-generator) for more info.

## Environment Variables

| Required? |      Name       |                         Description                          |  Type  |        Options         | Default |
| :-------: | :-------------: | :----------------------------------------------------------: | :----: | :--------------------: | :-----: |
|    ✅     |  DNS_PROVIDER   |                     DNS provider to use                      | string | `cloudflare`, `google` |         |
|           | CUSTOM_ENDPOINT | DNS provider URL to override default URLs for `DNS_PROVIDER` | string |                        |         |

---

## Input Parameters

Every EA supports base input parameters from [this list](../../core/bootstrap#base-input-parameters)

| Required? |   Name   |     Description     |  Type  |            Options             |  Default   |
| :-------: | :------: | :-----------------: | :----: | :----------------------------: | :--------: |
|           | endpoint | The endpoint to use | string | [dnsQuery](#dnsquery-endpoint) | `dnsQuery` |

## DnsQuery Endpoint

`dnsQuery` is the only supported name for this endpoint.

### Input Params

| Required? | Name | Aliases |                                      Description                                       | Type | Options | Default | Depends On | Not Valid With |
| :-------: | :--: | :-----: | :------------------------------------------------------------------------------------: | :--: | :-----: | :-----: | :--------: | :------------: |
|    ✅     | name |         |                             Query Name, eg. "example.com"                              |      |         |         |            |                |
|    ✅     | type |         |                 Query Type (either a numeric value or text), eg. "TXT"                 |      |         |         |            |                |
|           |  do  |         | DO bit - set if client wants DNSSEC data (either boolean or numeric value), eg. "true" |      |         |         |            |                |
|           |  cd  |         |   CD bit - set to disable validation (either boolean or numeric value), eg. "false"    |      |         |         |            |                |

### Example

There are no examples for this endpoint.

---

MIT License
