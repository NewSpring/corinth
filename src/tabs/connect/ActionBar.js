import React from 'react';
import Config from 'react-native-config';
import { ActionBar, ActionBarItem } from '@apollosproject/ui-kit';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { WebBrowserConsumer } from '../../ui/WebBrowser';

const Toolbar = ({ navigation }) => (
  <WebBrowserConsumer>
    {(openUrl) => (
      <ActionBar>
        <ActionBarItem
          onPress={() =>
            openUrl(
              'https://newspring.cc/give/now',
              { externalBrowser: true },
              { useRockToken: false }
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
  </WebBrowserConsumer>
);

Toolbar.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(Toolbar);
