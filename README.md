# NewSpring Mobile App

[![codecov](https://codecov.io/gh/NewSpring/corinth/branch/develop/graph/badge.svg)](https://codecov.io/gh/NewSpring/corinth)

## Develop

Install tools necessary

- [XCode](https://developer.apple.com/xcode/)
- [Android Studio](https://developer.android.com/studio)
- [Cocoapods](https://cocoapods.org/)
- [Yarn](https://yarnpkg.com/)

Set environment variables

```
# .env file
APP_DATA_URL=https://apollos-ns-production-herokuapp-com.global.ssl.fastly.net
AMPLITUDE_API_KEY=doesntmatter
BUGSNAG_API_KEY=doesntmatter
```

Install node modules, install cocoapods, start the bundler

```
yarn restart
```

Start the sims _in separate tabs_

```
yarn ios
yarn android
```

## Contribute

When you're ready to submit work for review, [add a PR](https://github.com/NewSpring/corinth/pull/new/master) pointed to the `master` branch. We adhere to [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) branch naming, mostly so our changelog can be automated. Your PR title needs to be in the following format:

`[feat|fix|chore|perf]: A Concise, Easily Understood Titlecased PR Name`

The first part tells our magic changelog fairies what to do with the commit. The name should be understood by non-technical people. Specifically so our product owners and customer support team can find it when they're hunting for completed bug fixes.

Once you feel good about the work and you've added screenshots, GIFs, and test coverage, add a "ready for review" label to the PR and assign someone for code review and approval.

## Release

Run these commands to bump the version numbers and post a Github release.

```
yarn standard-version
git push --follow-tags
yarn gh-release --yes
```
