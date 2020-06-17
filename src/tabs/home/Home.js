import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { Image } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import {
  ContentCardConnected,
  fetchMoreResolver,
  LiveConsumer,
} from '@apollosproject/ui-connected';
import {
  styled,
  FeedView,
  BackgroundView,
  TouchableScale,
  FeaturedCard,
  withTheme,
  CardLabel,
} from '@apollosproject/ui-kit';

import LiveButton from '../../ui/LiveButton';
import LiveIcon from '../../ui/LiveIcon';

import Features from './Features';
import GET_USER_FEED from './getUserFeed';
import GET_CAMPAIGN_CONTENT_ITEM from './getCampaignContentItem';

const LogoTitle = styled(({ theme }) => ({
  height: theme.sizing.baseUnit,
  margin: theme.sizing.baseUnit,
  alignSelf: 'center',
  resizeMode: 'contain',
}))(Image);

const CampaignLabel = withTheme(({ isLoading, isLive, title, theme }) => ({
  title: isLive ? 'Live' : title,
  IconComponent: isLive ? LiveIcon : null,
  style: isLoading
    ? {}
    : {
        marginBottom: theme.sizing.baseUnit,
      },
}))(CardLabel);

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
          <Query
            query={GET_USER_FEED}
            variables={{
              first: 10,
              after: null,
            }}
            fetchPolicy="cache-and-network"
          >
            {({ loading, error, data, refetch, fetchMore, variables }) => (
              <FeedView
                ListItemComponent={({ ...item }) => (
                  <ContentCardConnected
                    labelText={
                      item.parentChannel &&
                      item.parentChannel.name.split(' - ').pop()
                    }
                    {...item}
                  />
                )}
                content={get(data, 'userFeed.edges', []).map(
                  (edge) => edge.node
                )}
                fetchMore={fetchMoreResolver({
                  collectionName: 'userFeed',
                  fetchMore,
                  variables,
                  data,
                })}
                isLoading={loading}
                error={error}
                refetch={refetch}
                ListHeaderComponent={
                  <>
                    <LogoTitle source={require('./wordmark.png')} />
                    <Query
                      query={GET_CAMPAIGN_CONTENT_ITEM}
                      fetchPolicy="cache-and-network"
                    >
                      {({ data: featuredData, loading: isFeaturedLoading }) => {
                        const featuredContent = get(
                          featuredData,
                          'campaigns.edges',
                          []
                        ).map((edge) => edge.node);

                        const featuredItem = get(
                          featuredContent[0],
                          'childContentItemsConnection.edges[0].node',
                          {}
                        );

                        return featuredItem.id ? (
                          <>
                            <LiveButton contentId={featuredItem.id} />
                            <TouchableScale
                              onPress={() =>
                                this.handleOnPress({
                                  id: featuredItem.id,
                                })
                              }
                            >
                              <ContentCardConnected
                                Component={CampaignCard}
                                contentId={featuredItem.id}
                                isLoading={isFeaturedLoading}
                                LabelComponent={
                                  <LiveConsumer contentId={featuredItem.id}>
                                    {(liveStream) => (
                                      <CampaignLabel
                                        title={
                                          featuredItem.parentChannel &&
                                          featuredItem.parentChannel.name
                                            .split(' - ')
                                            .pop()
                                        }
                                        isLive={!!liveStream}
                                        isLoading={isFeaturedLoading}
                                      />
                                    )}
                                  </LiveConsumer>
                                }
                              />
                            </TouchableScale>
                          </>
                        ) : null;
                      }}
                    </Query>
                    <Features navigation={this.props.navigation} />
                  </>
                }
                onPressItem={this.handleOnPress}
              />
            )}
          </Query>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default Home;
