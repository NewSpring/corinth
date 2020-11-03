import React from 'react';
import { get } from 'lodash';
/* Export your custom prop overrides here. */
import {
  DefaultCard,
  HighlightCard,
  HorizontalHighlightCard,
  FeaturedCard,
} from '@apollosproject/ui-kit';

import { LiveConsumer } from '@apollosproject/ui-connected';

const FeaturedCardWithLive = ({ contentId, labelText, ...item }) => (
  <LiveConsumer contentId={contentId}>
    {(liveStream) => {
      const isLive = !!(liveStream && liveStream.isLive);
      return (
        <FeaturedCard
          Component={FeaturedCard}
          {...(isLive
            ? {
                isLive,
              }
            : { isLive, labelText })} // we only want to pass `labelText` if we are NOT live. If we do we will override the default logic in the FeaturedCard
          {...item}
          isFeatured
        />
      );
    }}
  </LiveConsumer>
);

const VerticalCardMapper = (props) => {
  // map typename to the the card we want to render.
  const theme = {
    type: get(props, 'relatedNode.theme.type', 'light').toLowerCase(),
    colors: get(props, 'relatedNode.theme.colors') || {},
  };

  if (props.isFeatured) {
    return <FeaturedCardWithLive theme={theme} {...props} />;
  }

  switch (get(props, '__typename')) {
    case 'MediaContentItem':
    case 'WeekendContentItem':
    case 'ContentSeriesContentItem':
    case 'DevotionalContentItem':
      return <HighlightCard theme={theme} {...props} />;
    default:
      return <DefaultCard theme={theme} {...props} />;
  }
};

export default {
  'ui-connected.HorizontalContentCardConnected.HorizontalContentCardComponentMapper': {
    Component: () => (props) => <HorizontalHighlightCard {...props} />,
  },
  'ui-connected.ContentCardConnected.ContentCardComponentMapper': {
    Component: () => (props) => <VerticalCardMapper {...props} />,
  },
};
