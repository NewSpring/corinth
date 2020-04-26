import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const SermonNotesConnected = ({ contentID }) => <Text>Sermon Notes</Text>;

SermonNotesConnected.propTypes = {
  contentID: PropTypes.string,
};

export default SermonNotesConnected;
