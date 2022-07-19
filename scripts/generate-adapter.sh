#!/bin/bash

prompt() {
  echo "$(tput setaf 4)$1$(tput setaf 7) ($2):"
}

confirm() {
  echo "  - $1: $(tput setaf 3)$2$(tput setaf 7)"
}

sanitizeHyphen() {
  hyphenate=$(echo $1 | tr " " -)
  stripchars=$(echo $hyphenate | sed 's/[^a-zA-Z-]//g')
  lowercase=$(echo $stripchars | tr '[:upper:]' '[:lower:]')
  echo $lowercase
}

sanitize() {
  stripspaces=$(echo $1 | tr " " \t)
  stripchars=$(echo $stripspaces | sed 's/[^a-zA-Z-]//g')
  lowercase=$(echo $stripchars | tr '[:upper:]' '[:lower:]')
  echo $lowercase
}

echo ""
name="Adapter Name"
prompt "$name" "NFL analytics => nfl-analytics"
read NAME
NAME=$(sanitizeHyphen "$NAME")

echo ""
dataProvider="Data Provider Name"
prompt "$dataProvider" "Sportsdata.io => sportsdataio"
read DATA_PROVIDER
DATA_PROVIDER=$(sanitize "$DATA_PROVIDER")

echo ""
endpoint="First Endpoint"
prompt "$endpoint" "/teams/all => teams"
read ENDPOINT
ENDPOINT=$(sanitize "$ENDPOINT")

echo ""
model="First Model"
prompt "$model" "/teams/all: []team => team"
read MODEL
MODEL=$(sanitize "$MODEL")

echo ""
echo "$(tput setaf 4)Confirmation$(tput setaf 7):"
confirm "$name" "$NAME"
confirm "$dataProvider" "$DATA_PROVIDER"
confirm "$endpoint" "$ENDPOINT"
confirm "$model" "$MODEL"
echo ""

prompt "Confirm generate:adapter?" "y/n"
read CONFIRM

if [[ $CONFIRM != "y" ]]; then
  echo ""
  echo "$(tput setaf 3)Gracefully cancelled generate:adapter$(tput setaf 7)"
  echo ""
  exit 1;
fi

echo ""
echo "$(tput setaf 3)Initializing $NAME-adapter$(tput setaf 7)"
echo ""

# Init
cd packages
rm -rf boilerplate/dist
rm -rf boilerplate/node_modules
rm boilerplate/tsconfig.tsbuildinfo
cp -rf boilerplate "$NAME"

# Update Package.json
cd "$NAME"
packageJson=$(cat "./package.json")
node > package.json <<EOF
  let data = $packageJson
  data.name = "@linkpool/$NAME-adapter"
  data.version = "1.0.0"
  data.description = "LinkPool $NAME adapter."
  data.keywords = data.keywords.map((item) => item == "boilerplate" ? "$NAME" : item)
  console.log(JSON.stringify(data, null, 2))
EOF

MODEL_UC=$(perl -ne 'print ucfirst' <<< $MODEL)
ENDPOINT_UC=$(perl -ne 'print ucfirst' <<< $ENDPOINT)

# Clean tests
cd test
rm -rf integration/coinmarketcap
rm integration/coinmarketcap.test.ts
rm unit/market.test.ts
rm integration/coingecko/market.ts
rm -rf integration/__snapshots__
mv integration/coingecko "integration/$DATA_PROVIDER"
mv integration/coingecko.test.ts "integration/$DATA_PROVIDER.test.ts"
mv "integration/$DATA_PROVIDER/coins.ts" "integration/$DATA_PROVIDER/$ENDPOINT.ts"
mv unit/coins.test.ts "unit/$ENDPOINT.test.ts"

echo "export const ${ENDPOINT}Input = {
  id: 1,
  data: {
    endpoint: '$ENDPOINT',
  },
}" > integration/common.ts

echo "import http from 'http'
import process from 'process'
import type { AddressInfo } from 'net'
import request from 'supertest'
import type { SuperTest, Test } from 'supertest'

import { ${ENDPOINT}Tests } from './$DATA_PROVIDER/$ENDPOINT'
import { server as startServer } from '../../src'

let oldEnv: NodeJS.ProcessEnv

export interface SuiteContext {
  server: http.Server
  req: SuperTest<Test>
}

beforeAll(() => {
  oldEnv = JSON.parse(JSON.stringify(process.env))
  process.env.API_VERBOSE = 'true'
  process.env.CACHE_ENABLED = 'false'
  process.env.WARMUP_ENABLED = 'false'
  process.env.API_PROVIDER = '$DATA_PROVIDER'
  process.env.API_KEY = 'fake-api-key'
})

afterAll(() => {
  process.env = oldEnv
})

