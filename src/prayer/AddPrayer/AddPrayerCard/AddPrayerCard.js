import React, { memo } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import {
  BodyText,
  styled,
  Button,
  CardContent,
  SideBySideView,
  ChannelLabel,
  Touchable,
  H3,
} from '@apollosproject/ui-kit';

const StyledView = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit,
  justifyContent: 'center',
}))(View);

const StyledBodyText = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit,
}))(BodyText);

const StyledButtonView = styled(({ theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit,
}))(View);

const AddPrayerCard = memo(({ avatarSource, title, description, ...props }) => (
  <StyledView>
    <CardContent>
      <SideBySideView>
        <H3>{title}</H3>
        <Touchable onPress={() => props.navigation.navigate('UserPrayerList')}>
          <View>
            <ChannelLabel icon="profile" label="My Prayers" />
          </View>
        </Touchable>
      </SideBySideView>
      <StyledBodyText>{description}</StyledBodyText>
    </CardContent>
    <StyledButtonView>
      <Button
        title={'Add a prayer request'}
        onPress={() => props.navigation.navigate('AddPrayerFormConnected')}
      />
    </StyledButtonView>
  </StyledView>
));

AddPrayerCard.propTypes = {
  avatarSource: PropTypes.shape({
    uri: PropTypes.string,
  }),
  title: PropTypes.string,
  description: PropTypes.string,
};

AddPrayerCard.defaultProps = {
  title: 'Ask for prayer',
  description:
    "There aren't currently any prayers in your community. Send them one now.",
};

AddPrayerCard.displayName = 'AddPrayerCard';

export default AddPrayerCard;
