import React from 'react';
import PropTypes from 'prop-types';
import Config from 'react-native-config';

import {
  CardLabel,
  HorizontalDefaultCard,
  HorizontalHighlightCard,
  ThemeConsumer,
} from '@apollosproject/ui-kit';

const StyledHorizontalHightlightCard = ({
  hyphenatedTitle,
  labelText,
  labelTheme,
  coverImage,
  ...props
}) => (
  <ThemeConsumer>
    {({ type }) => (
      <HorizontalHighlightCard
        {...props}
        title={hyphenatedTitle}
        coverImage={coverImage ? coverImage.sources : null}
        LabelComponent={
          Config.EXPERIMENTAL === 'true' ? (
            <CardLabel
              type={
                type === 'light' && labelTheme !== 'light'
                  ? 'darkOverlay'
                  : undefined
              }
              title={labelText}
            />
          ) : null
        }
      />
    )}
  </ThemeConsumer>
);

StyledHorizontalHightlightCard.propTypes = {
  hyphenatedTitle: PropTypes.string,
  labelText: PropTypes.string,
  labelTheme: PropTypes.oneOf('light', 'dark'),
  coverImage: PropTypes.shape({
    sources: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
  }),
};

const horizontalContentCardComponentMapper = ({
  title,
  hyphenatedTitle,
  ...props
}) => {
  // map typename to the the card we want to render.
  const {
    __typename: typename,
    seriesConnection: { itemCount, itemIndex } = {},
    videos = [],
  } = props;

  switch (typename) {
    case 'ContentSeriesContentItem':
      return <HorizontalHighlightCard {...props} labelText={null} />;
    case 'MediaContentItem':
      return (
        <HorizontalHighlightCard
          title={hyphenatedTitle}
          {...props}
          labelText={null}
        />
      );
    case 'WeekendContentItem':
      return (
        <StyledHorizontalHightlightCard
          {...props}
          hyphenatedTitle={hyphenatedTitle}
          labelText={itemIndex ? `Week ${itemIndex}` : ''}
          labelTheme={'light'}
          theme={'light'}
          coverImage={videos.length ? videos[0].thumbnail : null}
        />
      );
    case 'DevotionalContentItem':
      return (
        <StyledHorizontalHightlightCard
          {...props}
          hyphenatedTitle={hyphenatedTitle}
          labelText={
            itemIndex && itemCount ? `${itemIndex} of ${itemCount}` : ''
          }
          coverImage={null}
        />
      );
    default:
      return <HorizontalDefaultCard title={title} {...props} />;
  }
};

horizontalContentCardComponentMapper.propTypes = {
  hyphenatedTitle: PropTypes.string,
  title: PropTypes.string,
  theme: PropTypes.shape({
    type: PropTypes.string,
  }),
  __typename: PropTypes.string,
  seriesConnection: PropTypes.shape({
    itemCount: PropTypes.number,
    itemIndex: PropTypes.number,
  }),
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      thumbnail: PropTypes.shape({
        sources: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
      }),
    })
  ),
};

export default horizontalContentCardComponentMapper;
