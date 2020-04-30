import React from 'react';
import Providers from '../../Providers';
import { renderWithApolloData } from '../../utils/testUtils';
import GET_PRAYER_FEED from '../data/queries/getPrayerFeed';
import UserPrayerList from '.';

const mocks = [
  {
    request: {
      query: GET_PRAYER_FEED,
      variables: { type: 'USER', first: 10, after: null },
    },
    result: {
      data: {
        prayerFeed: {
          pageInfo: {
            endCursor: '4',
          },
          edges: [
            {
              cursor: '1',
              node: {
                id: 'PrayerRequest:b99bbd5002a0bf8d4c73e86afe9d4786',
                text: 'This is a test to see if I have a prayer request.',
                enteredDateTime: '2017-04-08T11:21:53.053',
                isAnonymous: false,
                isSaved: false,
                flagCount: 0,
                startTime: '2017-04-08T11:21:53.053',
                requestor: {
                  photo: {
                    uri:
                      'https://s3.amazonaws.com/ns.public/85kC3wXXCWJ6YRcd/ccbbc1f8ba0b44dcad916a02ba262905_IMG_0330.JPG?AWSAccessKeyId=AKIAI6GSVDKZRVEIDFVQ&Expires=1895858231&Signature=%2FOWrAYpZLEPVjHeVwv0aHmsiB1w%3D',
                  },
                  firstName: 'Aaron',
                  lastName: 'Attendee',
                  campus: {
                    id: 'Campus:4f68015ba18662a7409d1219a4ce013e',
                    name: 'Anderson',
                  },
                },
              },
            },
            {
              cursor: '2',
              node: {
                id: 'PrayerRequest:b99bbd5002a0bf8d4c73e86afe9d4786',
                text: 'This is another test to see if I have a prayer request.',
                enteredDateTime: '2017-04-08T11:21:53.053',
                isAnonymous: false,
                isSaved: false,
                flagCount: 0,
                startTime: '2017-04-08T11:21:53.053',
                requestor: {
                  photo: {
                    uri:
                      'https://s3.amazonaws.com/ns.public/85kC3wXXCWJ6YRcd/ccbbc1f8ba0b44dcad916a02ba262905_IMG_0330.JPG?AWSAccessKeyId=AKIAI6GSVDKZRVEIDFVQ&Expires=1895858231&Signature=%2FOWrAYpZLEPVjHeVwv0aHmsiB1w%3D',
                  },
                  firstName: 'Aaron',
                  lastName: 'Attendee',
                  campus: {
                    id: 'Campus:4f68015ba18662a7409d1219a4ce013e',
                    name: 'Anderson',
                  },
                },
              },
            },
            {
              cursor: '3',
              node: {
                id: 'PrayerRequest:b99bbd5002a0bf8d4c73e86afe9d4786',
                text:
                  'This is just another test to see if I have a prayer request.',
                enteredDateTime: '2017-04-08T11:21:53.053',
                isAnonymous: false,
                isSaved: false,
                flagCount: 0,
                startTime: '2017-04-08T11:21:53.053',
                requestor: {
                  photo: {
                    uri:
                      'https://s3.amazonaws.com/ns.public/85kC3wXXCWJ6YRcd/ccbbc1f8ba0b44dcad916a02ba262905_IMG_0330.JPG?AWSAccessKeyId=AKIAI6GSVDKZRVEIDFVQ&Expires=1895858231&Signature=%2FOWrAYpZLEPVjHeVwv0aHmsiB1w%3D',
                  },
                  firstName: 'Aaron',
                  lastName: 'Attendee',
                  campus: {
                    id: 'Campus:4f68015ba18662a7409d1219a4ce013e',
                    name: 'Anderson',
                  },
                },
              },
            },
            {
              cursor: '4',
              node: {
                id: 'PrayerRequest:b99bbd5002a0bf8d4c73e86afe9d4786',
                text:
                  'This, yet again, is a test to see if I have a prayer request.',
                answer: 'This is an answer to this prayer',
                enteredDateTime: '2017-04-08T11:21:53.053',
                isAnonymous: false,
                isSaved: false,
                flagCount: 0,
                startTime: '2017-04-08T11:21:53.053',
                requestor: {
                  photo: {
                    uri:
                      'https://s3.amazonaws.com/ns.public/85kC3wXXCWJ6YRcd/ccbbc1f8ba0b44dcad916a02ba262905_IMG_0330.JPG?AWSAccessKeyId=AKIAI6GSVDKZRVEIDFVQ&Expires=1895858231&Signature=%2FOWrAYpZLEPVjHeVwv0aHmsiB1w%3D',
                  },
                  firstName: 'Aaron',
                  lastName: 'Attendee',
                  campus: {
                    id: 'Campus:4f68015ba18662a7409d1219a4ce013e',
                    name: 'Anderson',
                  },
                },
              },
            },
          ],
        },
      },
    },
  },
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
            request: {
              query: GET_PRAYER_FEED,
              variables: { type: 'USER', first: 10, after: null },
            },
            result: {
              data: {
                prayerFeed: {
                  edges: [],
                  __typename: 'PrayerConnection',
                },
              },
            },
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
