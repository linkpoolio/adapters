#!/bin/bash

namespace=$1
public=$2

if [[ $public = true ]]; then
  registry="public.ecr.aws"
  url="$registry/$namespace"
else
  registry="$namespace.dkr.ecr.us-east-1.amazonaws.com"
  url="$registry"
fi

# no tests
echo "::set-output name=registry::$registry"
echo "::set-output name=url::$url"
echo exit 0;
