#!/usr/bin/env bash

# overwrites version code
# YYYYDDDmmm - year, day (out of 365), minute of the day (% of 1440)
# 2020001500 - Jan 1, 2020 at 12pm
MIN=$(bc <<< "scale=3; ($(date -u +%H) * 60 + $(date -u +%M)) / 1440")
CODE=$(date -u +"%Y%j")${MIN//.}
sed -i.bak -E "s/versionCode [0-9]+/versionCode $CODE/g" android/app/build.gradle
sed -i.bak -E "s/<string>[0-9]+<\/string>/<string>$CODE<\/string>/g" ios/newspringchurchapp/Info.plist
