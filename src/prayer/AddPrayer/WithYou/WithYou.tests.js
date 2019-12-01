import React from 'react';
import renderer from 'react-test-renderer';
import Providers from 'newspringchurchapp/src/Providers';

import WithYou from '.';

describe('The WithYou component', () => {
  it('should render', () => {
    const navigation = { pop: jest.fn(), navigate: jest.fn() };
    const tree = renderer.create(
      <Providers>
        <WithYou navigation={navigation} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
