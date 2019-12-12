import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '../../Providers';

import PrayerHeader from '.';

const headerData = {
  imageSource: {
    uri: 'https://fillmurray.com/400/600',
  },
  name: 'Bill',
  source: 'Anderson',
};

describe('the PrayerHeader component', () => {
  it('renders the prayer header', () => {
    const tree = renderer.create(
      <Providers>
        <PrayerHeader
          avatarSize={'medium'}
          avatarSource={headerData.imageSource}
          name={`Pray For ${headerData.name}`}
          source={headerData.source}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders an anonymous prayer header', () => {
    const tree = renderer.create(
      <Providers>
        <PrayerHeader
          anonymous
          avatarSize={'medium'}
          avatarSource={headerData.imageSource}
          name={`Pray For ${headerData.name}`}
          source={headerData.source}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
