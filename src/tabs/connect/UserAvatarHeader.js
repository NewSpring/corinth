import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import { Avatar, H3, styled, PaddedView } from '@apollosproject/ui-kit';
import GET_USER_PROFILE from './getUserProfile';

const Container = styled({
  alignItems: 'center',
  justifyContent: 'center',
})(PaddedView);

const UserAvatarHeader = ({ navigation }) => (
  <Query query={GET_USER_PROFILE} fetchPolicy="cache-and-network">
    {({
      data: { currentUser: { profile: { photo, firstName } = {} } = {} } = {},
    }) => (
      <Container>
        <PaddedView horizontal={false}>
          <Avatar
            source={photo}
            size="large"
            buttonIcon="settings"
            onPressIcon={() => navigation.navigate('UserSettings')}
          />
        </PaddedView>
        <H3>
          Hello
          {firstName ? ` ${firstName}` : ''}!
        </H3>
      </Container>
    )}
  </Query>
);

UserAvatarHeader.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }),
};

export default withNavigation(UserAvatarHeader);
