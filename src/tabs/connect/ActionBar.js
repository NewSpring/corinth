import React from 'react';
import { ActionBar, ActionBarItem } from '@apollosproject/ui-kit';
import PropTypes from 'prop-types';
import { RockAuthedWebBrowser } from '@apollosproject/ui-connected';
import { AnalyticsConsumer } from '@apollosproject/ui-analytics';
import { useNavigation } from '@react-navigation/native';

const Toolbar = ({ isGroupLeader }) => {
  const navigation = useNavigation();
  return (
    <AnalyticsConsumer>
      {({ track }) => (
        <RockAuthedWebBrowser>
          {(openUrl) => (
            <ActionBar>
              <ActionBarItem
                onPress={() => {
                  track({ eventName: "Clicked 'Give'" });
                  openUrl(
                    'https://newspring.cc/give/now/?hidenav=true',
                    { externalBrowser: true },
                    { useRockToken: true }
                  );
                }}
                icon="give"
                label="Give"
              />
              {isGroupLeader ? (
                <ActionBarItem
                  onPress={() => {
                    track({ eventName: "Clicked 'My Group'" });
                    openUrl(
                      'https://newspring.cc/account/groups/?hidenav=true',
                      {},
                      { useRockToken: true }
                    );
                  }}
                  icon="group"
                  label="My Group"
                />
              ) : (
                <ActionBarItem
                  onPress={() => {
                    track({ eventName: "Clicked 'Join Group'" });
                    openUrl(
                      'https://newspring.cc/groups/?hidenav=true',
                      {},
                      { useRockToken: true }
                    );
                  }}
                  icon="group"
                  label="Join Group"
                />
              )}
              <ActionBarItem
                onPress={() => {
                  track({ eventName: 'Check-in Clicked' });
                  navigation.navigate('Passes');
                }}
                icon="check"
                label="Check-in"
              />
            </ActionBar>
          )}
        </RockAuthedWebBrowser>
      )}
    </AnalyticsConsumer>
  );
};

Toolbar.propTypes = {
  isGroupLeader: PropTypes.bool,
};

export default Toolbar;
