import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'newspringchurchapp/src/Providers';

import PrayerSingle from '.';

const prayer = {
  person: {
    photo: {
      uri: 'https://fillmurray.com/400/600',
    },
  },
  firstName: 'Bill',
  text:
    'I want to go back to school for my PTA degree next year, but I’m afraid of not getting accepted. I have a great job right now but I’m not very happy. Pray my plans for school align with God’s plans for me.',
  campus: { name: 'Anderson' },
};

describe('the PrayerSingle component', () => {
  it('renders a prayer card', () => {
    const tree = renderer.create(
      <Providers>
        <PrayerSingle prayer={prayer} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
