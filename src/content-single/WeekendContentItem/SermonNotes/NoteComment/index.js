import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import NoteComment from './NoteComment';
import SAVE_NOTES_COMMENT from './saveNotesComment';

const NoteCommentConnected = ({ contentID, noteID, ...props }) => (
  <Mutation mutation={SAVE_NOTES_COMMENT} variables={{ contentID, noteID }}>
    {(save) => <NoteComment {...props} />}
  </Mutation>
);

NoteCommentConnected.propTypes = {
  contentID: PropTypes.string,
  noteID: PropTypes.string,
};

export default NoteCommentConnected;
