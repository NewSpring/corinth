#!/usr/bin/env bash
set -ex
brew uninstall node@6
NODE_VERSION="8.11.3"
curl "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}.pkg" > "$HOME/Downloads/node-installer.pkg"
sudo installer -store -pkg "$HOME/Downloads/node-installer.pkg" -target "/"

# Swaps out all placeholder env variables w/ their real values
# Placeholders look like "$ONE_SIGNAL_KEY"
grep -o '\$.*' .env.production | sed 's/\$\(.*\)/\1/' | xargs -I {} sh -c "sed -i -e 's/\$"{}"/'$"{}"'/' .env.production"
# Make sure ReactNativeConfig picks up values from prod env file.
cp .env.production .env

# overwrites android version code with current date and time
sed -i "" -E "s/versionCode [0-9]+/versionCode $(date -u +"%y%m%d%H%M")/g" android/app/build.gradle

echo "Uninstalling all CocoaPods versions"
sudo gem uninstall cocoapods --all --executables

COCOAPODS_VER=`sed -n -e 's/^COCOAPODS: \([0-9.]*\)/\1/p' ios/Podfile.lock`

echo "Installing CocoaPods version $COCOAPODS_VER"
sudo gem install cocoapods -v $COCOAPODS_VER
