import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import Providers from '../../Providers';

import AnswerPrayerForm from './AnswerPrayerForm';

describe('The AnswerPrayerForm component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <AnswerPrayerForm navigation={jest.fn()} prayer={{ id: 1 }} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a custom avatar', () => {
    const tree = renderer.create(
      <Providers>
        <AnswerPrayerForm
          navigation={jest.fn()}
          prayer={{ id: 1 }}
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
          prayer={{ id: 1 }}
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
          prayer={{
            id: 1,
            text: 'This is a prayer',
          }}
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
          prayer={{
            id: 1,
            text: 'This is a prayer',
            answer: 'This is a prayer answer',
          }}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render something passed in the action prop', () => {
    const tree = renderer.create(
      <Providers>
        <AnswerPrayerForm
          navigation={jest.fn()}
          prayer={{
            id: 1,
            text: 'This is a prayer',
            answer: 'This is a prayer answer',
          }}
          action={<Text>Remove answer</Text>}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
