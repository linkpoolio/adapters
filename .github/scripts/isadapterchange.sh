#!/bin/bash

adapter=$1

# TODO remove these three lines, temporarily added to force override to first-time publish on github registry
echo "This diff contains $adapter adapter src code change."
echo "::set-output name=result::true"
exit 0;

# echo "========== check paths of modified files =========="
filename=$(date +%s)
git diff --name-only HEAD^ HEAD > $filename.txt

while IFS= read -r file
do
  if [[ $file == packages/$adapter/* || $file == packages/$adapter/src/* ]]; then
    echo "This diff contains $adapter adapter src code change."
    echo "::set-output name=result::true"
    exit 0;
  fi
done < $filename.txt
rm $filename.txt

echo "This diff does not contain $adapter adapter src code change."
echo "::set-output name=result::false"
exit 0;
