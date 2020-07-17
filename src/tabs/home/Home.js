import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { Image } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import PropTypes from 'prop-types';

import {
  ContentCardConnected,
  FeaturesFeedConnected,
} from '@apollosproject/ui-connected';
import { styled, BackgroundView, FeaturedCard } from '@apollosproject/ui-kit';

import LiveButton from '../../ui/LiveButton';

import GET_CAMPAIGN_CONTENT_ITEM from './getCampaignContentItem';

const LogoTitle = styled(({ theme }) => ({
  height: theme.sizing.baseUnit,
  margin: theme.sizing.baseUnit,
  alignSelf: 'center',
  resizeMode: 'contain',
}))(Image);

const CampaignCard = ({ isLive, hasAction, summary, ...props }) => (
  <FeaturedCard
    {...props}
    hasAction={isLive ? false : hasAction}
    summary={isLive ? 'Tap for sermon notes and more' : summary}
  />
);

CampaignCard.propTypes = {
  isLive: PropTypes.bool,
  hasAction: PropTypes.bool,
  summary: PropTypes.string,
};

const LiveButtonConnected = () => (
  <Query query={GET_CAMPAIGN_CONTENT_ITEM} fetchPolicy="cache-and-network">
    {({ data, loading, error }) => {
      if (loading) return null;
      if (error) return null;
      const featuredItem =
        data.campaigns.edges[0].node.childContentItemsConnection.edges[0].node;
      return featuredItem.id ? (
        <LiveButton contentId={featuredItem.id} />
      ) : null;
    }}
  </Query>
);

class Home extends PureComponent {
  static navigationOptions = () => ({
    header: null,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      setParams: PropTypes.func,
      navigate: PropTypes.func,
    }),
  };

  handleOnPress = (item) =>
    this.props.navigation.navigate('ContentSingle', {
      itemId: item.id,
      transitionKey: item.transitionKey,
    });

  handleOnPressActionItem = ({ action, relatedNode }) => {
    if (action === 'READ_CONTENT') {
      this.props.navigation.navigate('ContentSingle', {
        itemId: relatedNode.id,
        transitionKey: 2,
      });
    }
    if (action === 'READ_EVENT') {
      this.props.navigation.navigate('Event', {
        eventId: relatedNode.id,
        transitionKey: 2,
      });
    }
  };

  render() {
    return (
      <BackgroundView>
        <SafeAreaView>
          <FeaturesFeedConnected
            onPressActionItem={this.handleOnPressActionItem}
            ListHeaderComponent={
              <>
                <LogoTitle source={require('./wordmark.png')} />
                <LiveButtonConnected />
              </>
            }
            ListItemComponent={() => <FeaturedCard />}
          />
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default Home;
