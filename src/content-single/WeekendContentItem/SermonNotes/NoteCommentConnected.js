import React from 'react';
import PropTypes from 'prop-types';
import NoteComment from './NoteComment';

const CustomNoteConnected = ({ parentID, onChange }) => (
  <NoteComment onChange={onChange} />
);

CustomNoteConnected.propTypes = {
  onChange: PropTypes.func,
  parentID: PropTypes.string,
};

export default CustomNoteConnected;
