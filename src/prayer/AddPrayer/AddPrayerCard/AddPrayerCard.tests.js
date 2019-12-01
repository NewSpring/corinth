import React from 'react';
import renderer from 'react-test-renderer';
import Providers from 'newspringchurchapp/src/Providers';

import AddPrayerCard from '.';

describe('The AddPrayerCard component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <AddPrayerCard />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a custom title', () => {
    const tree = renderer.create(
      <Providers>
        <AddPrayerCard
          description={'this is a custom description for the card.'}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
