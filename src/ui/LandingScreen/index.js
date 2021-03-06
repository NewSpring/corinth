import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { styled } from '@apollosproject/ui-kit';

import ApollosLandingScreen from './LandingScreen';

const FullScreenImage = styled({
  resizeMode: 'cover',
  ...StyleSheet.absoluteFill,
  width: '100%',
  height: '100%',
})(Image);

const LandingScreen = ({ navigation }) => (
  <ApollosLandingScreen
    slideTitle={'Welcome to NewSpring!'}
    description={
      'The church is more than a building you go to. It’s a family you belong to.'
    }
    onPressPrimary={() => navigation.push('Auth')}
    textColor={'white'}
    BackgroundComponent={
      <FullScreenImage source={require('./img/landing.png')} />
    }
    primaryNavText={"Let's go!"}
  />
);

export default LandingScreen;
