import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';
import { PaddedView } from '@apollosproject/ui-kit';

import SaveButton from '.';

storiesOf('prayer/SaveButton', module).add('default', () =>
  (
    <PaddedView>
      <SaveButton />
    </PaddedView>
  ).add('Saved', () => (
    <PaddedView>
      <SaveButton saved />
    </PaddedView>
  ))
);
