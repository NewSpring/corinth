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
} from '@apollosproject/ui-kit';
import { LiveConsumer } from '@apollosproject/ui-connected';

import Features from '../Features';
import HorizontalContentSeriesFeedConnected from '../../ui/HorizontalContentSeriesFeedConnected';
import ContentHTMLViewConnected from '../../ui/ContentHTMLViewConnected';
import MediaControls from '../../ui/MediaControls';
import LiveIcon from '../../ui/LiveIcon';
import SermonNotes from './SermonNotes';

const FlexedScrollView = styled({ flex: 1 })(Animated.ScrollView);

const Header = styled(({ hasMedia, theme }) => ({
  paddingTop: Dimensions.get('window').width * 0.5, // for some reason % based padding still is buggy
  alignItems: 'flex-start',
  paddingBottom: hasMedia ? theme.sizing.baseUnit : theme.sizing.baseUnit * 2,
}))(PaddedView);

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
                        <CardLabel
                          isLive={!!liveStream}
                          title={
                            liveStream
                              ? 'Live'
                              : content.parentChannel &&
                                content.parentChannel.name.split(' - ').pop()
                          }
                          IconComponent={liveStream ? LiveIcon : null}
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
                <SermonNotes contentID={content.id} />
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
    videos: PropTypes.arrayOf(PropTypes.shape({ sources: PropTypes.array })),
  }),
  loading: PropTypes.bool,
};

export default WeekendContentItem;
