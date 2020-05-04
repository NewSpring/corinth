import React from 'react';

import Providers from '../../Providers';
import { renderWithApolloData } from '../../utils/testUtils';
import getUserProfile from '../../tabs/connect/UserAvatarHeader/getUserProfile';
import AnswerPrayerFormConnected from './AnswerPrayerFormConnected';

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

it('renders AnswerPrayerFormConnected', async () => {
  const tree = await renderWithApolloData(
    <Providers mocks={mocks}>
      <AnswerPrayerFormConnected navigation={{ getParam: jest.fn() }} />
    </Providers>
  );
  expect(tree).toMatchSnapshot();
});
