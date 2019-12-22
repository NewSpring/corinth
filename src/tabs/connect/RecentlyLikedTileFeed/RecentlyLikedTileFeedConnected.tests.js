import React from 'react';
import wait from 'waait';
import Providers from '../../../Providers';

import { renderWithApolloData } from '../../../utils/testUtils';

import GET_LIKED_CONTENT from '../getLikedContent';
import RecentlyLikedTileFeedConnected from './RecentlyLikedTileFeedConnected';

describe('RecentlyLikedTileFeedConnected', () => {
  it('renders a RecentlyLikedTileFeedConnected', async () => {
    const mock = {
      request: {
        query: GET_LIKED_CONTENT,
        variables: { first: 3 },
      },
      result: {
        data: {
          likedContent: {
            __typename: 'ContentItemsConnection',
            pageInfo: {
              __typename: 'PaginationInfo',
              endCursor: '123',
            },
            edges: [
              {
                __typename: 'ContentItemsConnectionEdge',
                node: {
                  __typename: 'UniversalContentItem',
                  id: 'UniversalContentItem:d57994350b9d213866b24dea3a97433d',
                  coverImage: null,
                  parentChannel: {
                    id: 'ContentChannel:4f68015ba18662a7409d1219a4ce013e',
                    name: 'Editorial',
                    iconName: 'text',
                    __typename: 'ContentChannel',
                  },
                  title: 'Mea Animal Aperiam Ornatus Eu',
                  hyphenatedTitle: 'Mea Animal Aperiam Ornatus Eu',
                  summary: 'Bla bla bla',
                  theme: null,
                  isLiked: false,
                  likedCount: 0,
                  videos: [],
                  audios: [],
                },
              },
              {
                __typename: 'ContentItemsConnectionEdge',
                node: {
                  __typename: 'UniversalContentItem',
                  id: 'UniversalContentItem:b36e55d803443431e96bb4b5068147ec',
                  coverImage: null,
                  parentChannel: {
                    id: 'ContentChannel:4f68015ba18662a7409d1219a4ce013e',
                    name: 'Editorial',
                    iconName: 'text',
                    __typename: 'ContentChannel',
                  },
                  title: 'Probo Senserit Id Mea, Ut Sed Malis Postea,',
                  hyphenatedTitle:
                    'Probo Senserit Id Mea, Ut Sed Malis Postea,',
                  summary: 'Bla bla bla',
                  theme: null,
                  isLiked: false,
                  likedCount: 0,
                  videos: [],
                  audios: [],
                },
              },
            ],
          },
        },
      },
    };
    const navigation = { navigate: jest.fn(), getParam: jest.fn() };
    const tree = await renderWithApolloData(
      <Providers mocks={[mock]}>
        <RecentlyLikedTileFeedConnected navigation={navigation} />
      </Providers>
    );
    await wait(0); // wait for response from graphql
    expect(tree).toMatchSnapshot();
  });

  it('renders nothing if no liked content', async () => {
    const mock = {
      request: {
        query: GET_LIKED_CONTENT,
      },
      result: {
        data: {
          likedContent: {
            __typename: 'ContentItemsConnection',
            pageInfo: {
              __typename: 'PaginationInfo',
              endCursor: null,
            },
            edges: [],
          },
        },
      },
    };
    const navigation = { navigate: jest.fn(), getParam: jest.fn() };
    const tree = await renderWithApolloData(
      <Providers mocks={[mock]}>
        <RecentlyLikedTileFeedConnected navigation={navigation} />
      </Providers>
    );
    await wait(0); // wait for response from graphql
    expect(tree).toMatchSnapshot();
  });
});
