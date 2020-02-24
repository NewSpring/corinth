import React from 'react';
import { Query, Mutation } from 'react-apollo';
import getUserProfile from '../../../tabs/connect/getUserProfile';
import GET_PRAYERS from '../../data/queries/getPrayers';
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
                      { query: GET_PRAYERS, variables: { type: 'USER' } },
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
