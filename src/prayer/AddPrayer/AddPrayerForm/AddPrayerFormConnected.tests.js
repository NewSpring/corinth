import React from 'react';

import Providers from '../../../Providers';
import { renderWithApolloData } from '../../../utils/testUtils';
import getUserProfile from '../../../tabs/connect/getUserProfile';
import AddPrayerFormConnected from './AddPrayerFormConnected';

const mocks = [
  {
    request: {
      query: getUserProfile,
    },
    result: {
      data: {
        currentUser: { profile: { photo: { uri: 'fakeURL' } } },
      },
    },
  },
];

it('renders AddPrayerFormConnected', async () => {
  const tree = await renderWithApolloData(
    <Providers mocks={mocks}>
      <AddPrayerFormConnected navigation={{}} />
    </Providers>
  );
  expect(tree).toMatchSnapshot();
});
