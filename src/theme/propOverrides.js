import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

/* Export your custom prop overrides here. */
import {
  DefaultCard,
  HighlightCard,
  HorizontalHighlightCard,
  FeaturedCard,
} from '@apollosproject/ui-kit';

import { LiveConsumer } from '@apollosproject/ui-connected';

const FeaturedCardWithLive = ({
  labelText,
  hasAction,
  actionIcon,
  ...item
}) => (
  <LiveConsumer contentId={item.id}>
    {(liveStream) => {
      const isLive = !!(liveStream && liveStream.isLive);
      return (
        <FeaturedCard
          Component={FeaturedCard}
          {...item}
          {...(isLive
            ? {
                isLive,
                hasAction: true,
                actionIcon: 'play',
                summary: 'Tap for sermon notes and more',
              }
            : { isLive, labelText, hasAction, actionIcon })} // we only want to pass `labelText` if we are NOT live. If we do we will override the default logic in the FeaturedCard\
          isFeatured
        />
      );
    }}
  </LiveConsumer>
);

FeaturedCardWithLive.propTypes = {
  labelText: PropTypes.string,
  hasAction: PropTypes.bool,
  actionIcon: PropTypes.string,
};

const VerticalCardMapper = (props) => {
  // map typename to the the card we want to render.
  const theme = {
    type: get(props, 'relatedNode.theme.type', 'light').toLowerCase(),
    colors: get(props, 'relatedNode.theme.colors') || {},
  };

  // eslint-disable-next-line
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
