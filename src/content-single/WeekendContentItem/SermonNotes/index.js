import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { ErrorCard } from '@apollosproject/ui-kit';
import SermonNotes from './SermonNotes';
import GET_SERMON_NOTES from './getSermonNotes';

const SermonNotesConnected = ({ contentID }) => (
  <Query query={GET_SERMON_NOTES} variables={{ contentID }}>
    {({ data: { node = {} } = { node: {} }, loading, error }) => {
      if (error) return <ErrorCard error={error} />;
      // TODO take this out once old sermon notes are gone to get pretty loading states
      if (loading || !node || !node.sermonNotes.length) return null;
      return <SermonNotes isLoading={loading} {...node} />;
    }}
  </Query>
);

SermonNotesConnected.propTypes = {
  contentID: PropTypes.string,
};

export default SermonNotesConnected;
