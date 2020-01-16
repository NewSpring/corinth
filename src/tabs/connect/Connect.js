import React, { PureComponent } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import { BackgroundView } from '@apollosproject/ui-kit';
import ActionTable from './ActionTable';
import ActionBar from './ActionBar';
import UserAvatarHeader from './UserAvatarHeader';
import { RecentlyLikedTileFeedConnected } from './RecentlyLikedTileFeed';
import GET_USER_PROFILE from './getUserProfile';

class Connect extends PureComponent {
  static navigationOptions = () => ({
    title: 'Connect',
    header: null,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }),
  };

  render() {
    return (
      <BackgroundView>
        <SafeAreaView>
          <ScrollView>
            <UserAvatarHeader key="UserAvatarHeaderConnected" />
            <ActionBar />
            <RecentlyLikedTileFeedConnected />
            <Query query={GET_USER_PROFILE}>
              {({
                data: {
                  currentUser: { profile: { isGroupLeader } = {} } = {},
                } = {},
              }) => <ActionTable isGroupLeader={isGroupLeader} />}
            </Query>
          </ScrollView>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default Connect;
