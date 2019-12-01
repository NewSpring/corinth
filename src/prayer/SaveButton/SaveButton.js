import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { ChannelLabel, Button } from '@apollosproject/ui-kit';

const SaveButton = memo(({ saved, onPress }) =>
  saved ? (
    <Button onPress={onPress}>
      <ChannelLabel icon="like-solid" label={'Saved'} />
    </Button>
  ) : (
    <Button onPress={onPress} bordered>
      <ChannelLabel icon="like" label={'Save Prayer'} />
    </Button>
  )
);

SaveButton.propTypes = {
  saved: PropTypes.bool,
  onPress: PropTypes.func,
};

SaveButton.defaultProps = {
  saved: false,
  onPress: () => null,
};

SaveButton.displayName = 'SaveButton';

export default SaveButton;
