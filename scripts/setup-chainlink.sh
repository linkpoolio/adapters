#!/bin/bash

success=()
warnings=()

info() {
  echo ""
  echo "🔵 $(tput setaf 6)$1$(tput setaf 7)"
  echo ""
}

# Pre-requisite: clean git working tree
gitstatus=$(git status | awk 'NR==2')
if [[ $gitstatus != "nothing to commit, working tree clean" ]]; then
  echo "$(tput setaf 3)⚠️  It is recommended to run this script with a clean git working tree$(tput setaf 7)"
  # exit 1
fi


# Setup:
info "Cloning @smartcontract/external-adapters-js to setup-chainlink.tmp directory"

# Clone repo and fetch tags
git clone "https://github.com/smartcontractkit/external-adapters-js" setup-chainlink.tmp
cd setup-chainlink.tmp
git fetch --all
cd ..

# Step 1: Prepare .chainlink version for each package.json
versions=()

info "Update ./packages/*/package.json with specified .chainlink version and bootstrap/schema/env.json"

for path in ./packages/*/
do
  # If .chainlink doesn't exist, continue loop
  if [[ ! -f "$path.chainlink" ]]; then
    continue
  fi

  # Get version, add to versions array
  version=$(cat "$path.chainlink")
  nextVersion="${version%$'\n'}"
  versions+=($nextVersion)

  # Get package.json
  packageJsonPath="${path}package.json"
  packageJson=$(cat $packageJsonPath)

  # Generate new package.json that replaces "workspace" references to local references
  node > package.json.tmp <<EOF
    let data = $packageJson

    const libraries = [
      {
        key: "@chainlink/ea-bootstrap",
        value: "file:../../vendor/${nextVersion}/bootstrap",
      },
      {
        key: "@chainlink/ea-factories",
        value: "file:../../vendor/${nextVersion}/factories",
      },
      {
        key: "@chainlink/ea-test-helpers",
        value: "file:../../vendor/${nextVersion}/test-helpers",
      },
      {
        key: "@chainlink/types",
        value: "file:../../vendor/${nextVersion}/types/@chainlink",
      },
      {
        key: "@types/chainlink__ea-bootstrap",
        value: "file:../../vendor/${nextVersion}/bootstrap",
      },
    ]

    libraries.map(({ key, value }) => {
      if (data.dependencies && data.dependencies[key]) {
        data.dependencies[key] = value
      }
      if (data.devDependencies && data.devDependencies[key]) {
        data.devDependencies[key] = value
      }
    })

    // write to stdout which is piped to package.json.tmp
    console.log(JSON.stringify(data, null, 2))
EOF
  # Log success if package.json is to be changed
  nextPackageJSON=$(cat package.json.tmp)
  if [[ ! "$packageJson" == "$nextPackageJSON" ]]; then
    success+=("Updated package:$path to version:$nextVersion")
  fi

  # Update the package.json path with the new version
  cp package.json.tmp $packageJsonPath

  # Cleanup
  rm package.json.tmp

  # Copy bootstrap/schemas/env.json to package
  cd setup-chainlink.tmp
  git -c advice.detachedHead=false checkout tags/$nextVersion
  cd ..
  cp "./setup-chainlink.tmp/packages/core/bootstrap/schemas/env.json" "$path/env.bootstrap.json"
done

# Step 2: Setup local vendor directory with .chainlink versions

# Re-initialize vendor dir
rm -rf vendor
mkdir vendor

# Define Chainlink Core Packages to include
libraries=(
  "bootstrap"
  "test-helpers"
  "factories"
  "types"
)

cd setup-chainlink.tmp

# Install .chainlink versions to vendor
for version in "${versions[@]}"
do
  # Setup vendor version
  vendor="../vendor/$version"

  # If vendor  version exists, continue
  if [[ -d $vendor ]]; then
    continue
  fi

  info "Checkout version ${version}"

  # Checkout tag branch ,disabled detached head warning
  git -c advice.detachedHead=false checkout tags/$version

  info "yarn install"

  yarn

  info "yarn setup"

  yarn setup

  mkdir $vendor

  success+=("Installed vendor/$version")

  # Install libs to specified version
  for library in "${libraries[@]}"
  do
    # Libraries other than "types" requires building, which needs to be done in the context of the CL Monorepo
    if [[ $library != "types" ]]; then
      cd "./packages/core/$library"
      info "yarn build ($version:packages/core/$library)"
      yarn build
      cd ../../../
    fi

    # Set path for new vendor directory
    path="$vendor/$library"
    mkdir $path

    # Copy deps and set path for package.json
    if [[ $library != "types" ]]; then
      packageJsonPath="${path}/package.json"

      cp "./packages/core/$library/package.json" $packageJsonPath
      cp -rf "./packages/core/$library/dist" "$path/dist"
    else
      packageJsonPath="${path}/@chainlink/package.json"

      mkdir "$path/@chainlink"
      cp "./packages/core/$library/@chainlink/package.json" $packageJsonPath
      cp "./packages/core/$library/@chainlink/index.d.ts" "$path/@chainlink/index.d.ts"
    fi

    packageJson=$(cat "$packageJsonPath")

    #Generate new package.json that replaces "workspace" references to local references
    node > package.json.tmp <<EOF
      let data = $packageJson

      const libraries = [
        {
          key: "@chainlink/ea-bootstrap",
          value: "file:../bootstrap",
        },
        {
          key: "@chainlink/ea-factories",
          value: "file:../factories",
        },
        {
          key: "@chainlink/ea-test-helpers",
          value: "file:../test-helpers",
        },
        {
          key: "@chainlink/types",
          value: "file:../types/@chainlink",
        },
      ]

      libraries.map(({ key, value }) => {
        if (data.dependencies && data.dependencies[key]) {
          data.dependencies[key] = value
        }
        if (data.devDependencies && data.devDependencies[key]) {
          data.devDependencies[key] = value
        }
      })

      // write to stdout which is piped to package.json.tmp
      console.log(JSON.stringify(data, null, 2))
EOF
    # Update the package.json path with the new version
    cp package.json.tmp $packageJsonPath

    info "Convert workspace deps to local deps for $packageJsonPath"

    # Cleanup
    rm package.json.tmp

    # Generate warning for any @chainlink libs that are not explicitly installed by this script
    node > warning.tmp <<EOF
      let data = $packageJson

      const validLibraries = [
        "@chainlink/ea-bootstrap",
        "@chainlink/ea-factories",
        "@chainlink/ea-test-helpers",
        "@chainlink/types",
      ]

      let deps = []
      if (data.dependencies) deps = [ ...deps, ...Object.keys(data.dependencies)]
      if (data.devDependencies) deps = [ ...deps, ...Object.keys(data.devDependencies)]

      deps.map((dep) => {
        const isChainlinkDep = dep.includes("@chainlink")
        if (isChainlinkDep && !validLibraries.includes(dep)) {
          const string = dep.trim()
          if (string != "") console.log(dep)
        }
      })
EOF

    # Save warning string to var
    warning=$(cat warning.tmp)

    # Cleanup
    rm warning.tmp

    # Save warning string to array (split by new lines)
    IFS=$'\n' read -r -d '' -a tmpWarnings <<< "$warning"

    # Loop over temporary array and add to global warning array
    for warning in "${tmpWarnings[@]}"
    do
      # Save warning if not empty
      if [[ -n $warning ]]; then
        warnings+=($warning)
      fi
    done
  done
done

# Cleanup
cd ../
rm -rf setup-chainlink.tmp

# Print Summary
echo ""
echo ""
echo ""
echo "🎉 Setup Complete"
echo ""

echo ""
echo "$(tput setaf 2)✅ Updates$(tput setaf 7)"

if [[ "${#success[@]}" == 0 ]]; then
  echo "  - N/A"
else
  for message in "${success[@]}"
  do
    echo "  - $message"
  done
fi

if [[ ! "${#warnings[@]}" == 0 ]]; then
  echo ""
  echo "$(tput setaf 3)⚠️  Warnings$(tput setaf 7)"
  for message in "${warnings[@]}"
  do
    echo "  - $message"
  done
fi

echo ""
echo "$(tput setaf 4)🛠  Next steps$(tput setaf 7)"
echo "  - yarn install"
echo "  - yarn setup"
if [[ ! "${#warnings[@]}" == 0 ]]; then
  echo "  - investigate and resolve warnings"
fi
echo "  - commit changes"
echo ""

exit 0
