import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import SermonNotes from './SermonNotes';
import GET_SERMON_NOTES from './getSermonNotes';

const SermonNotesConnected = ({ contentID }) => (
  <Query query={GET_SERMON_NOTES} variables={{ contentID }}>
    {({ data: { node = {} }, loading }) => (
      <SermonNotes isLoading={loading} {...node} />
    )}
  </Query>
);

SermonNotesConnected.propTypes = {
  contentID: PropTypes.string,
};

export default SermonNotesConnected;
