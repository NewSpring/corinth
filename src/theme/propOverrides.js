import React from 'react';
/* Export your custom prop overrides here. */
import {
  // HorizontalDefaultCard,
  HorizontalHighlightCard,
} from '@apollosproject/ui-kit';

export default {
  'ui-connected.HorizontalContentCardConnected.HorizontalContentCardComponentMapper': {
    Component: () => (props) => <HorizontalHighlightCard {...props} />,
  },
};
