import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { Image } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import {
  ContentCardConnected,
  fetchMoreResolver,
} from '@apollosproject/ui-connected';
import {
  styled,
  FeedView,
  BackgroundView,
  TouchableScale,
  DefaultCard,
} from '@apollosproject/ui-kit';

import BrandedCard from '../../ui/BrandedCard';
import LiveButton from '../../ui/LiveButton';

import Features from './Features';
import GET_USER_FEED from './getUserFeed';
import GET_CAMPAIGN_CONTENT_ITEM from './getCampaignContentItem';

const LogoTitle = styled(({ theme }) => ({
  height: theme.sizing.baseUnit,
  margin: theme.sizing.baseUnit,
  alignSelf: 'center',
  resizeMode: 'contain',
}))(Image);

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

  getComponent = (item) => {
    switch (get(item, '__typename')) {
      case 'WeekendContentItem':
      case 'ContentSeriesContentItem':
      case 'DevotionalContentItem':
        return BrandedCard;
      default:
        return DefaultCard;
    }
  };

  render() {
    return (
      <BackgroundView>
        <SafeAreaView>
          <Query
            query={GET_USER_FEED}
            variables={{ first: 10, after: null }}
            fetchPolicy="cache-and-network"
          >
            {({ loading, error, data, refetch, fetchMore, variables }) => (
              <FeedView
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

                        return (
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
                                Component={BrandedCard}
                                contentId={featuredItem.id}
                                isLoading={isFeaturedLoading}
                                labelText={
                                  featuredItem.parentChannel &&
                                  featuredItem.parentChannel.name
                                    .split(' - ')
                                    .pop()
                                }
                              />
                            </TouchableScale>
                          </>
                        );
                      }}
                    </Query>
                    <Features navigation={this.props.navigation} />
                  </>
                }
                onPressItem={this.handleOnPress}
                renderItem={({ item }) => (
                  <TouchableScale
                    onPress={() => this.handleOnPress({ id: item.id })}
                  >
                    <ContentCardConnected
                      Component={this.getComponent(item)}
                      contentId={item.id}
                      isLoading={loading}
                      labelText={
                        item.parentChannel &&
                        item.parentChannel.name.split(' - ').pop()
                      }
                    />
                  </TouchableScale>
                )}
              />
            )}
          </Query>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default Home;
