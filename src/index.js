/* eslint-disable react/jsx-handler-names */

import hoistNonReactStatic from 'hoist-non-react-statics';
import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import SplashScreen from 'react-native-splash-screen';
import 'react-native-gesture-handler'; // required for react-navigation
import { enableScreens } from 'react-native-screens';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';

import {
  BackgroundView,
  withTheme,
  NavigationService,
} from '@apollosproject/ui-kit';
import Passes from '@apollosproject/ui-passes';
import { RockAuthedWebBrowser } from '@apollosproject/ui-connected';
// import { CoreNavigationAnalytics } from '@apollosproject/ui-analytics';
// import PersonalDetails from './user-settings/PersonalDetails';
// import ChangePassword from './user-settings/ChangePassword';

// need to initialize error tracking at the entrypoint
// eslint-disable-next-line
import Crashes from "appcenter-crashes";
// eslint-disable-next-line
import bugsnag from "./bugsnag";

import { MapViewConnected as Location } from '@apollosproject/ui-mapview';
import Auth, { ProtectedRoute } from '@apollosproject/ui-auth';
import Prayer from './prayer';

import Providers from './Providers';
import ContentSingle from './content-single';
import NodeSingle from './node-single';
import Event from './event';
import Tabs from './tabs';
import LandingScreen from './ui/LandingScreen';
import Onboarding from './ui/Onboarding';
import Discover from './tabs/home/Discover';
import ContentFeed from './content-feed';

enableScreens(); // improves performance for react-navigation

const AppStatusBar = withTheme(({ theme }) => ({
  barStyle: theme.barStyle,
  backgroundColor: theme.colors.background.paper,
}))(StatusBar);

const ProtectedRouteWithSplashScreen = (props) => {
  const handleOnRouteChange = () => {
    SplashScreen.hide();
  };

  return <ProtectedRoute {...props} onRouteChange={handleOnRouteChange} />;
};

const EnhancedAuth = (props) => (
  <Auth
    {...props}
    emailRequired={false}
    authTitleText={'Let’s connect'}
    smsPolicyInfo={
      'We will not share your information or contact you without your permission.'
    }
    confirmationTitleText={'Thanks!'}
    confirmationPromptText={
      'We just texted you a shortcode. Enter it below, then hit next.'
    }
  />
);

// Hack to avoid needing to pass emailRequired through the navigator.navigate
// 😑
hoistNonReactStatic(EnhancedAuth, Auth);

const { Navigator, Screen } = createNativeStackNavigator();
const ThemedNavigator = withTheme(({ theme, ...props }) => ({
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
    headerShown: false,
    stackPresentation: 'modal',
  },
}))(Navigator);

const App = (props) => (
  <Providers>
    <BackgroundView>
      <AppStatusBar />
      <NavigationContainer
        ref={NavigationService.setTopLevelNavigator}
        onReady={NavigationService.setIsReady}
      >
        <ThemedNavigator initialRouteName="ProtectedRoute" {...props}>
          <Screen
            name="ProtectedRoute"
            component={ProtectedRouteWithSplashScreen}
          />
          <Screen name="Tabs" component={Tabs} options={{ title: 'Home' }} />
          <Screen
            name="ContentSingle"
            component={ContentSingle}
            options={{
              title: 'Content',
              stackPresentation: 'push',
            }}
          />
          <Screen
            name="NodeSingle"
            component={NodeSingle}
            options={{ title: 'Node' }}
          />
          <Screen name="Event" component={Event} options={{ title: 'Event' }} />
          <Screen
            name="Auth"
            component={EnhancedAuth}
            options={{
              title: 'Login',
              gestureEnabled: false,
              stackPresentation: 'push',
            }}
          />
          <Screen
            name="Location"
            component={Location}
            options={{ headerShown: true }}
          />
          <Screen
            name="Passes"
            component={Passes}
            options={{ title: 'Check-In Pass' }}
          />
          <Screen
            name="Onboarding"
            component={Onboarding}
            options={{
              title: 'Onboarding',
              gestureEnabled: false,
              stackPresentation: 'push',
            }}
          />
          <Screen
            name="LandingScreen"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Screen
            name="Prayer"
            component={Prayer}
            options={{ headerShown: false }}
          />
          <Screen
            component={Discover}
            name="Discover"
            options={{ stackPresentation: 'modal' }}
          />
          <Screen
            component={ContentFeed}
            name="ContentFeed"
            /** Function for React Navigation to set information in the header. */
            options={({ route }) => ({
              title: route.params.itemTitle || 'Content Feed',
              headerShown: true,
              stackPresentation: 'push',
            })}
          />
        </ThemedNavigator>
      </NavigationContainer>
    </BackgroundView>
  </Providers>
);

export default App;
