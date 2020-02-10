import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { AnalyticsConsumer } from '@apollosproject/ui-analytics';
import SAVE_PRAYER from '../data/mutations/savePrayer';
import UNSAVE_PRAYER from '../data/mutations/unSavePrayer';
import GET_PRAYER_FEED from '../data/queries/getPrayerFeed';
import SaveButton from './SaveButton';

const SaveButtonConnected = memo(({ prayerID, saved, toggleSavedState }) => (
  <Mutation mutation={SAVE_PRAYER}>
    {(save) => (
      <Mutation mutation={UNSAVE_PRAYER}>
        {(unSave) => (
          <AnalyticsConsumer>
            {({ track }) => (
              <SaveButton
                saved={saved}
                onPress={() => {
                  toggleSavedState();
                  if (saved)
                    unSave({
                      variables: { nodeId: prayerID },
                      refetchQueries: [
                        {
                          query: GET_PRAYER_FEED,
                          variables: { type: 'SAVED', first: 1 },
                        },
                      ],
                    });
                  else
                    save({
                      variables: { nodeId: prayerID },
                      refetchQueries: [
                        {
                          query: GET_PRAYER_FEED,
                          variables: { type: 'SAVED', first: 1 },
                        },
                      ],
                    });
                  track({
                    eventName: saved ? 'Unsaved Prayer' : 'Saved Prayer',
                  });
                }}
              />
            )}
          </AnalyticsConsumer>
        )}
      </Mutation>
    )}
  </Mutation>
));

SaveButtonConnected.propTypes = {
  prayerID: PropTypes.string,
  saved: PropTypes.bool,
  toggleSavedState: PropTypes.func,
};

SaveButtonConnected.displayName = 'SaveButtonConnected';

export default SaveButtonConnected;
