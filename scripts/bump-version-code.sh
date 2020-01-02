#!/usr/bin/env bash

# overwrites android version code
# test track - sets current date and time
# production track - increments by one (has to be less than test track)
VERSION_CODE=$(sed -n -e 's/versionCode \([0-9]+\)/\1/p' android/app/build.gradle)
echo $VERSION_CODE
if [ "$BUGSNAG_STAGE" = "production" ]; then
	sed -i "" -E "s/versionCode [0-9]+/versionCode $((VERSION_CODE + 1))/g" android/app/build.gradle
else
	sed -i "" -E "s/versionCode [0-9]+/versionCode $(date -u +"%y%m%d%H%M")/g" android/app/build.gradle
fi
