import React from 'react';

import SafeAreaView from 'react-native-safe-area-view';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { BackgroundView } from '@apollosproject/ui-kit';
import {
  FeaturesFeedConnected,
  FEATURE_FEED_ACTION_MAP,
  RockAuthedWebBrowser,
} from '@apollosproject/ui-connected';

function handleOnPress({ action, ...props }) {
  if (FEATURE_FEED_ACTION_MAP[action]) {
    FEATURE_FEED_ACTION_MAP[action]({ action, ...props });
  }
  // If you add additional actions, you can handle them here.
  // Or add them to the FEATURE_FEED_ACTION_MAP, with the syntax
  // { [ActionName]: function({ relatedNode, action, ...FeatureFeedConnectedProps}) }
}

export const GET_DISCOVER_FEED = gql`
  query getDiscoverFeatureFeed {
    readFeedFeatures {
      id
    }
  }
`;

function Discover({ navigation }) {
  return (
    <RockAuthedWebBrowser>
      {(openUrl) => (
        <BackgroundView>
          <SafeAreaView>
            <Query query={GET_DISCOVER_FEED}>
              {({ data }) => (
                <FeaturesFeedConnected
                  openUrl={openUrl}
                  navigation={navigation}
                  featureFeedId={data?.readFeedFeatures?.id}
                  onPressActionItem={handleOnPress}
                />
              )}
            </Query>
          </SafeAreaView>
        </BackgroundView>
      )}
    </RockAuthedWebBrowser>
  );
}

Discover.navigationOptions = () => ({
  header: null,
});

Discover.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    setParams: PropTypes.func,
    navigate: PropTypes.func,
  }),
};

export default Discover;
