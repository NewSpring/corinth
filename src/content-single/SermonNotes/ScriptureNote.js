import React from 'react';
import PropTypes from 'prop-types';
import { ScriptureItem } from '@apollosproject/ui-scripture';

const ScriptureNote = ({ scripture: { reference, html, version } }) => (
  <ScriptureItem reference={reference} html={html} version={version} />
);

ScriptureNote.propTypes = {
  scripture: PropTypes.shape({
    copyright: PropTypes.string,
    reference: PropTypes.string,
    html: PropTypes.string,
    version: PropTypes.string,
  }),
};

export default ScriptureNote;
