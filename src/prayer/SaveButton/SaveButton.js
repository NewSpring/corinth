import React from 'react';
import PropTypes from 'prop-types';
import { ChannelLabel, Button } from '@apollosproject/ui-kit';

const SaveButton = ({ saved, onPress }) =>
  console.log(saved) || saved ? (
    <Button onPress={onPress}>
      <ChannelLabel icon="like-solid" label={'Saved'} />
    </Button>
  ) : (
    <Button onPress={onPress} bordered>
      <ChannelLabel icon="like" label={'Save Prayer'} />
    </Button>
  );

SaveButton.propTypes = {
  saved: PropTypes.bool.isRequired,
  onPress: PropTypes.func,
};

export default SaveButton;
