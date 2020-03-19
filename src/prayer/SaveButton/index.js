import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { AnalyticsConsumer } from '@apollosproject/ui-analytics';
import SAVE_PRAYER from '../data/mutations/savePrayer';
import UNSAVE_PRAYER from '../data/mutations/unSavePrayer';
import GET_PRAYER_COUNT from '../data/queries/getPrayerCount';
import GET_PRAYER_SAVE_STATE from '../data/queries/getPrayerSaveState';
import SaveButton from './SaveButton';

const GetPrayerSaveState = ({ children, prayerID }) => (
  <Query query={GET_PRAYER_SAVE_STATE} variables={{ nodeId: prayerID }}>
    {({
      data: { node: { isSaved } } = { node: { isSaved: false } },
      loading,
      error,
    }) => children({ isSaved: loading || error ? false : isSaved })}
  </Query>
);

GetPrayerSaveState.propTypes = {
  prayerID: PropTypes.string,
  children: PropTypes.func.isRequired,
};

const handlePress = (prayerID, isSaved, save, unSave, track) => {
  const getUpdateArgs = (saved) => ({
    variables: { nodeId: prayerID },
    update: async (cache) => {
      const { node } = await cache.readQuery({
        query: GET_PRAYER_SAVE_STATE,
        variables: { nodeId: prayerID },
      });
      cache.writeQuery({
        query: GET_PRAYER_SAVE_STATE,
        variables: { nodeId: prayerID },
        data: {
          node: { __typename: 'Prayer', id: prayerID, isSaved: node.isSaved },
        },
      });
    },
    optimisticResponse: {
      unSavePrayer: { __typename: 'Prayer', id: prayerID, isSaved: saved },
    },
    refetchQueries: [
      {
        query: GET_PRAYER_COUNT,
        variables: { type: 'SAVED' },
      },
    ],
  });
  if (isSaved) unSave(getUpdateArgs(false));
  else save(getUpdateArgs(true));
  track({
    eventName: isSaved ? 'Unsaved Prayer' : 'Saved Prayer',
  });
};

const SaveButtonConnected = memo(({ prayerID }) => (
  <GetPrayerSaveState prayerID={prayerID}>
    {({ isSaved }) => (
      <Mutation mutation={SAVE_PRAYER}>
        {(save) => (
          <Mutation mutation={UNSAVE_PRAYER}>
            {(unSave) => (
              <AnalyticsConsumer>
                {({ track }) => (
                  <SaveButton
                    saved={isSaved}
                    onPress={() =>
                      handlePress(prayerID, isSaved, save, unSave, track)
                    }
                  />
                )}
              </AnalyticsConsumer>
            )}
          </Mutation>
        )}
      </Mutation>
    )}
  </GetPrayerSaveState>
));

SaveButtonConnected.propTypes = {
  prayerID: PropTypes.string,
};

SaveButtonConnected.displayName = 'SaveButtonConnected';

export default SaveButtonConnected;
