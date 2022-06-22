#!/bin/bash

adapter=$1
test=$2

if [ -d ./packages/${adapter}/test/${test} ]
then
  echo "::set-output name=result::true"
  exit 0;
fi

# no tests
echo "::set-output name=result::false"
echo exit 0;
