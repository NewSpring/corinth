import React, { PureComponent } from 'react';
import { Query } from '@apollo/client/react/components';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HorizontalLikedContentFeedConnected } from '@apollosproject/ui-connected';
import { BackgroundView } from '@apollosproject/ui-kit';
import ActionTable from './ActionTable';
import ActionBar from './ActionBar';
import UserAvatarHeader, { GET_USER_PROFILE } from './UserAvatarHeader';

class Connect extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }),
  };

  render() {
    return (
      <BackgroundView>
        <SafeAreaView edges={['top', 'left', 'right']}>
          <ScrollView>
            <UserAvatarHeader />
            <Query query={GET_USER_PROFILE} fetchPolicy="cache-and-network">
              {({
                data: {
                  currentUser: { profile: { isGroupLeader } = {} } = {},
                } = {},
              }) => <ActionBar isGroupLeader={isGroupLeader} />}
            </Query>
            <HorizontalLikedContentFeedConnected />
            <ActionTable />
          </ScrollView>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default Connect;
