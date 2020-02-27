import React from 'react';
import { Animated, Dimensions } from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import {
  styled,
  GradientOverlayImage,
  BackgroundView,
  PaddedView,
  H2,
  StretchyView,
  ThemeMixin,
  ThemeConsumer,
  CardLabel,
  withTheme,
} from '@apollosproject/ui-kit';
import { LiveConsumer } from '@apollosproject/ui-connected';

import Features from '../Features';
import HorizontalContentSeriesFeedConnected from '../../ui/HorizontalContentSeriesFeedConnected';
import ContentHTMLViewConnected from '../../ui/ContentHTMLViewConnected';
import MediaControls from '../../ui/MediaControls';

const FlexedScrollView = styled({ flex: 1 })(Animated.ScrollView);

const Header = styled(({ hasMedia, theme }) => ({
  paddingTop: Dimensions.get('window').width * 0.5, // for some reason % based padding still is buggy
  alignItems: 'flex-start',
  paddingBottom: hasMedia ? theme.sizing.baseUnit : theme.sizing.baseUnit * 2,
  // backgroundColor: theme.colors.primary,
}))(PaddedView);

const LiveAwareLabel = withTheme(({ isLive, title, theme }) => ({
  ...(isLive
    ? {
        title: 'Live',
        type: 'secondary',
        icon: 'live-dot',
        iconSize: theme.helpers.rem(0.4375), // using our typographic size unit based on fontSize so that the icon scales correctly with font size changes.
      }
    : {
        title,
      }),
}))(CardLabel);

const WeekendContentItem = ({ content, loading }) => {
  const coverImageSources = get(content, 'coverImage.sources', []);
  return (
    <ThemeConsumer>
      {(theme) => (
        <BackgroundView>
          <StretchyView>
            {({ Stretchy, ...scrollViewProps }) => (
              <FlexedScrollView {...scrollViewProps}>
                <Header hasMedia={content.videos && content.videos.sources}>
                  <ThemeMixin mixin={{ type: 'dark' }}>
                    {coverImageSources.length || loading ? (
                      <Stretchy
                        background
                        style={{ backgroundColor: theme.colors.primary }}
                      >
                        <GradientOverlayImage
                          isLoading={!coverImageSources.length && loading}
                          overlayColor={theme.colors.primary}
                          overlayType="featured"
                          source={coverImageSources}
                        />
                      </Stretchy>
                    ) : null}
                    <LiveConsumer contentId={content.id}>
                      {(liveStream) => (
                        <LiveAwareLabel
                          isLive={!!liveStream}
                          title={
                            content.parentChannel &&
                            content.parentChannel.name.split(' - ').pop()
                          }
                        />
                      )}
                    </LiveConsumer>
                    <H2 padded isLoading={!content.title && loading}>
                      {content.title}
                    </H2>
                    <ContentHTMLViewConnected contentId={content.id} />
                  </ThemeMixin>
                </Header>
                <MediaControls contentId={content.id} />
                <PaddedView />
                <Features contentId={content.id} asNotes />
                <HorizontalContentSeriesFeedConnected contentId={content.id} />
              </FlexedScrollView>
            )}
          </StretchyView>
        </BackgroundView>
      )}
    </ThemeConsumer>
  );
};

WeekendContentItem.propTypes = {
  content: PropTypes.shape({
    __typename: PropTypes.string,
    parentChannel: PropTypes.shape({
      name: PropTypes.string,
    }),
    id: PropTypes.string,
    title: PropTypes.string,
    theme: PropTypes.shape({}),
    videos: PropTypes.shape({
      sources: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
    }),
  }),
  loading: PropTypes.bool,
};

export default WeekendContentItem;
