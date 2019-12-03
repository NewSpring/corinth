import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '../../../Providers';

import AddPrayerForm from './AddPrayerForm';

describe('The AddPrayerForm component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <AddPrayerForm navigation={jest.fn()} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a custom avatar', () => {
    const tree = renderer.create(
      <Providers>
        <AddPrayerForm
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
        <AddPrayerForm
          navigation={jest.fn()}
          btnLabel={'custom button label'}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
