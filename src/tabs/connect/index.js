import { createStackNavigator } from 'react-navigation';
import { withTheme } from '@apollosproject/ui-kit';

import UserSettings from '../../user-settings';

import TestingControlPanel from '../../testing-control-panel';
import tabBarIcon from '../tabBarIcon';
import Connect from './Connect';
import LikedContentList from './LikedContentList';

const ConnectNavigator = createStackNavigator(
  {
    Connect,
    TestingControlPanel,
    UserSettings,
    LikedContentList,
  },
  {
    initialRouteName: 'Connect',
    headerMode: 'screen',
    defaultNavigationOptions: ({ screenProps }) => ({
      headerTintColor: screenProps.headerTintColor,
      headerTitleStyle: screenProps.headerTitleStyle,
    }),
    navigationOptions: { tabBarIcon: tabBarIcon('profile') },
  }
);

const EnhancedConnect = withTheme(({ theme, ...props }) => ({
  ...props,
  screenProps: {
    headerTintColor: theme.colors.action.secondary,
    headerTitleStyle: {
      color: theme.colors.text.primary,
    },
  },
}))(ConnectNavigator);

export default EnhancedConnect;
