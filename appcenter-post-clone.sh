#!/usr/bin/env bash

# Swaps out all placeholder env variables w/ their real values
# Placeholders look like "$ONE_SIGNAL_KEY"
grep -o '\$.*' .env.production | sed 's/\$\(.*\)/\1/' | xargs -I {} sh -c "sed -i -e 's/\$"{}"/'$"{}"'/' .env.production"
# Make sure ReactNativeConfig picks up values from prod env file.
cp .env.production .env

# bump code
./scripts/bump-version-code.sh

# set AppCenter secret
sed -i "" -E "s/fake-secret-123/$APPCENTER_SECRET/g" ios/AppCenter-Config.plist
sed -i "" -E "s/fake-secret-123/$APPCENTER_SECRET/g" android/app/src/main/assets/appcenter-config.json

# install cocoapods
echo "Uninstalling all CocoaPods versions"
sudo gem uninstall cocoapods --all --executables

COCOAPODS_VER=$(sed -n -e 's/^COCOAPODS: \([0-9.]*\)/\1/p' ios/Podfile.lock)

echo "Installing CocoaPods version $COCOAPODS_VER"
sudo gem install cocoapods -v "$COCOAPODS_VER"

# upload Bugsnag source maps
VERSION=$(sed -n -E "/\"version\"/s/.* \"(.*)\"\,/\1/p" package.json | sed -n 1p)
VERSION_CODE=$(sed -n "/versionCode/s/.* //p" android/app/build.gradle | sed -n 1p)
BUNDLE_VERSION=$(sed -n -E "/<string>[0-9]+<\/string>/s/<string>(.*)<\/string>/\1/p" ios/newspringchurchapp/Info.plist | sed -n 1p)

# generate and upload for ios
yarn react-native bundle \
    --platform ios \
    --dev false \
    --entry-file index.js \
    --bundle-output ios-release.bundle \
    --sourcemap-output ios-release.bundle.map

curl --http1.1 https://upload.bugsnag.com/react-native-source-map \
   -F apiKey="$BUGSNAG_API_KEY" \
   -F appVersion="$VERSION" \
   -F appBundleVersion="$BUNDLE_VERSION" \
   -F dev=false \
   -F platform=ios \
   -F sourceMap=@ios-release.bundle.map \
   -F bundle=@ios-release.bundle \
   -F projectRoot="$(pwd)"

# generate and upload for android
yarn react-native bundle \
    --platform android \
    --dev false \
    --entry-file index.js \
    --bundle-output android-release.bundle \
    --sourcemap-output android-release.bundle.map

curl --http1.1 https://upload.bugsnag.com/react-native-source-map \
   -F apiKey="$BUGSNAG_API_KEY" \
   -F appVersion="$VERSION" \
   -F appVersionCode="$VERSION_CODE" \
   -F dev=false \
   -F platform=android \
   -F sourceMap=@android-release.bundle.map \
   -F bundle=@android-release.bundle \
   -F projectRoot="$(pwd)"
