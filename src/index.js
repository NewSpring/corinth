import hoistNonReactStatic from 'hoist-non-react-statics';
import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import SplashScreen from 'react-native-splash-screen';
import Analytics from 'appcenter-analytics';

import { BackgroundView, withTheme } from '@apollosproject/ui-kit';
import Passes from '@apollosproject/ui-passes';
import { MapViewConnected as Location } from '@apollosproject/ui-mapview';
import { MediaPlayer } from '@apollosproject/ui-media-player';
import Auth, { ProtectedRoute } from '@apollosproject/ui-auth';

import { AnalyticsConsumer } from '@apollosproject/ui-analytics';
import { RockAuthedWebBrowser } from '@apollosproject/ui-connected';

import Providers from './Providers';
import NavigationService from './NavigationService';
import ContentSingle from './content-single';
import Event from './event';
import Tabs from './tabs';
import PersonalDetails from './user-settings/PersonalDetails';
import ChangePassword from './user-settings/ChangePassword';

import Prayer from './prayer';
import LandingScreen from './LandingScreen';
import UserWebBrowser from './user-web-browser';
import Onboarding from './ui/Onboarding';

// need to initialize error tracking at the entrypoint
// eslint-disable-next-line
import Crashes from 'appcenter-crashes';
// eslint-disable-next-line
import bugsnag from './bugsnag';

const AppStatusBar = withTheme(({ theme }) => ({
  barStyle: 'dark-content',
  backgroundColor: theme.colors.paper,
}))(StatusBar);

const ProtectedRouteWithSplashScreen = (props) => {
  const handleOnRouteChange = () => SplashScreen.hide();

  return <ProtectedRoute {...props} onRouteChange={handleOnRouteChange} />;
};

const EnhancedAuth = (props) => (
  <RockAuthedWebBrowser>
    {(openUrl) => (
      <Query
        query={gql`
          {
            forgotPasswordURL
          }
        `}
      >
        {({ data: { forgotPasswordURL } = {} }) => (
          <Auth
            {...props}
            emailRequired={false}
            handleForgotPassword={() =>
              forgotPasswordURL ? openUrl(forgotPasswordURL) : null
            }
            authTitleText={'Let’s connect'}
            smsPolicyInfo={
              'We will not share your information or contact you without your permission.'
            }
            confirmationTitleText={'Thanks!'}
            confirmationPromptText={
              'We just texted you a shortcode. Enter it below, then hit next.'
            }
          />
        )}
      </Query>
    )}
  </RockAuthedWebBrowser>
);
// 😑
hoistNonReactStatic(EnhancedAuth, Auth);

const AppNavigator = createStackNavigator(
  {
    ProtectedRoute: ProtectedRouteWithSplashScreen,
    Tabs,
    ContentSingle,
    Event,
    Auth: EnhancedAuth,
    PersonalDetails,
    ChangePassword,
    Location,
    Passes,
    UserWebBrowser,
    Onboarding,
    LandingScreen,
    Prayer,
  },
  {
    initialRouteName: 'ProtectedRoute',
    mode: 'modal',
    headerMode: 'screen',
  }
);

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

const AppContainer = createAppContainer(AppNavigator);

const App = () => (
  <Providers>
    <BackgroundView>
      <AppStatusBar barStyle="dark-content" />
      <AnalyticsConsumer>
        {({ track }) => (
          <AppContainer
            ref={(navigatorRef) => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
            onNavigationStateChange={(prevState, currentState) => {
              const currentScreen = getActiveRouteName(currentState);
              const prevScreen = getActiveRouteName(prevState);

              if (prevScreen !== currentScreen) {
                track({
                  eventName: `Viewed ${currentScreen}`,
                });
                Analytics.trackEvent(`Viewed ${currentScreen}`);
              }
            }}
          />
        )}
      </AnalyticsConsumer>
      <MediaPlayer />
    </BackgroundView>
  </Providers>
);

export default App;
