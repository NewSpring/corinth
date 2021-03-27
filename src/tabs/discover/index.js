import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { withTheme } from '@apollosproject/ui-kit';

import ContentFeed from '../../content-feed';

import Discover from './Discover';

const { Navigator, Screen } = createNativeStackNavigator();

const DiscoverNavigator = (props) => (
  <Navigator initialRouteName="Discover" {...props}>
    <Screen
      component={Discover}
      name="Discover"
      options={{ headerShown: false }}
    />

  </Navigator>
);
const EnhancedDiscover = withTheme(({ theme, ...props }) => ({
  ...props,
  screenOptions: {
    headerTintColor: theme.colors.action.secondary,
    headerTitleStyle: {
      color: theme.colors.text.primary,
    },
    headerStyle: {
      backgroundColor: theme.colors.background.paper,
      ...Platform.select(theme.shadows.default),
    },
    headerLargeTitle: true,
  },
}))(DiscoverNavigator);

export default EnhancedDiscover;
