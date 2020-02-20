#!/usr/bin/env bash

# overwrites android version code
VERSION_CODE=$(sed -n "/versionCode/s/.* //p" android/app/build.gradle | sed -n 1p)
if [ "$BUGSNAG_STAGE" = "production" ]; then
	# production track - increments by one (has to be less than test track)
	sed -E -i "s/versionCode [0-9]+/versionCode $((VERSION_CODE - 1))/g" android/app/build.gradle
else
	# test track - sets current date and time
	# YYYYDDDmmm - year, day (out of 365), minute of the day (% of 1440)
	# 2020001500 - Jan 1, 2020 at 12pm
	MIN=$(bc <<< "scale=3; ($(date -u +%H) * 60 + $(date -u +%M)) / 1440")
	sed -E -i "s/versionCode [0-9]+/versionCode $(date -u +"%Y%j")${MIN//.}/g" android/app/build.gradle
fi
