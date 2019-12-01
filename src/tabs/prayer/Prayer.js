import React, { PureComponent } from 'react';
import { SafeAreaView } from 'react-navigation';
import { styled } from '@apollosproject/ui-kit';
import PrayerMenu from '../../prayer';

const StyledSafeAreaView = styled(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background.paper,
}))(SafeAreaView);

class Prayer extends PureComponent {
  static navigationOptions = () => ({
    header: null,
  });

  render() {
    return (
      <StyledSafeAreaView>
        <PrayerMenu {...this.props} />
      </StyledSafeAreaView>
    );
  }
}

export default Prayer;
