import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import {
  ContentCardConnected,
  fetchMoreResolver,
} from '@apollosproject/ui-connected';

import {
  BackgroundView,
  FeedView,
  TouchableScale,
  DefaultCard,
} from '@apollosproject/ui-kit';

import BrandedCard from '../ui/BrandedCard';
import GET_CONTENT_FEED from './getContentFeed';
/**
 * This is where the component description lives
 * A FeedView wrapped in a query to pull content data.
 */
class ContentFeed extends PureComponent {
  /** Function for React Navigation to set information in the header. */
  static navigationOptions = ({ navigation }) => {
    const itemTitle = navigation.getParam('itemTitle', 'Content Channel');
    return {
      title: itemTitle,
    };
  };

  static propTypes = {
    /** Functions passed down from React Navigation to use in navigating to/from
     * items in the feed.
     */
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }),
  };

  /** Function that is called when a card in the feed is pressed.
   * Takes the user to the ContentSingle
   */
  handleOnPress = (item) => {
    this.props.navigation.navigate('ContentSingle', {
      itemId: item.id,
      sharing: item.sharing,
    });
  };

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
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', []);
    return (
      <BackgroundView>
        <Query
          query={GET_CONTENT_FEED}
          variables={{ itemId }}
          fetchPolicy="cache-and-network"
        >
          {({ loading, error, data, refetch, fetchMore, variables }) => (
            <FeedView
              content={get(
                data,
                'node.childContentItemsConnection.edges',
                []
              ).map((edge) => edge.node)}
              fetchMore={fetchMoreResolver({
                collectionName: 'node.childContentItemsConnection',
                fetchMore,
                variables,
                data,
              })}
              isLoading={loading}
              error={error}
              refetch={refetch}
              renderItem={({ item }) => (
                <TouchableScale
                  onPress={() => {
                    this.handleOnPress(item);
                  }}
                >
                  <ContentCardConnected
                    Component={this.getComponent(item)}
                    contentId={item.isLoading ? null : get(item, 'id')}
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
      </BackgroundView>
    );
  }
}

export default ContentFeed;
