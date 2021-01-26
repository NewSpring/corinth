import React from 'react';
import { Image, View } from 'react-native';
import { Mutation, Query } from '@apollo/client/react/components';
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
  AskNameConnected,
  FeaturesConnected,
  AboutYouConnected,
  LocationFinderConnected,
  OnboardingSwiper,
  onboardingComplete,
  WITH_USER_ID,
} from '@apollosproject/ui-onboarding';

import { CAMPUS_CHANGE } from '@apollosproject/ui-mapview';
import CustomLocationFinder from './CustomLocationFinder';

const ImageContainer = styled({
  justifyContent: 'flex-end',
  height: '40%',
})(View);

const StyledImage = styled({
  resizeMode: 'contain',
  height: '100%',
  width: '100%',
})(Image);

const FullscreenBackgroundView = styled({
  position: 'absolute',
  width: '100%',
  height: '100%',
})(BackgroundView);

function Onboarding({ navigation }) {
  return (
    <>
      <FullscreenBackgroundView />
      <OnboardingSwiper>
        {({ swipeForward }) => (
          <>
            <AskNameConnected
              slideTitle={"What's your name?"}
              onPressPrimary={swipeForward}
            />
            <FeaturesConnected
              description={
                'You’re almost done. By answering a few questions, we can personalize your experience so you see: \n\n\u2022 News specific to your campus \n\u2022 Articles related to your age and stage of life \n\u2022 Prayer requests for your campus and your small group'
              }
              onPressPrimary={swipeForward}
              BackgroundComponent={
                <ImageContainer>
                  <StyledImage source={require('./img/screen1.png')} />
                </ImageContainer>
              }
            />
            <AboutYouConnected
              slideTitle={'Tell us a little about yourself'}
              onPressPrimary={swipeForward}
              BackgroundComponent={
                <ImageContainer>
                  <StyledImage source={require('./img/screen2.png')} />
                </ImageContainer>
              }
            />
            <LocationFinderConnected
              description={
                'Enabling location services allows you to choose your campus so you see news, events, and groups near you.'
              }
              slideTitle={'One church in many locations'}
              onPressPrimary={swipeForward}
              onNavigate={() => {
                navigation.navigate('Location', { onFinished: swipeForward });
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
                            campusId: 'Campus:05c9c6351be882103edb1e350c77422b',
                          },
                        });
                      }}
                      {...props}
                    />
                  )}
                </Mutation>
              )}
            />
            <Query query={WITH_USER_ID} fetchPolicy="network-only">
              {({ data }) => (
                <AskNotificationsConnected
                  description={
                    'Get updates when people pray for you, and receive reminders and announcements from your NewSpring family.'
                  }
                  onPressPrimary={() => {
                    onboardingComplete({ userId: data?.currentUser?.id });
                    navigation.dispatch(
                      NavigationService.resetAction({
                        navigatorName: 'Tabs',
                        routeName: 'Home',
                      })
                    );
                  }}
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
                  BackgroundComponent={
                    <ImageContainer>
                      <StyledImage source={require('./img/screen4.png')} />
                    </ImageContainer>
                  }
                />
              )}
            </Query>
          </>
        )}
      </OnboardingSwiper>
    </>
  );
}

export default Onboarding;
