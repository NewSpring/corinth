import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { AnalyticsConsumer } from '@apollosproject/ui-analytics';
import SAVE_PRAYER from '../data/mutations/savePrayer';
import UNSAVE_PRAYER from '../data/mutations/unSavePrayer';
import GET_PRAYERS from '../data/queries/getPrayers';
import GET_SAVED_PRAYERS from '../data/queries/getSavedPrayers';
import GET_GROUP_PRAYERS from '../data/queries/getGroupPrayers';
import GET_CAMPUS_PRAYERS from '../data/queries/getCampusPrayers';
import SaveButton from './SaveButton';

const prayerQueries = [
  { query: GET_PRAYERS },
  { query: GET_SAVED_PRAYERS },
  { query: GET_GROUP_PRAYERS },
  { query: GET_CAMPUS_PRAYERS },
];

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
                      refetchQueries: prayerQueries,
                    });
                  else
                    save({
                      variables: { nodeId: prayerID },
                      refetchQueries: prayerQueries,
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
