import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import PropTypes from 'prop-types';

import {
  HorizontalLikedContentFeedConnected,
  HorizontalContentCardConnected,
} from '@apollosproject/ui-connected';
import {
  BackgroundView,
  HorizontalLikedContentFeed,
} from '@apollosproject/ui-kit';
// import HorizontalLikedContentFeedConnected from '../../ui/HorizontalLikedContentFeedConnected';
import ActionTable from './ActionTable';
import ActionBar from './ActionBar';
import UserAvatarHeader, { GET_USER_PROFILE } from './UserAvatarHeader';

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
            <UserAvatarHeader />
            <ActionBar />
            <HorizontalLikedContentFeedConnected
              Component={() => <HorizontalLikedContentFeed />}
            />
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
