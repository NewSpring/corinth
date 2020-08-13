import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '../../Providers';

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

const prayerWithAnswer = {
  person: {
    photo: {
      uri: 'https://fillmurray.com/400/600',
    },
  },
  firstName: 'Bill',
  text: 'This is a prayer with an answer',
  answer: 'This is the answer to the prayer',
  campus: { name: 'Anderson' },
};

const navigation = {
  getParam: jest.fn(),
};

describe('the PrayerSingle component', () => {
  it('renders a prayer card', () => {
    const tree = renderer.create(
      <Providers>
        <PrayerSingle prayer={prayer} navigation={navigation} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders a prayer card with an answer', () => {
    const tree = renderer.create(
      <Providers>
        <PrayerSingle prayer={prayerWithAnswer} navigation={navigation} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
