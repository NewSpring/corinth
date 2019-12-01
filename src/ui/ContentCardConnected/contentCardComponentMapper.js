import React from 'react';
import { get } from 'lodash';

import { DefaultCard } from '@apollosproject/ui-kit';

import BrandedCard from '../BrandedCard';

const contentCardComponentMapper = (props) => {
  // map typename to the the card we want to render.
  switch (get(props, '__typename')) {
    case 'WeekendContentItem':
    case 'DevotionalContentItem':
    case 'ContentSeriesContentItem':
      return <BrandedCard {...props} />;
    default:
      return <DefaultCard {...props} />;
  }
};

export default contentCardComponentMapper;
