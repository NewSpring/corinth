import React, { PureComponent } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from '@apollosproject/ui-kit';
import PrayerMenu from '../../prayer';

const StyledSafeAreaView = styled(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background.paper,
}))(SafeAreaView);

class Prayer extends PureComponent {
  render() {
    return (
      <StyledSafeAreaView edges={['right', 'top', 'left']}>
        <PrayerMenu {...this.props} />
      </StyledSafeAreaView>
    );
  }
}

export default Prayer;
