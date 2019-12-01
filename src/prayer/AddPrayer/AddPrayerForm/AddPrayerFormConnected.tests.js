import React from 'react';

import Providers from 'newspringchurchapp/src/Providers';
import { renderWithApolloData } from 'newspringchurchapp/src/utils/testUtils';
import getUserProfile from 'newspringchurchapp/src/tabs/connect/getUserProfile';
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
