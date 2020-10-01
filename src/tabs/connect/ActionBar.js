import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { ActionBar, ActionBarItem } from '@apollosproject/ui-kit';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { RockAuthedWebBrowser } from '@apollosproject/ui-connected';
import { AnalyticsConsumer } from '@apollosproject/ui-analytics';

const Toolbar = ({ navigation, isGroupLeader }) => (
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
            <Query
              query={gql`
                {
                  currentUser {
                    id
                    profile {
                      id
                      testGroups {
                        id
                        name
                      }
                    }
                  }
                }
              `}
              fetch-policy={'cache-and-network'}
            >
              {({ data, loading, error }) => {
                if (loading) return null;
                if (error) return null;
                return data.currentUser.profile.testGroups.filter(
                  ({ name }) => name === 'Experimental Features'
                ).length ? (
                  <ActionBarItem
                    onPress={() => navigation.navigate('Passes')}
                    icon="check"
                    label="Check-in"
                  />
                ) : null;
              }}
            </Query>
          </ActionBar>
        )}
      </RockAuthedWebBrowser>
    )}
  </AnalyticsConsumer>
);

Toolbar.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  isGroupLeader: PropTypes.bool,
};

export default withNavigation(Toolbar);
