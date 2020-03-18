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
import {
  LiveConsumer,
  RockAuthedWebBrowser,
} from '@apollosproject/ui-connected';

const LiveCard = styled(({ theme }) => ({
  backgroundColor: theme.colors.lightSecondary,
}))(Card);

const renderLiveButton = ({ action }) => (
  <TouchableScale onPress={action}>
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
);

renderLiveButton.propTypes = {
  action: PropTypes.func,
};

const renderMedia = (liveStream, track) => (
  <Mutation mutation={PLAY_VIDEO}>
    {(play) =>
      renderLiveButton({
        action: () => {
          play({
            variables: {
              mediaSource: liveStream.media.sources[0],
              isVideo: true,
            },
          });
          track({ eventName: 'Clicked Live Bar' });
        },
      })
    }
  </Mutation>
);

const renderWebView = (liveStream, track) => (
  <RockAuthedWebBrowser>
    {(openUrl) =>
      renderLiveButton({
        action: () => {
          openUrl(liveStream.webViewUrl);
          track({ eventName: 'Clicked Live Bar' });
        },
      })
    }
  </RockAuthedWebBrowser>
);

const LiveNowButton = ({ contentId }) => (
  <LiveConsumer contentId={contentId}>
    {(liveStream) =>
      liveStream ? (
        <AnalyticsConsumer>
          {({ track }) => {
            return liveStream
              ? renderMedia(liveStream, track)
              : renderWebView(liveStream, track);
          }}
        </AnalyticsConsumer>
      ) : null
    }
  </LiveConsumer>
);

LiveNowButton.propTypes = { contentId: PropTypes.string };

export default LiveNowButton;
