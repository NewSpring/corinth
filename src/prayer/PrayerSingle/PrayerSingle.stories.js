import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';
import { PaddedView } from '@apollosproject/ui-kit';

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

storiesOf('prayer/PrayerSingle', module).add('Example', () => (
  <PaddedView>
    <PrayerSingle prayer={prayer} />
  </PaddedView>
));
