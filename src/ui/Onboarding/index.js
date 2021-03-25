import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { Query, Mutation } from '@apollo/client/react/components';
import PropTypes from 'prop-types';
import {
  checkNotifications,
  openSettings,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';
import {
  styled,
  BackgroundView,
  NavigationService,
} from '@apollosproject/ui-kit';
import {
  AskNotificationsConnected,
  LocationFinderConnected,
  FollowConnected,
  OnboardingSwiper,
  onboardingComplete,
  WITH_USER_ID,
} from '@apollosproject/ui-onboarding';

import { CAMPUS_CHANGE } from '@apollosproject/ui-mapview';
import CustomLocationFinder from './CustomLocationFinder';

const ImageContainer = styled({
  justifyContent: 'flex-end',
  paddingTop: 24,
  height: Dimensions.get('window').height * 0.4,
})(View);

const StyledImage = styled({
  height: '100%',
  width: '100%',
})(Image);

const FullscreenBackgroundView = styled({
  position: 'absolute',
  width: '100%',
  height: '100%',
})(BackgroundView);

export const ONBOARDING_VERSION = 2;

function Onboarding({ navigation, route }) {
  const userVersion = route?.params?.userVersion || 0;
  return (
    <Query query={WITH_USER_ID} fetchPolicy="network-only">
      {({ data }) => (
        <>
          <FullscreenBackgroundView />
          <OnboardingSwiper
            userVersion={userVersion}
            onComplete={() => {
              onboardingComplete({
                userId: data?.currentUser?.id,
                version: ONBOARDING_VERSION,
              });
              navigation.dispatch(
                NavigationService.resetAction({
                  navigatorName: 'Tabs',
                  routeName: 'Home',
                })
              );
            }}
          >
            {({ swipeForward }) => (
              <>
                <LocationFinderConnected
                  description={
                    'Enabling location services allows you to choose your campus so you see news, events, and groups near you.'
                  }
                  slideTitle={'One church in many locations'}
                  onPressPrimary={swipeForward}
                  onNavigate={() => {
                    navigation.navigate('Location', {
                      onFinished: swipeForward,
                    });
                  }}
                  BackgroundComponent={
                    <ImageContainer>
                      <StyledImage source={require('./img/screen3.png')} />
                    </ImageContainer>
                  }
                  Component={({ ...props }) => (
                    <Mutation mutation={CAMPUS_CHANGE}>
                      {(campusChange) => (
                        <CustomLocationFinder
                          onSelectWeb={() => {
                            swipeForward();
                            campusChange({
                              variables: {
                                // web campus
                                campusId:
                                  'Campus:05c9c6351be882103edb1e350c77422b',
                              },
                            });
                          }}
                          {...props}
                        />
                      )}
                    </Mutation>
                  )}
                />
                <FollowConnected
                  onPressPrimary={swipeForward}
                  version={2}
                  BackgroundComponent={
                    <ImageContainer>
                      <StyledImage source={require('./img/screen1.png')} />
                    </ImageContainer>
                  }
                />
                <AskNotificationsConnected
                  description={
                    'Get updates when people pray for you, and receive reminders and announcements from your NewSpring family.'
                  }
                  onRequestPushPermissions={(update) => {
                    checkNotifications().then((checkRes) => {
                      if (checkRes.status === RESULTS.DENIED) {
                        requestNotifications(['alert', 'badge', 'sound']).then(
                          () => {
                            update();
                          }
                        );
                      } else {
                        openSettings();
                      }
                    });
                  }}
                  primaryNavText={'Finish'}
                  onPressPrimary={swipeForward}
                  BackgroundComponent={
                    <ImageContainer>
                      <StyledImage source={require('./img/screen4.png')} />
                    </ImageContainer>
                  }
                />
              </>
            )}
          </OnboardingSwiper>
        </>
      )}
    </Query>
  );
}

export default Onboarding;

Onboarding.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      userVersion: PropTypes.number,
    }),
  }),
};
