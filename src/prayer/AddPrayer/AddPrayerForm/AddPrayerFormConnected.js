import React from 'react';
import { Query, Mutation } from '@apollo/client/react/components';
import getUserProfile from '../../../tabs/connect/UserAvatarHeader/getUserProfile';
import GET_PRAYER_COUNT from '../../data/queries/getPrayerCount';
import ADD_PRAYER from '../../data/mutations/addPrayer';
import AddPrayerForm from './AddPrayerForm';

class AddPrayerFormConnected extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Query query={getUserProfile}>
        {({
          loading: profileLoading,
          data: {
            currentUser: { profile: { photo = { uri: '' } } = {} } = {},
          } = {},
        }) => (
          <Mutation mutation={ADD_PRAYER}>
            {(addPrayer) => (
              <AddPrayerForm
                loading={profileLoading}
                onSubmit={(values) => {
                  addPrayer({
                    variables: {
                      text: values.prayer,
                      isAnonymous: values.anonymous,
                    },
                    refetchQueries: () => [
                      { query: GET_PRAYER_COUNT, variables: { type: 'USER' } },
                    ],
                  });
                  this.props.navigation.navigate('WithYou');
                }}
                avatarSource={photo}
                {...this.props}
                onClose={() => this.props.navigation.pop()}
                title={'Join me in praying for ...'}
              />
            )}
          </Mutation>
        )}
      </Query>
    );
  }
}

export default AddPrayerFormConnected;
