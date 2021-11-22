import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from '@apollo/client/react/components';
import GET_SERMON_NOTES from '../getSermonNotes';
import NoteComment from './NoteComment';
import SAVE_NOTES_COMMENT from './saveNotesComment';

const NoteCommentConnected = ({ contentID, noteID, onChange, initialText }) => {
  const [timer, setTimer] = useState(null);
  const [textToSave, setText] = useState(initialText);
  const handleChange = (saveComment) => (newText) => {
    setText(newText);
    onChange(newText);

    // autosave after 3 sec
    // check for existing timeout, clear it, and set a new one
    clearTimeout(timer);
    const newTimer = setTimeout(saveComment, 3000);
    setTimer(newTimer);
  };

  // pre-fill sermon note exports
  useEffect(
    () => {
      onChange(initialText);
    },
    [onChange, initialText]
  );
  return (
    <Mutation
      mutation={SAVE_NOTES_COMMENT}
      variables={{ contentID, noteID, text: textToSave }}
      update={(cache, { data: { saveNotesComment: comment } }) => {
        // get all sermon notes for this content item
        const data = cache.readQuery({
          query: GET_SERMON_NOTES,
          variables: { contentID },
        });

        // replace comment text
        data.node.sermonNotes = data.node.sermonNotes.map(
          (note) => (note.id === noteID ? { ...note, comment } : note)
        );

        // write notes back out
        cache.writeQuery({
          query: GET_SERMON_NOTES,
          variables: { contentID },
          data,
        });
      }}
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
