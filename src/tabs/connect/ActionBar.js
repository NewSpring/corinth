import React from 'react';
import Config from 'react-native-config';
import { ActionBar, ActionBarItem } from '@apollosproject/ui-kit';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { RockAuthedWebBrowser } from '@apollosproject/ui-connected';

const Toolbar = ({ navigation }) => (
  <RockAuthedWebBrowser>
    {(openUrl) => (
      <ActionBar>
        <ActionBarItem
          onPress={() =>
            openUrl(
              'https://newspring.cc/give/now',
              { externalBrowser: true },
              { useRockToken: true }
            )
          }
          icon="give"
          label="Give"
        />
        <ActionBarItem
          onPress={() =>
            openUrl('https://newspring.cc/groups', {}, { useRockToken: true })
          }
          icon="group"
          label="Join Group"
        />
        {Config.EXPERIMENTAL === 'true' ? (
          <ActionBarItem
            onPress={() => navigation.navigate('Passes')}
            icon="check"
            label="Check-in"
          />
        ) : null}
      </ActionBar>
    )}
  </RockAuthedWebBrowser>
);

Toolbar.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(Toolbar);
