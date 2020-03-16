import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  CardContent,
  TouchableScale,
  styled,
  ChannelLabel,
  UIText,
} from '@apollosproject/ui-kit';
import { AnalyticsConsumer } from '@apollosproject/ui-analytics';
import {
  RockAuthedWebBrowser,
  LiveConsumer,
} from '@apollosproject/ui-connected';

const LiveCard = styled(({ theme }) => ({
  backgroundColor: theme.colors.lightSecondary,
}))(Card);

const LiveNowButton = ({ contentId }) => (
  <LiveConsumer contentId={contentId}>
    {(liveStream) =>
      liveStream ? (
        <AnalyticsConsumer>
          {({ track }) => (
            <RockAuthedWebBrowser>
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
            </RockAuthedWebBrowser>
          )}
        </AnalyticsConsumer>
      ) : null
    }
  </LiveConsumer>
);

LiveNowButton.propTypes = { contentId: PropTypes.string };

export default LiveNowButton;
