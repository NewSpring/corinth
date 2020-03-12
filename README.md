# NewSpring Mobile App

[![codecov](https://codecov.io/gh/NewSpring/corinth/branch/develop/graph/badge.svg)](https://codecov.io/gh/NewSpring/corinth)

## Development

Install node modules, install cocoapods, start the bundler

```
yarn restart
```

Start the sims *in separate tabs*

```
yarn ios
yarn android
```

## Release

Run these commands to bump the version numbers and post a Github release.

```
yarn standard-version
git push --follow-tags
yarn gh-release --yes
```
