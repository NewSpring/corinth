import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import InAppBrowser from 'react-native-inappbrowser-reborn';
/* Export your custom prop overrides here. */
import {
  DefaultCard,
  HighlightCard,
  HorizontalHighlightCard,
  FeaturedCard,
} from '@apollosproject/ui-kit';

import {
  LiveConsumer,
  AddComentFeatureConnected,
} from '@apollosproject/ui-connected';
import LiveButton from '../ui/LiveButton';

const FeaturedCardWithLive = ({
  labelText,
  hasAction,
  actionIcon,
  ...item
}) => (
  <>
    <LiveButton contentId={item.id} />
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
  </>
);

FeaturedCardWithLive.propTypes = {
  labelText: PropTypes.string,
  hasAction: PropTypes.bool,
  actionIcon: PropTypes.string,
};

const VerticalCardMapper = (props) => {
  // map typename to the the card we want to render.
  // eslint-disable-next-line
  const possibleTheme = props.cardTheme || props?.relatedNode?.theme;

  const theme = {
    type: get(possibleTheme, 'type', 'dark').toLowerCase(),
    colors: get(possibleTheme, 'colors') || {},
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
  'ui-connected.FeaturesFeed.FeatureFeedComponentMapper': {
    additionalFeatures: { AddCommentFeature: AddComentFeatureConnected },
  },
  'ui-connected.ContentHTMLViewConnected': {
    onPressAnchor: () => (url) => InAppBrowser.open(url),
  },
  'ui-connected.ContentNodeConnected': {
    onPressAnchor: () => (url) => InAppBrowser.open(url),
  },
};
