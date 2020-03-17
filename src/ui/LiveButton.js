import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import {
  Card,
  CardContent,
  TouchableScale,
  styled,
  ChannelLabel,
  UIText,
} from '@apollosproject/ui-kit';
import { AnalyticsConsumer } from '@apollosproject/ui-analytics';
import { PLAY_VIDEO } from '@apollosproject/ui-media-player';
import { LiveConsumer } from '@apollosproject/ui-connected';

const LiveCard = styled(({ theme }) => ({
  backgroundColor: theme.colors.lightSecondary,
}))(Card);

const LiveNowButton = ({ contentId }) => (
  <LiveConsumer contentId={contentId}>
    {(liveStream) =>
      liveStream ? (
        <AnalyticsConsumer>
          {({ track }) => (
            <Mutation mutation={PLAY_VIDEO}>
              {(play) => (
                <TouchableScale
                  onPress={() => {
                    play({
                      variables: {
                        mediaSource: liveStream.media.sources[0],
                        isVideo: true,
                      },
                    });
                    track({ eventName: 'Clicked Live Bar' });
                  }}
                >
                  <LiveCard>
                    <CardContent>
                      <ChannelLabel
                        icon="video"
                        label={
                          <UIText>
                            <UIText bold>{`We're live.`} </UIText>
                            Watch now!
                          </UIText>
                        }
                      />
                    </CardContent>
                  </LiveCard>
                </TouchableScale>
              )}
            </Mutation>
          )}
        </AnalyticsConsumer>
      ) : null
    }
  </LiveConsumer>
);

LiveNowButton.propTypes = { contentId: PropTypes.string };

export default LiveNowButton;
