import React, { useState, useEffect, useRef } from 'react';
import { Image, Animated, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { throttle } from 'lodash';

import { styled, BackgroundView } from '@apollosproject/ui-kit';
import {
  FeaturesFeedConnected,
  FEATURE_FEED_ACTION_MAP,
  RockAuthedWebBrowser,
  SearchFeedConnected,
  SearchInputHeader,
} from '@apollosproject/ui-connected';

import HomeSearchButton from './HomeSearchButton';

const LogoTitle = styled(({ theme }) => ({
  height: theme.sizing.baseUnit,
  margin: theme.sizing.baseUnit,
  alignSelf: 'center',
  resizeMode: 'contain',
}))(Image);

function handleOnPress({ action, ...props }) {
  if (FEATURE_FEED_ACTION_MAP[action]) {
    FEATURE_FEED_ACTION_MAP[action]({ action, ...props });
  }
  // If you add additional actions, you can handle them here.
  // Or add them to the FEATURE_FEED_ACTION_MAP, with the syntax
  // { [ActionName]: function({ relatedNode, action, ...FeatureFeedConnectedProps}) }
}

// getHomeFeed uses the HOME_FEATURES in the config.yml
// You can also hardcode an ID if you are confident it will never change
// Or use some other strategy to get a FeatureFeed.id
export const GET_HOME_FEED = gql`
  query getHomeFeatureFeed {
    homeFeedFeatures {
      id
    }
  }
`;

const GET_DISCOVER_FEED = gql`
  query GetDiscoverFeed {
    discoverFeedFeatures {
      id
    }
  }
`;

function Home(props) {
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [searchBarHeight, setSearchBarHeight] = useState(100);
  const translateY = useRef(new Animated.Value(-searchBarHeight)).current;

  const searchRef = useRef(null);

  useEffect(
    () => {
      const active = searchText !== '' || isFocused;
      Animated.timing(translateY, {
        toValue: active ? searchBarHeight : -searchBarHeight,
        // these values match the ios spring effect
        duration: 500,
        damping: 500,
        stiffness: 1000,
        mass: 3,
        useNativeDriver: true,
      }).start(() => {
        if (active) {
          searchRef.current.focus();
        }
      });
    },
    [isFocused, searchText, searchBarHeight]
  );

  return (
    <RockAuthedWebBrowser>
      {(openUrl) => (
        <BackgroundView>
          <Animated.View
            style={{ transform: [{ translateY }] }}
            onLayout={({
              nativeEvent: {
                layout: { height },
              },
            }) => setSearchBarHeight(height)}
          >
            <SearchInputHeader
              onChangeText={throttle(setSearchText, 300)}
              onFocus={setIsFocused}
              inputRef={searchRef}
            />
          </Animated.View>
          <SafeAreaView>
            {isFocused || searchText ? (
              <View style={{ marginTop: searchBarHeight }}>
                {searchText ? (
                  <SearchFeedConnected searchText={searchText} />
                ) : (
                  <Query
                    query={GET_DISCOVER_FEED}
                    fetchPolicy="cache-and-network"
                  >
                    {({ data }) => (
                      <FeaturesFeedConnected
                        openUrl={openUrl}
                        navigation={props.navigation}
                        featureFeedId={data?.discoverFeedFeatures?.id}
                        onPressActionItem={handleOnPress}
                      />
                    )}
                  </Query>
                )}
              </View>
            ) : (
              <Query query={GET_HOME_FEED}>
                {({ data }) => (
                  <FeaturesFeedConnected
                    openUrl={openUrl}
                    navigation={props.navigation}
                    featureFeedId={data?.homeFeedFeatures?.id}
                    onPressActionItem={handleOnPress}
                    ListHeaderComponent={
                      <>
                        <LogoTitle source={require('./wordmark.png')} />
                        <HomeSearchButton onPress={() => setIsFocused(true)} />
                      </>
                    }
                  />
                )}
              </Query>
            )}
          </SafeAreaView>
        </BackgroundView>
      )}
    </RockAuthedWebBrowser>
  );
}

Home.navigationOptions = () => ({
  header: null,
});

Home.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    setParams: PropTypes.func,
    navigate: PropTypes.func,
  }),
};

export default Home;
