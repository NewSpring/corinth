#!/usr/bin/env bash

# overwrites android version code with current date and time
sed -i "" -E "s/versionCode [0-9]+/versionCode $(date -u +"%y%m%d%H%M")/g" android/app/build.gradle
