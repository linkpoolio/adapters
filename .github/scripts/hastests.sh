#!/bin/bash

adapter=$1
type=$2
test=$3

if [ -d ./packages/${type}/${adapter}/test/${test} ]
then
  echo "::set-output name=result::true"
  exit 0;
fi

# no tests
echo "::set-output name=result::false"
echo exit 0;
