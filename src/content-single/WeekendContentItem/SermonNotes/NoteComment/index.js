import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import NoteComment from './NoteComment';
import SAVE_NOTES_COMMENT from './saveNotesComment';

const NoteCommentConnected = ({ contentID, noteID, onChange, initialText }) => {
  const [timer, setTimer] = useState(null);
  const [textToSave, setText] = useState(initialText);
  const handleChange = (saveComment) => (newText) => {
    setText(newText);
    onChange(newText);

    // autosave after 10 sec
    // check for existing timeout, clear it, and set a new one
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      console.count('saving');
      saveComment();
    }, 10000);
    setTimer(newTimer);
  };
  return (
    <Mutation
      mutation={SAVE_NOTES_COMMENT}
      variables={{ contentID, noteID, text: textToSave }}
    >
      {(saveComment) => (
        <NoteComment
          onChange={handleChange(saveComment)}
          initialText={initialText}
        />
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
