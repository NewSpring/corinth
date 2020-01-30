import React from 'react';
import { withProps } from 'recompose';
import { withNavigation } from 'react-navigation';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { FeedView, TouchableScale } from '@apollosproject/ui-kit';

import { ContentCardConnected } from '@apollosproject/ui-connected';

import BrandedCard from '../../../ui/BrandedCard';

import GET_SEARCH_RESULTS from './getSearchResults';
import NoResults from './NoResults';

// this could be refactored into a custom effect hook 💥
const StyledFeedView = withProps(({ hasContent }) => ({
  contentContainerStyle: {
    ...(hasContent ? {} : { flex: 1 }),
  },
}))(FeedView);

const handleOnPress = ({ navigation, item }) =>
  navigation.navigate('ContentSingle', {
    itemId: item.node.id,
    transitionKey: item.transitionKey,
  });

const keyExtractor = (item) => item && get(item, 'node.id', null);

const SearchFeed = withNavigation(({ navigation, searchText }) => (
  <Query
    query={GET_SEARCH_RESULTS}
    variables={{ searchText }}
    fetchPolicy="cache-and-network"
  >
    {({ loading, error, data, refetch }) => (
      <StyledFeedView
        content={get(data, 'search.edges', [])}
        ListEmptyComponent={() => <NoResults searchText={searchText} />}
        hasContent={get(data, 'search.edges', []).length}
        isLoading={loading}
        error={error}
        refetch={refetch}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => (
          <TouchableScale
            onPress={() => {
              handleOnPress({ navigation, item });
            }}
          >
            <ContentCardConnected
              Component={BrandedCard}
              contentId={item.node.id}
            />
          </TouchableScale>
        )}
      />
    )}
  </Query>
));

SearchFeed.propTypes = {
  searchText: PropTypes.string,
};

export default SearchFeed;
