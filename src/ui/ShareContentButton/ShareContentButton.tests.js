import React from 'react';
import renderer from 'react-test-renderer';

import { Providers } from '@apollosproject/ui-kit';

import ShareContentButton from '.';

describe('the Share component', () => {
  it('should render', () => {
    const shareObject = {
      title: 'Shared Object Title',
      url: 'https://github.com/ApollosProject/apollos-prototype',
    };
    const tree = renderer.create(
      <Providers>
        <ShareContentButton content={shareObject} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
