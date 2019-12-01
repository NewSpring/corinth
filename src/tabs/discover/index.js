import { createStackNavigator } from 'react-navigation';
import { withTheme } from '@apollosproject/ui-kit';

import ContentFeed from 'newspringchurchapp/src/content-feed';

import tabBarIcon from '../tabBarIcon';

import Discover from './Discover';

export const DiscoverNavigator = createStackNavigator(
  {
    Discover,
    ContentFeed,
  },
  {
    initialRouteName: 'Discover',
    defaultNavigationOptions: ({ screenProps }) => ({
      headerTintColor: screenProps.headerTintColor,
      headerTitleStyle: screenProps.headerTitleStyle,
    }),
    navigationOptions: { tabBarIcon: tabBarIcon('search') },
  }
);

const EnhancedDiscover = withTheme(({ theme, ...props }) => ({
  ...props,
  screenProps: {
    headerTintColor: theme.colors.action.secondary,
    headerTitleStyle: {
      color: theme.colors.text.primary,
    },
  },
}))(DiscoverNavigator);

export default EnhancedDiscover;
