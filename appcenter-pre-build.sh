#!/usr/bin/env bash


cd ios
pod install --repo-update

cd ../../
yarn
yarn lerna run generate-stories
