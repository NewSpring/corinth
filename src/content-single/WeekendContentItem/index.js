import React from 'react';
import { Dimensions } from 'react-native';
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
import MediaControls from '../MediaControls';
import HTMLContent from '../HTMLContent';
import HorizontalContentFeed from '../HorizontalContentFeed';
import Features from '../Features';
import { LiveConsumer } from '../../live';
import CustomAvoidingScrollView from './CustomAvoidingScrollView';

const FlexedScrollView = styled({ flex: 1 })(CustomAvoidingScrollView);

const Header = styled(({ hasMedia, theme }) => ({
  paddingTop: Dimensions.get('window').width * 0.8, // for some reason % based padding still is buggy
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
      {(theme) => {
        const overlayColor =
          get(content, 'theme.colors.primary') ||
          (loading ? theme.colors.lightTertiary : theme.colors.primary);
        return (
          <BackgroundView>
            <StretchyView>
              {({ Stretchy, ...scrollViewProps }) => (
                <FlexedScrollView {...scrollViewProps}>
                  <Header hasMedia={content.videos && content.videos.sources}>
                    <ThemeMixin
                      mixin={{
                        type: (
                          get(content, 'theme.type') || 'dark'
                        ).toLowerCase(),
                      }}
                    >
                      {coverImageSources.length || loading ? (
                        <Stretchy
                          background
                          style={{ backgroundColor: overlayColor }}
                        >
                          <GradientOverlayImage
                            isLoading={!coverImageSources.length && loading}
                            overlayColor={overlayColor}
                            source={coverImageSources}
                          />
                        </Stretchy>
                      ) : null}
                      <LiveConsumer contentId={content.id}>
                        {(liveStream) => (
                          <LiveAwareLabel
                            type={
                              get(content, 'theme.type') === 'LIGHT'
                                ? 'darkOverlay'
                                : undefined
                            }
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
                      <HTMLContent contentId={content.id} />
                    </ThemeMixin>
                  </Header>
                  <MediaControls contentId={content.id} />
                  <PaddedView />
                  <Features contentId={content.id} asNotes />
                  <HorizontalContentFeed contentId={content.id} />
                </FlexedScrollView>
              )}
            </StretchyView>
          </BackgroundView>
        );
      }}
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
    videos: PropTypes.arrayOf(
      PropTypes.shape({
        sources: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
      })
    ),
  }),
  loading: PropTypes.bool,
};

export default WeekendContentItem;
