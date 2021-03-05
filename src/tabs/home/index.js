import React from 'react';

import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { withTheme } from '@apollosproject/ui-kit';
import Home from './Home';

const { Screen, Navigator } = createNativeStackNavigator();

const HomeNavigator = (props) => (
  <Navigator {...props}>
    <Screen component={Home} name="Home" />
  </Navigator>
);

const EnhancedHome = withTheme(({ theme, ...props }) => ({
  ...props,
  screenOptions: {
    headerShown: false,
  },
}))(HomeNavigator);

export default EnhancedHome;
