import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { get } from 'lodash';

import {
  BackgroundView,
  FeedView,
  TouchableScale,
  DefaultCard,
} from '@apollosproject/ui-kit';
import {
  fetchMoreResolver,
  ContentCardConnected,
  GET_LIKED_CONTENT,
} from '@apollosproject/ui-connected';
import BrandedCard from './BrandedCard';

/** A FeedView wrapped in a query to pull content data. */
class LikedContentFeedConnected extends PureComponent {
  /** Function for React Navigation to set information in the header. */
  static navigationOptions = () => ({
    title: 'Your Likes',
  });

  static propTypes = {
    Component: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func,
      PropTypes.object, // type check for React fragments
    ]),
    /** Functions passed down from React Navigation to use in navigating to/from
     * items in the feed.
     */
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }),
  };

  static defaultProps = {
    Component: FeedView,
  };

  /** Function that is called when a card in the feed is pressed.
   * Takes the user to the ContentSingle
   */
  handleOnPress = (item) =>
    this.props.navigation.navigate('ContentSingle', {
      itemId: item.item.id,
      sharing: item.item.sharing,
    });

  getContent = (data) =>
    get(data, 'likedContent.edges', []).map((edge) => edge.node);

  fetchMore = (data, fetchMore, variables) =>
    fetchMoreResolver({
      collectionName: 'likedContent',
      fetchMore,
      variables,
      data,
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
    const { Component } = this.props;

    return (
      <BackgroundView>
        <Query
          query={GET_LIKED_CONTENT}
          fetchPolicy="cache-and-network"
          variables={{ first: 20 }}
        >
          {({ loading, error, data, refetch, fetchMore, variables }) => (
            <Component
              content={this.getContent(data)}
              isLoading={loading}
              error={error}
              refetch={refetch}
              onPressItem={this.handleOnPress}
              fetchMore={this.fetchMore(data, fetchMore, variables)}
              renderItem={({ item }) => (
                <TouchableScale
                  onPress={() => {
                    this.handleOnPress({ item });
                  }}
                >
                  <ContentCardConnected
                    Component={this.getComponent(item)}
                    contentId={get(item, 'id')}
                    labelText={''}
                  />
                </TouchableScale>
              )}
            />
          )}
        </Query>
      </BackgroundView>
    );
  }
}

export default LikedContentFeedConnected;
