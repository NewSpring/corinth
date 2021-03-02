import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import gql from 'graphql-tag';
import { Query } from '@apollo/client/react/components';

import { styled, BackgroundView } from '@apollosproject/ui-kit';
import {
  FeaturesFeedConnected,
  FEATURE_FEED_ACTION_MAP,
  RockAuthedWebBrowser,
  SearchFeedConnected,
  SearchInputHeader,
} from '@apollosproject/ui-connected';

const HeaderContainer = styled({
  paddingTop: 8,
})(View);

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

const GET_DISCOVER_FEED = gql`
  query GetDiscoverFeed {
    discoverFeedFeatures {
      id
    }
  }
`;

function Home(props) {
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(true);

  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  useEffect(
    () => {
      if (!isFocused && searchText === '') {
        props.navigation.pop();
      }
    },
    [isFocused]
  );

  return (
    <RockAuthedWebBrowser>
      {(openUrl) => (
        <BackgroundView>
          <HeaderContainer>
            <SearchInputHeader
              onChangeText={throttle(setSearchText, 300)}
              onFocus={setIsFocused}
              inputRef={searchRef}
            />
          </HeaderContainer>
          <View>
            {searchText ? (
              <SearchFeedConnected searchText={searchText} />
            ) : (
              <Query query={GET_DISCOVER_FEED} fetchPolicy="cache-and-network">
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
        </BackgroundView>
      )}
    </RockAuthedWebBrowser>
  );
}

Home.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    setParams: PropTypes.func,
    navigate: PropTypes.func,
  }),
};

export default Home;
