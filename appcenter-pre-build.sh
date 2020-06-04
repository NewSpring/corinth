#!/usr/bin/env bash

# bump version codes
# YYYYDDDmmm - year, day (out of 365), minute of the day (% of 1440)
# 2020001500 - Jan 1, 2020 at 12pm
MIN=$(bc <<< "scale=3; ($(date -u +%H) * 60 + $(date -u +%M)) / 1440")
CODE=$(date -u +"%Y%j")${MIN//.}
sed -i.bak -E "s/versionCode [0-9]+/versionCode $CODE/g" android/app/build.gradle
sed -i.bak -E "s/<string>[0-9]+<\/string>/<string>$CODE<\/string>/g" ios/newspringchurchapp/Info.plist

# get app version
VERSION=$(sed -n -E "/\"version\"/s/.* \"(.*)\"\,/\1/p" package.json | sed -n 1p)

# generate and upload source maps for ios
yarn react-native bundle \
    --platform ios \
    --dev false \
    --entry-file index.js \
    --bundle-output ios-release.bundle \
    --sourcemap-output ios-release.bundle.map

curl --http1.1 https://upload.bugsnag.com/react-native-source-map \
   -F apiKey="$BUGSNAG_API_KEY" \
   -F appVersion="$VERSION" \
   -F appBundleVersion="$CODE" \
   -F dev=false \
   -F platform=ios \
   -F sourceMap=@ios-release.bundle.map \
   -F bundle=@ios-release.bundle \
   -F projectRoot="$(pwd)"

# generate and upload source maps for android
yarn react-native bundle \
    --platform android \
    --dev false \
    --entry-file index.js \
    --bundle-output android-release.bundle \
    --sourcemap-output android-release.bundle.map

curl --http1.1 https://upload.bugsnag.com/react-native-source-map \
   -F apiKey="$BUGSNAG_API_KEY" \
   -F appVersion="$VERSION" \
   -F appVersionCode="$CODE" \
   -F dev=false \
   -F platform=android \
   -F sourceMap=@android-release.bundle.map \
   -F bundle=@android-release.bundle \
   -F projectRoot="$(pwd)"
