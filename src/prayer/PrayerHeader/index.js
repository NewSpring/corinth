import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Avatar, H3, H6, styled } from '@apollosproject/ui-kit';

const AvatarView = styled(({ theme }) => ({
  marginBottom: theme.sizing.baseUnit,
}))(View);

const GreyH6 = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit * 0.5,
  color: theme.colors.text.tertiary,
}))(H6);

const PrayerHeader = (props) => (
  <View>
    <AvatarView>
      <Avatar
        isLoading={props.loading}
        source={props.avatarSource}
        size={props.avatarSize}
      />
    </AvatarView>
    <H3>{props.title}</H3>
    {props.source ? <GreyH6>{props.source}</GreyH6> : null}
  </View>
);

PrayerHeader.propTypes = {
  avatarSize: PropTypes.string,
  avatarSource: PropTypes.shape({ uri: PropTypes.string }),
  title: PropTypes.string,
  source: PropTypes.string,
  loading: PropTypes.bool,
};

PrayerHeader.defaultProps = {
  avatarSize: 'small',
  title: 'Request',
  source: '',
};

export default PrayerHeader;
