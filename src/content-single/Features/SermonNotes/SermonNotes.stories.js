import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';

import SermonNotes from '.';

const features = [
  {
    props: {
      children: [
        {
          props: {
            id: 'TextFeature:123',
            card: false,
            header: false,
            body: 'This is a text feature',
            contentId: 'WeekendContentItem:123',
            sharing: { message: 'This is a text feature' },
          },
        },
      ],
    },
  },
];

storiesOf('features/SermonNotes', module)
  .add('default', () => <SermonNotes />)
  .add('one speaker', () => (
    <SermonNotes
      title={'A Fun Sunday'}
      series={'A Fun Series'}
      communicators={[
        { firstName: 'Bradford', nickName: 'Brad', lastName: 'Cooper' },
      ]}
      features={features}
    />
  ));