describe('execute', () => {
  const context: SuiteContext = {
    server: null,
    req: null,
  }

  beforeEach(async () => {
    context.server = await startServer()
    context.req = request(\`localhost:\${(context.server.address() as AddressInfo).port}\`)
  })

  afterEach((done) => {
    context.server.close(done)
  })

  describe('$DATA_PROVIDER - $ENDPOINT endpoint', () => ${ENDPOINT}Tests(context))
})

" > "integration/$DATA_PROVIDER.test.ts"

sed -i -e "s/coins/$ENDPOINT/g" "integration/$DATA_PROVIDER/$ENDPOINT.ts"
sed -i -e "s/Coin/$MODEL_UC/g" "integration/$DATA_PROVIDER/$ENDPOINT.ts"
sed -i -e "s/coingecko/$DATA_PROVIDER/g" "integration/$DATA_PROVIDER/$ENDPOINT.ts"
rm "integration/$DATA_PROVIDER/$ENDPOINT.ts-e"

echo "import nock from 'nock'

// TODO: declare api baseUrls for all providers in easily exportable object
const url = 'https://pro-api.coingecko.com/api/v3'

const $ENDPOINT = [
  {
    id: 1,
    name: 'fake-$MODEL-1',
  },
  {
    id: 2,
    name: 'fake-$MODEL-2',
  },
  {
    id: 3,
    name: 'fake-$MODEL-3',
  },
]

export const mock${MODEL_UC}Success = (): nock => {
  return nock(url).get(\`/$ENDPOINT/list?x_cg_pro_api_key=\${process.env.API_KEY}\`).reply(200, {
    data: $ENDPOINT,
  })
}
" > "integration/$DATA_PROVIDER/fixtures.ts"
sed -i -e "s/coins/$ENDPOINT/g" "unit/$ENDPOINT.test.ts"
rm "unit/$ENDPOINT.test.ts-e"

# Clean api
cd ../src/api
rm -rf coinmarketcap
mv coingecko/coins.ts "coingecko/$ENDPOINT.ts"
mv coingecko "$DATA_PROVIDER"

echo "import { AdapterError, util } from '@chainlink/ea-bootstrap'
import { Config } from '@chainlink/types'

import $DATA_PROVIDER from './$DATA_PROVIDER'

export default (config: Config) => {
  const provider = util.getEnv('API_PROVIDER')

  switch (provider) {
    case '$DATA_PROVIDER':
      return $DATA_PROVIDER(config)
    default:
      throw new AdapterError({
        statusCode: 200,
        message: 'Data provider not specified',
        cause: 'Data provider not specified',
      })
  }
}
" > index.ts

echo "import { I$MODEL_UC } from '../models/$MODEL'

export interface I$ENDPOINT_UC {
  list: () => Promise<I$MODEL_UC[]>
}

export interface Base {
  $ENDPOINT: I$ENDPOINT_UC
}
" > base.ts

sed -i -e "s/coins/$ENDPOINT/g" "$DATA_PROVIDER/index.ts"
rm "$DATA_PROVIDER/index.ts-e"

echo "import { I$ENDPOINT_UC } from '../base'
import $MODEL_UC, { I$MODEL_UC } from '../../models/$MODEL'

const provider = '$DATA_PROVIDER'

export default (fetch): I$ENDPOINT_UC => ({
  list: async (): Promise<I$MODEL_UC[]> => {
    const response = await fetch({ url: '$ENDPOINT/list' })
    const data = response?.data?.length ? response.data : []
    return $MODEL_UC.List(data, provider)
  },
})
" > "$DATA_PROVIDER/$ENDPOINT.ts"


# Clean config
cd ../config
NAME_UC=$(echo $NAME | tr '[:lower:]' '[:upper:]')
sed -i -e "s/BOILERPLATE/$NAME_UC/g" index.ts
sed -i -e "s/coins/$ENDPOINT/g" index.ts
rm index.ts-e

# Clean controllers
cd ../controllers
rm -rf market
mv coins "$ENDPOINT"
echo "export * as $ENDPOINT from './$ENDPOINT'" > index.ts
sed -i -e "s/coins/$ENDPOINT/g" "$ENDPOINT/index.ts"
sed -i -e "s/coins/$ENDPOINT/g" "$ENDPOINT/controller.ts"
rm "$ENDPOINT/controller.ts-e"
rm "$ENDPOINT/index.ts-e"

# Clean models
cd ../models
rm market.ts
mv coin.ts "$MODEL.ts"
echo "export interface I$MODEL_UC {
  id: number
  name: string
}

const transformer = {
  $DATA_PROVIDER: ($MODEL): I$MODEL_UC => ({
    id: $MODEL.id,
    name: $MODEL.name,
  }),
}

const Single = ($MODEL: any, provider): I$MODEL_UC => transformer[provider]($MODEL)

const List = (data: any, provider): I$MODEL_UC[] => data.map(($MODEL: any) => Single($MODEL, provider))

export default {
  Single,
  List,
}
" > "$MODEL.ts"

# Clean README.md
cd ../../
echo "## $NAME Adapter" > README.md
sed -i -e "s/boilerplate/$NAME/g" schemas/env.json
sed -i -e "s/Boilerplate/$NAME/g" schemas/env.json
rm schemas/env.json-e

# Setup tscsonfig.json
cd ../
tsconfigJson=$(cat "./tsconfig.json")
node > tsconfig.json <<EOF
  let data = $tsconfigJson
  data.references.push({
    "path": "./$NAME"
  })
  console.log(JSON.stringify(data, null, 2))
EOF

# Yarn
cd ../
yarn install
yarn format:fix

echo ""
echo "$(tput setaf 4)$NAME-adapter initialized$(tput setaf 7) ($2)"
echo ""
