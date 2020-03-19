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
      data: {
        node: { isSaved },
      },
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
  if (isSaved)
    unSave({
      variables: { nodeId: prayerID },
      update: (cache) => {
        cache.writeQuery({
          query: GET_PRAYER_SAVE_STATE,
          variables: { nodeId: prayerID },
          data: { node: { __typename: 'Prayer', isSaved: false } },
        });
      },
      refetchQueries: [
        {
          query: GET_PRAYER_COUNT,
          variables: { type: 'SAVED' },
        },
      ],
    });
  else
    save({
      variables: { nodeId: prayerID },
      update: (cache) => {
        cache.writeQuery({
          query: GET_PRAYER_SAVE_STATE,
          variables: { nodeId: prayerID },
          data: { node: { __typename: 'Prayer', isSaved: true } },
        });
      },
      refetchQueries: [
        {
          query: GET_PRAYER_COUNT,
          variables: { type: 'SAVED' },
        },
      ],
    });
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
