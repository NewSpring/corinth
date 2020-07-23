import React, { memo } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  BodyText,
  ChannelLabel,
  FlexedView,
  H4,
  H5,
  ModalView,
  styled,
  Touchable,
} from '@apollosproject/ui-kit';
import { AnalyticsConsumer } from '@apollosproject/ui-analytics';
import PrayerHeader from '../PrayerHeader';

const GreyH5 = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
  marginBottom: theme.sizing.baseUnit * 0.5,
}))(H5);

const PrayerView = styled(({ theme }) => ({
  marginVertical: theme.sizing.baseUnit,
  paddingRight: theme.sizing.baseUnit,
}))(View);

const AbsolutePositionedView = styled(() => ({
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 2,
}))(View);

const FlexedSafeAreaView = styled({
  flex: 1,
})(SafeAreaView);

const ScrollArea = styled(({ theme }) => ({
  flex: 5,
  padding: theme.sizing.baseUnit,
}))(FlexedView);

const getNotification = (navigation) =>
  navigation.getParam('notification', false);

const Wrapper = ({ navigation, ...props }) => (
  <>
    {getNotification(navigation) ? (
      <ModalView onClose={() => navigation.popToTop()}>
        <FlexedSafeAreaView>
          <ScrollArea>
            <ScrollView>{props.children}</ScrollView>
          </ScrollArea>
        </FlexedSafeAreaView>
      </ModalView>
    ) : (
      <View>{props.children}</View>
    )}
  </>
);

Wrapper.propTypes = {
  children: PropTypes.any, //eslint-disable-line
};

const PrayerSingle = memo(
  ({
    showHelp,
    showHeader,
    showDate,
    avatarSize,
    prayer,
    action,
    isLoading,
    navigation,
    ...props
  }) => (
    <Wrapper navigation={navigation}>
      {!isLoading && !getNotification(navigation) ? (
        <AbsolutePositionedView>{action}</AbsolutePositionedView>
      ) : null}
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
      <PrayerView>
        <BodyText>{prayer.text}</BodyText>
      </PrayerView>
      {prayer.answer && prayer.answer.length > 0 ? (
        <PrayerView>
          <H4>Answer:</H4>
          <BodyText>{prayer.answer}</BodyText>
        </PrayerView>
      ) : null}
      {showHelp && !getNotification(navigation) ? (
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
    </Wrapper>
  )
);

PrayerSingle.propTypes = {
  showHelp: PropTypes.bool,
  showHeader: PropTypes.bool,
  showDate: PropTypes.bool,
  avatarSize: PropTypes.string,
  prayer: PropTypes.shape({
    startTime: PropTypes.string,
    isAnonymous: PropTypes.bool,
    requestor: PropTypes.shape({
      nickName: PropTypes.string,
      firstName: PropTypes.string,
      photo: PropTypes.shape({
        source: PropTypes.shape({ uri: PropTypes.string }),
      }),
    }),
    campus: PropTypes.shape({ name: PropTypes.string }),
    text: PropTypes.string,
    answer: PropTypes.string,
  }),
  action: PropTypes.element,
  isLoading: PropTypes.bool,
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
