import React from 'react';
import { StyleSheet } from 'react-native';
import { styled, ConnectedImage } from '@apollosproject/ui-kit';

import ApollosLandingScreen from './ui/LandingScreen';

const FullScreenImage = styled({
  resizeMode: 'cover',
  ...StyleSheet.absoluteFill,
})(ConnectedImage);

const LandingScreen = ({ navigation }) => (
  <ApollosLandingScreen
    slideTitle={'Welcome to NewSpring!'}
    description={
      'The church is more than a building you go to. It’s a family you belong to.'
    }
    onPressPrimary={() => navigation.push('Auth')}
    textColor={'white'}
    BackgroundComponent={
      <FullScreenImage source={require('./ui/LandingScreen/img/landing.png')} />
    }
    primaryNavText={"Let's go!"}
  />
);

LandingScreen.navigationOptions = {
  header: null,
};

export default LandingScreen;
