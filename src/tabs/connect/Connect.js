import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import PropTypes from 'prop-types';

import {
  HorizontalLikedContentFeedConnected,
  HorizontalLikedContentFeed,
  HorizontalContentCardConnected,
} from '@apollosproject/ui-connected';
import {
  BackgroundView,
  HorizontalHighlightCard,
} from '@apollosproject/ui-kit';
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
            <Query query={GET_USER_PROFILE} fetchPolicy="cache-and-network">
              {({
                data: {
                  currentUser: { profile: { isGroupLeader } = {} } = {},
                } = {},
              }) => <ActionBar isGroupLeader={isGroupLeader} />}
            </Query>
            <HorizontalLikedContentFeedConnected
              Component={({ ...feedProps }) => (
                <HorizontalLikedContentFeed
                  Component={({ ...cardProps }) => (
                    <HorizontalContentCardConnected
                      Component={HorizontalHighlightCard}
                      labelText={''}
                      {...cardProps}
                    />
                  )}
                  {...feedProps}
                />
              )}
            />
            <ActionTable />
          </ScrollView>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default Connect;
