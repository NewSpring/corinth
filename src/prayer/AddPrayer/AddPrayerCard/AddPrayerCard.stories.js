import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';

import AddPrayerCard from '.';

storiesOf('prayer/AddPrayer/AddPrayerCard', module)
  .add('default', () => <AddPrayerCard />)
  .add('description', () => (
    <AddPrayerCard
      description={
        'This is a custom card description. It sounds really good when you read it out load.'
      }
    />
  ));
