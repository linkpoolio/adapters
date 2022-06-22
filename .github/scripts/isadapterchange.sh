#!/bin/bash

adapter=$1

# echo "========== check paths of modified files =========="
filename=$(date +%s)
git diff --name-only HEAD^ HEAD > $filename.txt
has_generic_adapter_change=0
has_changeset=0

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
