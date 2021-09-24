import querystring from 'querystring';
import React from 'react';
import ApollosConfig from '@apollosproject/config';
import { Providers, NavigationService } from '@apollosproject/ui-kit';
import { AuthProvider } from '@apollosproject/ui-auth';
import { AnalyticsProvider } from '@apollosproject/ui-analytics';

import { checkOnboardingStatusAndNavigate } from '@apollosproject/ui-onboarding';
import {
  LiveProvider,
  ACCEPT_FOLLOW_REQUEST,
} from '@apollosproject/ui-connected';
import ExternalLinkProvider from './linking/Provider';
import track from './analytics';
import { ONBOARDING_VERSION } from './ui/Onboarding';

import ClientProvider, { client } from './client';
import customTheme, { customIcons } from './theme';

const AppProviders = (props) => (
  <ClientProvider {...props}>
    <ExternalLinkProvider
      oneSignalKey={ApollosConfig.ONE_SIGNAL_KEY}
      navigate={NavigationService.navigate}
      actionMap={{
        // accept a follow request when someone taps "accept" in a follow request push notification
        acceptFollowRequest: ({ requestPersonId }) =>
          client.mutate({
            mutation: ACCEPT_FOLLOW_REQUEST,
            variables: { personId: requestPersonId },
          }),
      }}
      handleExternalLink={(url) => {
        let path;
        if (url.includes('app-link')) {
          path = url.split('app-link/')[1];
        } else {
          path = url.split('://')[1];
        }
        const [route, location] = path.split('/');
        if (route === 'content')
          NavigationService.navigate('ContentSingle', { itemId: location });
        if (route === 'nav') {
          const [component, params] = location.split('?');
          const args = querystring.parse(params);
          NavigationService.navigate(
            // turns "home" into "Home"
            component[0].toUpperCase() + component.substring(1),
            args
          );
        }
      }}
    >
      <AuthProvider
        navigateToAuth={() => NavigationService.navigate('Auth')}
        navigate={NavigationService.navigate}
        closeAuth={() =>
          checkOnboardingStatusAndNavigate({
            client,
            navigation: NavigationService,
            latestOnboardingVersion: ONBOARDING_VERSION,
          })
        }
      >
        <AnalyticsProvider trackFunctions={[track]} useServerAnalytics={false}>
          <LiveProvider>
            <Providers
              themeInput={customTheme}
              iconInput={customIcons}
              {...props}
            />
          </LiveProvider>
        </AnalyticsProvider>
      </AuthProvider>
    </ExternalLinkProvider>
  </ClientProvider>
);

export default AppProviders;
