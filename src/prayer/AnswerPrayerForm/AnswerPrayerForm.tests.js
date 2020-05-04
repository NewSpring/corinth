import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '../../Providers';

import AnswerPrayerForm from './AnswerPrayerForm';

describe('The AnswerPrayerForm component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <AnswerPrayerForm navigation={jest.fn()} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a custom avatar', () => {
    const tree = renderer.create(
      <Providers>
        <AnswerPrayerForm
          navigation={jest.fn()}
          avatarSource={{ uri: 'https://picsum.photos/55/55?random' }}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a custom title', () => {
    const tree = renderer.create(
      <Providers>
        <AnswerPrayerForm
          navigation={jest.fn()}
          btnLabel={'custom button label'}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render the prayer text', () => {
    const tree = renderer.create(
      <Providers>
        <AnswerPrayerForm
          navigation={jest.fn()}
          prayerText={'This is a prayer'}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render the prayer answer', () => {
    const tree = renderer.create(
      <Providers>
        <AnswerPrayerForm
          navigation={jest.fn()}
          prayerText={'This is a prayer'}
          prayerAnswer={'This is a prayer answer'}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
