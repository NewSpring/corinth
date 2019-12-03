import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '../../Providers';

import SearchCard from '.';

describe('The SearchCard component', () => {
  it('should render', () => {
    const data = {
      title: 'How to lead people to Jesus',
      summary:
        'Love compels a mother to lose all dignity in public as she screams the name of her lost child.',
      coverImage: {
        name: null,
        sources: [
          {
            uri:
              'https://res.cloudinary.com/apollos/image/fetch/c_limit,f_auto,w_1600/https://apollosrock.newspring.cc/GetImage.ashx%3Fguid%3Dd3a96243-2558-4c04-bf41-3aadcf41771f',
            __typename: 'ImageMediaSource',
          },
        ],
        __typename: 'ImageMedia',
      },
      cursor: 'b487224762b030f470967f45d7205823',
      node: {
        id: 'DevotionalContentItem:561dfb7dbd8a5c093fd8385c7edaadbc',
        title: 'How to lead people to Jesus',
        hyphenatedTitle: '-',
        isLiked: false,
        likedCount: 0,
        summary:
          'Love compels a mother to lose all dignity in public as she screams the name of her lost child.',
        coverImage: {
          name: 'Square Image',
          sources: [
            {
              uri:
                'https://res.cloudinary.com/apollos/image/fetch/c_limit,f_auto,w_1600/https://apollosrock.newspring.cc/GetImage.ashx%3Fguid%3Dd3a96243-2558-4c04-bf41-3aadcf41771f',
              __typename: 'ImageMediaSource',
            },
          ],
          __typename: 'ImageMedia',
        },
        theme: null,
        parentChannel: {
          id: 'ContentChannel:559b23fd0aa90e81b1c023e72e230fa1',
          name: 'Devotional',
          __typename: 'ContentChannel',
        },
        videos: [{ sources: [], __typename: 'VideoMedia' }],
        audios: [],
        __typename: 'DevotionalContentItem',
      },
      __typename: 'SearchResult',
    };

    const tree = renderer.create(
      <Providers>
        <SearchCard
          coverImage={data.coverImage}
          summary={data.summary}
          title={data.title}
          node={data.node}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
