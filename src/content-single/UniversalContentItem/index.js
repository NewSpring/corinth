import React from 'react';
import { Animated } from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import {
  styled,
  GradientOverlayImage,
  PaddedView,
  H2,
  StretchyView,
  FlexedView,
  Button,
  withTheme,
} from '@apollosproject/ui-kit';
import {
  UpNextButtonConnected,
  ContentSingleFeaturesConnected,
} from '@apollosproject/ui-connected';

import HorizontalContentSeriesFeedConnected from '../../ui/HorizontalContentSeriesFeedConnected';
import ContentHTMLViewConnected from '../../ui/ContentHTMLViewConnected';
import MediaControls from '../../ui/MediaControls';

const FlexedScrollView = styled({ flex: 1 })(Animated.ScrollView);

const StyledMediaControls = styled(({ theme }) => ({
  marginTop: -(theme.sizing.baseUnit * 2.5),
}))(MediaControls);

const StyledBackgroundView = styled(
  ({
    theme: {
      colors: { primary, paper },
    },
    hasCustomTheme,
  }) => ({
    backgroundColor: hasCustomTheme ? primary : paper,
  })
)(FlexedView);

const UpNextButton = withTheme(
  ({
    theme: {
      sizing: { baseUnit },
      colors: {
        text: { primary },
      },
    },
  }) => ({
    style: {
      marginHorizontal: baseUnit,
      borderColor: primary,
      borderWidth: 1,
      borderStyle: 'solid',
    },
    type: 'primaryWithDarkMode',
  }),
  'ui-connected.UpNextButtonConnected.UpNextButton'
)(Button);

const UniversalContentItem = ({ content, loading }) => {
  const coverImageSources = get(content, 'coverImage.sources', []);
  return (
    <StyledBackgroundView hasCustomTheme={!!content?.theme?.colors?.primary}>
      <StretchyView>
        {({ Stretchy, ...scrollViewProps }) => (
          <FlexedScrollView {...scrollViewProps}>
            {coverImageSources.length || loading ? (
              <Stretchy>
                <GradientOverlayImage
                  isLoading={!coverImageSources.length && loading}
                  source={coverImageSources}
                />
              </Stretchy>
            ) : null}
            <StyledMediaControls contentId={content.id} />
            {/* fixes text/navigation spacing by adding vertical padding if we dont have an image */}
            <PaddedView vertical={!coverImageSources.length}>
              <H2 padded isLoading={!content.title && loading}>
                {content.title}
              </H2>
              <ContentHTMLViewConnected contentId={content.id} />
            </PaddedView>
            <ContentSingleFeaturesConnected contentId={content.id} />
            <UpNextButtonConnected
              Component={UpNextButton}
              contentId={content.id}
            />
            <HorizontalContentSeriesFeedConnected contentId={content.id} />
          </FlexedScrollView>
        )}
      </StretchyView>
    </StyledBackgroundView>
  );
};

UniversalContentItem.propTypes = {
  content: PropTypes.shape({
    __typename: PropTypes.string,
    parentChannel: PropTypes.shape({
      name: PropTypes.string,
    }),
    id: PropTypes.string,
    htmlContent: PropTypes.string,
    title: PropTypes.string,
    scriptures: PropTypes.arrayOf(
      PropTypes.shape({
        /** The ID of the verse (i.e. '1CO.15.57') */
        id: PropTypes.string,
        /** A human readable reference (i.e. '1 Corinthians 15:57') */
        reference: PropTypes.string,
        /** The scripture source to render */
        html: PropTypes.string,
      })
    ),
  }),
  loading: PropTypes.bool,
};

export default UniversalContentItem;
