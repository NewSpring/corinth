import React from 'react';

import {
  Card,
  CardContent,
  TouchableScale,
  styled,
  ChannelLabel,
  UIText,
} from '@apollosproject/ui-kit';
import { AnalyticsConsumer } from '@apollosproject/ui-analytics';
import { WebBrowserConsumer } from '../ui/WebBrowser';

import { LiveConsumer } from '.';

const LiveCard = styled(({ theme }) => ({
  backgroundColor: theme.colors.lightSecondary,
}))(Card);

const LiveNowButton = () => (
  <LiveConsumer>
    {(liveStreams) => {
      const isLive = !!liveStreams.length;

      return isLive ? (
        <AnalyticsConsumer>
          {(track) => (
            <WebBrowserConsumer>
              {(openUrl) => (
                <TouchableScale
                  onPress={() => {
                    openUrl(
                      'https://live.newspring.cc/',
                      {},
                      { useRockToken: true }
                    );
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
            </WebBrowserConsumer>
          )}
        </AnalyticsConsumer>
      ) : null;
    }}
  </LiveConsumer>
);

export default LiveNowButton;
