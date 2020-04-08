import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '../../Providers';

import SaveButton from './SaveButton';

describe('the SaveButton component', () => {
  it('renders a SaveButton', () => {
    const tree = renderer.create(
      <Providers>
        <SaveButton />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders a saved SaveButton', () => {
    const tree = renderer.create(
      <Providers>
        <SaveButton saved />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
