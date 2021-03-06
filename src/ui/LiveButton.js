import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import {
  Card,
  CardContent,
  TouchableScale,
  styled,
  ChannelLabel,
  UIText,
  NavigationService,
} from '@apollosproject/ui-kit';
import { AnalyticsConsumer } from '@apollosproject/ui-analytics';
import {
  LiveConsumer,
  RockAuthedWebBrowser,
} from '@apollosproject/ui-connected';

const LiveCard = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.inactive,
}))(Card);

const renderLiveButton = (action) => (
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

const renderMedia = (liveStream, track, contentId) =>
  renderLiveButton(() => {
    NavigationService.navigate('ContentSingle', { itemId: contentId });
    track({ eventName: 'Clicked Live Bar' });
  });

const renderWebView = (liveStream, track) => (
  <RockAuthedWebBrowser>
    {(openUrl) =>
      renderLiveButton(() => {
        openUrl(liveStream.webViewUrl);
        track({ eventName: 'Clicked Live Bar' });
      })
    }
  </RockAuthedWebBrowser>
);

const LiveNowButton = ({ contentId }) => (
  <LiveConsumer contentId={contentId}>
    {(liveStream) =>
      liveStream ? (
        <AnalyticsConsumer>
          {({ track }) =>
            get(liveStream, 'media.sources[0].uri')
              ? renderMedia(liveStream, track, contentId)
              : renderWebView(liveStream, track)
          }
        </AnalyticsConsumer>
      ) : null
    }
  </LiveConsumer>
);

LiveNowButton.propTypes = { contentId: PropTypes.string };

export default LiveNowButton;
