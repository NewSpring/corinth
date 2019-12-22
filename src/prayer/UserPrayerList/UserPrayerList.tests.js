import React from 'react';
import Providers from '../../Providers';
import { renderWithApolloData } from '../../utils/testUtils';
import getUserPrayers from '../data/queries/getUserPrayers';
import UserPrayerList from '.';

const prayers = [
  {
    id: 'PrayerRequest:b99bbd5002a0bf8d4c73e86afe9d4786',
    firstName: 'Aaron',
    lastName: 'Attendee',
    text: 'This is a test to see if I have a prayer request.',
    enteredDateTime: '2017-04-08T11:21:53.053',
  },
  {
    id: 'PrayerRequest:b99bbd5002a0bf8d4c73e86afe9d4787',
    firstName: 'Aaron',
    lastName: 'Attendee',
    text: 'This is another test to see if I have a prayer request.',
    enteredDateTime: '2017-04-09T11:21:53.053',
  },
  {
    id: 'PrayerRequest:b99bbd5002a0bf8d4c73e86afe9d4788',
    firstName: 'Aaron',
    lastName: 'Attendee',
    text: 'This is just another test to see if I have a prayer request.',
    enteredDateTime: '2017-04-11T11:21:53.053',
  },
  {
    id: 'PrayerRequest:b99bbd5002a0bf8d4c73e86afe9d4789',
    firstName: 'Aaron',
    lastName: 'Attendee',
    text: 'This, yet again, is a test to see if I have a prayer request.',
    enteredDateTime: '2017-04-10T11:21:53.053',
  },
];

const mocks = [
  { request: { query: getUserPrayers }, response: { data: { prayers } } },
];

describe('the UserPrayerList component', () => {
  it('renders a list of prayers', async () => {
    const navigation = { pop: jest.fn() };
    const tree = await renderWithApolloData(
      <Providers mocks={mocks} addTypename={false}>
        <UserPrayerList navigation={navigation} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders no prayer text', async () => {
    const navigation = { pop: jest.fn() };
    const tree = await renderWithApolloData(
      <Providers
        mocks={[
          {
            request: { query: getUserPrayers },
            response: { data: {} },
          },
        ]}
        addTypename={false}
      >
        <UserPrayerList navigation={navigation} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
