import React, { Component } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { Query } from 'react-apollo';

import {
  HorizontalTileFeed,
  TouchableScale,
  PaddedView,
  H5,
} from '@apollosproject/ui-kit';

import {
  HorizontalContentCardConnected,
  GET_CONTENT_SERIES,
} from '@apollosproject/ui-connected';

const loadingStateObject = {
  node: {
    id: 'fakeId0',
    title: '',
    coverImage: '',
    isLoading: true,
    parentChannel: {
      name: '',
    },
    // We need to assume a typename so HorizontalContentCardConnected knows what "type" to render
    __typename: 'MediaContentItem',
  },
};

class HorizontalContentSeriesFeedConnected extends Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    Component: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func,
      PropTypes.object, // type check for React fragments
    ]),
    contentId: PropTypes.string,
    navigation: PropTypes.shape({
      push: PropTypes.func,
    }),
    renderItem: PropTypes.func,
  };

  static defaultProps = {
    Component: HorizontalTileFeed,
  };

  renderItem = ({ item }) => {
    const disabled = get(item, 'id', '') === this.props.contentId;
    const isLoading = get(item.node, 'isLoading');

    return (
      <TouchableScale
        onPress={() => this.handleOnPressItem(item)}
        disabled={isLoading || disabled}
      >
        <HorizontalContentCardConnected
          Component={({ coverImage, ...props }) => {
            switch (get(item, '__typename')) {
              case 'WeekendContentItem':
                return (
                  <HorizontalContentCardConnected.defaultProps.Component
                    coverImage={
                      item.videos.length
                        ? item.videos[0].thumbnail.sources
                        : null
                    }
                    {...props}
                  />
                );
              default:
                return (
                  <HorizontalContentCardConnected.defaultProps.Component
                    coverImage={null}
                    {...props}
                  />
                );
            }
          }}
          labelText={''}
          contentId={get(item, 'id', '')}
          disabled={disabled}
          isLoading={isLoading}
          __typename={get(item, '__typename')}
        />
      </TouchableScale>
    );
  };

  handleOnPressItem = (item) => {
    this.props.navigation.push('ContentSingle', {
      itemId: item.id,
    });
  };

  renderFeed = ({ data, loading, error, fetchMore }) => {
    if (error) return null;

    const children = get(data, 'node.childContentItemsConnection.edges', []);
    const siblings = get(data, 'node.siblingContentItemsConnection.edges', []);
    const isParent = children.length > 0;

    const edges = isParent ? children : siblings;
    const content = edges.map((edge) => edge.node);
    const { cursor } = edges.length && edges[edges.length - 1];
    const currentIndex = content.findIndex(
      ({ id }) => id === this.props.contentId
    );
    const initialScrollIndex = currentIndex === -1 ? 0 : currentIndex;

    return (
      <PaddedView horizontal={false}>
        <PaddedView vertical={false}>
          <H5>In this series</H5>
        </PaddedView>
        <this.props.Component
          isLoading={loading}
          content={content}
          loadingStateObject={loadingStateObject}
          renderItem={this.props.renderItem || this.renderItem}
          initialScrollIndex={initialScrollIndex}
          getItemLayout={(itemData, index) => ({
            // We need to pass this function so that initialScrollIndex will work.
            length: 240,
            offset: 240 * index,
            index,
          })}
          onEndReached={() =>
            !loading &&
            fetchMore({
              query: GET_CONTENT_SERIES,
              variables: { cursor, itemId: this.props.contentId },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                const connection = isParent
                  ? 'childContentItemsConnection'
                  : 'siblingContentItemsConnection';
                const newEdges =
                  get(fetchMoreResult, `node.${connection}.edges`) || [];

                return {
                  node: {
                    ...previousResult.node,
                    [connection]: {
                      ...previousResult.node[connection],
                      edges: [...edges, ...newEdges],
                    },
                  },
                };
              },
            })
          }
        />
      </PaddedView>
    );
  };

  render() {
    if (!this.props.contentId) return this.renderFeed({ loading: true });

    return (
      <Query
        query={GET_CONTENT_SERIES}
        variables={{ itemId: this.props.contentId }}
      >
        {this.renderFeed}
      </Query>
    );
  }
}

export default withNavigation(HorizontalContentSeriesFeedConnected);
