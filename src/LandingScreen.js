import React from 'react';
import { Image } from 'react-native';
import { styled } from '@apollosproject/ui-kit';

import ApollosLandingScreen from './ui/LandingScreen';

const FullScreenImage = styled({
  resizeMode: 'cover',
  position: 'absolute',
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
      <FullScreenImage source={require('./ui/LandingScreen/img/landing.png')} />
    }
    primaryNavText={"Let's go!"}
  />
);

LandingScreen.navigationOptions = {
  header: null,
};

export default LandingScreen;
