import React from 'react';
import renderer from 'react-test-renderer';
import { Providers } from '@apollosproject/ui-kit';
import LandingScreen from '../LandingScreen';

describe('the LandingScreen', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <LandingScreen />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
