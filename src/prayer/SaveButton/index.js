import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { AnalyticsConsumer } from '@apollosproject/ui-analytics';
import GET_PRAYER_FEED from '../data/queries/getPrayerFeed';
import SAVE_PRAYER from '../data/mutations/savePrayer';
import UNSAVE_PRAYER from '../data/mutations/unSavePrayer';
import prayerFragment from '../data/fragments/prayerFragment';
import SaveButton from './SaveButton';

const GET_PRAYER = gql`
  query GetPrayer($id: String) {
    node(id: $id) {
      ...prayerFragment
    }
  }
  ${prayerFragment}
`;

const SaveButtonConnected = memo(({ prayerID }) => {
  const toggleSaved = async (cache) => {
    const { node } = await cache.readQuery({
      query: GET_PRAYER,
      variables: { id: prayerID },
    });
    cache.writeQuery({
      query: GET_PRAYER,
      variables: { id: prayerID },
      data: { node: { ...node, isSaved: node.isSaved } },
    });
  };
  return (
    <Query query={GET_PRAYER} variables={{ id: prayerID }}>
      {({ data: { node = { isSaved: false } } }) => (
        <Mutation mutation={SAVE_PRAYER}>
          {(save) => (
            <Mutation mutation={UNSAVE_PRAYER}>
              {(unSave) => (
                <AnalyticsConsumer>
                  {({ track }) => (
                    <SaveButton
                      saved={node.isSaved}
                      onPress={() => {
                        if (node.isSaved)
                          unSave({
                            variables: { nodeId: prayerID },
                            optimisticResponse: {
                              unSavePrayer: { ...node, isSaved: false },
                            },
                            update: toggleSaved,
                            refetchQueries: [
                              {
                                query: GET_PRAYER_FEED,
                                variables: {
                                  type: 'SAVED',
                                  first: 1,
                                  after: null,
                                },
                              },
                            ],
                          });
                        else
                          save({
                            variables: { nodeId: prayerID },
                            optimisticResponse: {
                              savePrayer: { ...node, isSaved: true },
                            },
                            update: toggleSaved,
                            refetchQueries: [
                              {
                                query: GET_PRAYER_FEED,
                                variables: {
                                  type: 'SAVED',
                                  first: 1,
                                  after: null,
                                },
                              },
                            ],
                          });
                        track({
                          eventName: node.isSaved
                            ? 'Unsaved Prayer'
                            : 'Saved Prayer',
                        });
                      }}
                    />
                  )}
                </AnalyticsConsumer>
              )}
            </Mutation>
          )}
        </Mutation>
      )}
    </Query>
  );
});

SaveButtonConnected.propTypes = {
  prayerID: PropTypes.string,
};

SaveButtonConnected.displayName = 'SaveButtonConnected';

export default SaveButtonConnected;
