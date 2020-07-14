import React from 'react';
import ApollosConfig from '@apollosproject/config';
import { Providers, NavigationService } from '@apollosproject/ui-kit';
import { AuthProvider } from '@apollosproject/ui-auth';
import { AnalyticsProvider } from '@apollosproject/ui-analytics';
import { MediaPlayerProvider } from '@apollosproject/ui-media-player';
import { NotificationsProvider } from '@apollosproject/ui-notifications';
import { LiveProvider } from '@apollosproject/ui-connected';

import ClientProvider, { client } from './client';
import ExternalLinkProvider from './linking/Provider';
import track from './analytics';
import customTheme, { customIcons } from './theme';
import { checkOnboardingStatusAndNavigate } from './ui/Onboarding/onboardingStatus';

const AppProviders = (props) => (
  <ClientProvider {...props}>
    <NotificationsProvider
      oneSignalKey={ApollosConfig.ONE_SIGNAL_KEY}
      navigate={NavigationService.navigate}
    >
      <AuthProvider
        navigateToAuth={() => NavigationService.navigate('Auth')}
        navigate={NavigationService.navigate}
        closeAuth={() =>
          checkOnboardingStatusAndNavigate({
            client,
            navigation: NavigationService,
          })
        }
      >
        <ExternalLinkProvider navigate={NavigationService.navigate}>
          <MediaPlayerProvider>
            <AnalyticsProvider trackFunctions={[track]}>
              <LiveProvider>
                <Providers
                  themeInput={customTheme}
                  iconInput={customIcons}
                  {...props}
                />
              </LiveProvider>
            </AnalyticsProvider>
          </MediaPlayerProvider>
        </ExternalLinkProvider>
      </AuthProvider>
    </NotificationsProvider>
  </ClientProvider>
);

export default AppProviders;
