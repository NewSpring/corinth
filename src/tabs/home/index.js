import React from 'react';

import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { withTheme } from '@apollosproject/ui-kit';
import ContentSingle from '../../content-single';
import Home from './Home';
import Discover from './Discover';

const { Screen, Navigator } = createNativeStackNavigator();

const HomeNavigator = (props) => (
  <Navigator {...props}>
    <Screen component={Home} name="Home" />
    <Screen
      component={Discover}
      name="Discover"
      options={{ stackPresentation: 'modal' }}
    />
    <Screen
      name="ContentSingle"
      component={ContentSingle}
      options={{ title: 'Content', stackPresentation: 'modal' }}
    />
  </Navigator>
);

const EnhancedHome = withTheme(({ theme, ...props }) => ({
  ...props,
  screenOptions: {
    headerShown: false,
  },
}))(HomeNavigator);

export default EnhancedHome;
