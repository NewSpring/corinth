import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { withTheme } from '@apollosproject/ui-kit';

import Connect from './connect';
import Home from './home';
import Read from './discover';
import Prayer from './prayer';
import tabBarIcon from './tabBarIcon';

const { Navigator, Screen } = createBottomTabNavigator();

const TabNavigator = (props) => (
  <Navigator {...props} screenOptions={{ headerMode: 'none' }} lazy>
    <Screen
      name="Home"
      component={Home}
      options={{ tabBarIcon: tabBarIcon('home'), headerShown: false }}
    />
    <Screen
      name="Read"
      component={Read}
      options={{ tabBarIcon: tabBarIcon('discover') }}
    />
    <Screen
      name="Prayer"
      component={Prayer}
      options={{ tabBarIcon: tabBarIcon('prayer') }}
    />
    <Screen
      name="Connect"
      component={Connect}
      options={{ tabBarIcon: tabBarIcon('connect') }}
    />
  </Navigator>
);

const ThemedTabNavigator = withTheme(({ theme }) => ({
  tabBarOptions: {
    activeTintColor: theme?.colors?.secondary,
    inactiveTintColor: theme?.colors?.text?.tertiary,
    style: {
      backgroundColor: theme?.colors?.background?.paper,
      borderTopColor: theme?.colors?.shadows.default,
      ...Platform.select(theme?.shadows.default),
    },
  },
}))(TabNavigator);

export default ThemedTabNavigator;
