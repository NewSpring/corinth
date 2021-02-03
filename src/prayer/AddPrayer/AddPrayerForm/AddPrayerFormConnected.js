import React from 'react';
import { Query, Mutation } from '@apollo/client/react/components';
import getUserProfile from '../../../tabs/connect/UserAvatarHeader/getUserProfile';
import GET_PRAYER_COUNT from '../../data/queries/getPrayerCount';
import ADD_PRAYER from '../../data/mutations/addPrayer';
import AddPrayerForm from './AddPrayerForm';

const AddPrayerFormConnected = (props) => (
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
              props.navigation.navigate('WithYou');
            }}
            avatarSource={photo}
            {...props}
            onClose={() => props.navigation.pop()}
            title={'Join me in praying for ...'}
          />
        )}
      </Mutation>
    )}
  </Query>
);

export default AddPrayerFormConnected;
