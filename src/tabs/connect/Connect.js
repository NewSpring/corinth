import React, { PureComponent } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import { BackgroundView, styled } from '@apollosproject/ui-kit';
import ActionTable from './ActionTable';
import ActionBar from './ActionBar';
import UserAvatarHeader from './UserAvatarHeader';
import { RecentlyLikedTileFeedConnected } from './RecentlyLikedTileFeed';
import GET_USER_PROFILE from './getUserProfile';

const ScrollViewWithPadding = styled(({ theme }) => ({
  height: '100%',
  marginTop: theme.sizing.baseUnit * 2,
}))(ScrollView);

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
          <ScrollViewWithPadding>
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
          </ScrollViewWithPadding>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default Connect;
