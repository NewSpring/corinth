import React from 'react';
import renderer from 'react-test-renderer';
import Providers from '../../../Providers';

import SermonNotes from '.';

// const features = [
// {
// props: {
// children: [
// {
// props: {
// id: 'TextFeature:123',
// card: false,
// header: false,
// body: 'This is a text feature',
// contentId: 'WeekendContentItem:123',
// sharing: { message: 'This is a text feature' },
// },
// },
// ],
// },
// },
// ];

describe('The SermonNotes component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <SermonNotes />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with a title, series, and one speaker', () => {
    const tree = renderer.create(
      <Providers>
        <SermonNotes
          contentItem={{
            title: 'A Fun Sunday',
            communicators: [
              { firstName: 'Bradford', nickName: 'Brad', lastName: 'Cooper' },
            ],
            seriesConnection: {
              series: { title: 'A Fun Series' },
              itemIndex: 4,
            },
          }}
          // TODO figure this out, should try and snap some notes too
          // features={features}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
