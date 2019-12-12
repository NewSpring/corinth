import React from 'react';

import {
  Card,
  CardContent,
  TouchableScale,
  styled,
  ChannelLabel,
  UIText,
} from '@apollosproject/ui-kit';
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
        <WebBrowserConsumer>
          {(openUrl) => (
            <TouchableScale
              onPress={() =>
                openUrl(
                  'https://live.newspring.cc/',
                  {},
                  { useRockToken: true }
                )
              }
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
      ) : null;
    }}
  </LiveConsumer>
);

export default LiveNowButton;
