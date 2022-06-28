#!/bin/bash

namespace=$1
public=$2

if [ $public ]; then
  url="public.ecr.aws/$namespace"
else
  url="$namespace.dkr.ecr.us-east-1.amazonaws.com"
fi

# no tests
echo "::set-output name=result::$url"
echo exit 0;
