cd ios
# check cocoapods version
MY_VERSION=$(pod --version)
PODFILE_TEXT=$(sed -n /COCOAPODS/p Podfile.lock)
MASTER_VERSION=${PODFILE_TEXT#"COCOAPODS: "}
if [[ $MY_VERSION != $MASTER_VERSION ]]; then
	echo "Cocoapods version mismatch. Install version $MASTER_VERSION."
	exit 1
fi
# update repo and install pods
pod install --repo-update
