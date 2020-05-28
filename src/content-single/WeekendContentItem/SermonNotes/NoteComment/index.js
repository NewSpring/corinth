import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import NoteComment from './NoteComment';
import SAVE_NOTES_COMMENT from './saveNotesComment';

const NoteCommentConnected = ({ contentID, noteID, onChange, initialText }) => {
  const [text, setText] = useState(initialText);
  const handleChange = (newText) => {
    setText(newText);
    onChange(newText);
  };
  return (
    <Mutation
      mutation={SAVE_NOTES_COMMENT}
      variables={{ contentID, noteID, text }}
    >
      {(save) => (
        <NoteComment onChange={handleChange} initialText={initialText} />
      )}
    </Mutation>
  );
};

NoteCommentConnected.propTypes = {
  contentID: PropTypes.string,
  noteID: PropTypes.string,
  onChange: PropTypes.func,
  initialText: PropTypes.string,
};

export default NoteCommentConnected;
