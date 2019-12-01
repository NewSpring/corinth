import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'newspringchurchapp/src/Providers';

import PrayerMenuCard from '.';

const cardData = {
  title: 'A Card Title',
  image: 'https://picsum.photos/600/400/?random',
  overlayColor: ['#6BAC43', '#6BAC43'],
};

describe('the PrayerMenuCard component', () => {
  it('renders a prayer menu card', () => {
    const tree = renderer.create(
      <Providers>
        <PrayerMenuCard
          title={cardData.title}
          image={cardData.image}
          overlayColor={cardData.overlayColor}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
