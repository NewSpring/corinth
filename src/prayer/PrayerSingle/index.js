import React, { memo } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  BodyText,
  H5,
  styled,
  Touchable,
  ChannelLabel,
} from '@apollosproject/ui-kit';
import { AnalyticsConsumer } from '@apollosproject/ui-analytics';
import PrayerHeader from '../PrayerHeader';

const GreyH5 = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
  marginBottom: theme.sizing.baseUnit * 0.5,
}))(H5);

const PrayerText = styled(({ theme }) => ({
  marginVertical: theme.sizing.baseUnit,
}))(BodyText);

const AbsolutePositionedView = styled(() => ({
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 2,
}))(View);

const PrayerSingle = memo(
  ({
    showHelp,
    showHeader,
    showDate,
    avatarSize,
    prayer,
    action,
    ...props
  }) => (
    <View>
      <AbsolutePositionedView>{action}</AbsolutePositionedView>
      {showDate ? (
        <GreyH5>
          {prayer.startTime ? moment(prayer.startTime).fromNow() : ''}
        </GreyH5>
      ) : null}
      {showHeader ? (
        <PrayerHeader
          avatarSize={avatarSize}
          avatarSource={prayer.isAnonymous ? null : prayer.requestor.photo}
          title={`Pray for ${
            prayer.isAnonymous
              ? 'Request'
              : prayer.requestor.nickName || prayer.requestor.firstName
          }`}
          source={prayer.campus.name !== 'Web' ? prayer.campus.name : null}
        />
      ) : null}
      <PrayerText>{prayer.text}</PrayerText>
      {showHelp ? (
        <AnalyticsConsumer>
          {({ track }) => (
            <Touchable
              onPress={() => {
                props.navigation.navigate('ContentSingle', {
                  // TODO: this should come from a content channel
                  itemId: 'MediaContentItem:20f5b6548d64b1ac62a1c4b0deb0bfcb',
                  itemTitle: 'Learning how to pray like Jesus',
                  isolated: true,
                });
                track({ eventName: "Clicked 'How to Pray'" });
              }}
            >
              <View>
                <ChannelLabel
                  icon="information"
                  label="Not sure how to pray? Read this."
                />
              </View>
            </Touchable>
          )}
        </AnalyticsConsumer>
      ) : null}
    </View>
  )
);

PrayerSingle.propTypes = {
  showHelp: PropTypes.bool,
  showHeader: PropTypes.bool,
  showDate: PropTypes.bool,
  avatarSize: PropTypes.string,
  prayer: PropTypes.shape({}), // TODO: fill this out
  action: PropTypes.element,
};

PrayerSingle.defaultProps = {
  showHelp: false,
  showHeader: false,
  showDate: false,
  avatarSize: 'small',
  prayer: {
    firstName: 'Request',
    campus: { name: 'Web' },
    isAnonymous: false,
    person: { photo: { uri: '' } },
  },
  action: null,
};

PrayerSingle.displayName = 'PrayerSingle';

PrayerSingle.navigationOptions = {
  header: null,
};

export default PrayerSingle;
