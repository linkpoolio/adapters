#!/bin/bash

# echo "========== check paths of modified files =========="
filename=$(date +%s)
git diff --name-only HEAD^ HEAD > $filename.txt
has_generic_adapter_change=0
has_changeset=0

while IFS= read -r file
do
echo $file
if [[ $file == packages/sources/generic/src/* ]]; then
    # echo "This diff contains a generic adapter src code change."
    exit 0;
fi

# echo "This diff does not contain a generic adapter src code change."
exit 1;
