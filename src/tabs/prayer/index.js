import React from 'react';

import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { withTheme } from '@apollosproject/ui-kit';

import { AddPrayerFormConnected } from '../../prayer/AddPrayer/AddPrayerForm';
import { AnswerPrayerFormConnected } from '../../prayer/AnswerPrayerForm';
import PrayerList from '../../prayer/PrayerList';
import PrayerSingle from '../../prayer/PrayerSingle';
import UserPrayerList from '../../prayer/UserPrayerList';
import WithYou from '../../prayer/AddPrayer/WithYou';
import Prayer from './Prayer';

const { Screen, Navigator } = createNativeStackNavigator();

const PrayerNavigator = (props) => (
  <Navigator {...props} mode="modal">
    <Screen component={Prayer} name="Prayer" options={{ headerShown: false }} />
    <Screen component={AddPrayerFormConnected} name="AddPrayerFormConnected" />
    <Screen
      component={AnswerPrayerFormConnected}
      name="AnswerPrayerFormConnected"
    />

    <Screen name="PrayerList" component={PrayerList} />
    <Screen name="UserPrayerList" component={UserPrayerList} />
    <Screen name="WithYou" component={WithYou} />
    <Screen name="PrayerSingle" component={PrayerSingle} />
  </Navigator>
);

const EnhancedPrayer = withTheme(({ theme, ...props }) => ({
  ...props,
  mode: 'modal',
  headerMode: 'none',
  screenOptions: {
    headerShown: false,
    stackPresentation: 'modal',
  },
}))(PrayerNavigator);

export default EnhancedPrayer;
