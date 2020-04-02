import React from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  LikedContentFeedConnected,
  ContentCardConnected,
} from '@apollosproject/ui-connected';
import { withTheme, FeedView } from '@apollosproject/ui-kit';

import UserSettings from '../../user-settings';
import TestingControlPanel from '../../testing-control-panel';

import tabBarIcon from '../tabBarIcon';
import Connect from './Connect';

const CustomLikedFeed = () => (
  <LikedContentFeedConnected
    Component={({ ...feedProps }) => (
      <FeedView
        ListItemComponent={({ ...cardProps }) => (
          // TODO currently doesn't work
          <ContentCardConnected labelText={''} {...cardProps} />
        )}
        {...feedProps}
      />
    )}
  />
);

const ConnectNavigator = createStackNavigator(
  {
    Connect,
    TestingControlPanel,
    UserSettings,
    LikedContentFeedConnected: CustomLikedFeed,
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
