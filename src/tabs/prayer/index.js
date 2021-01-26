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
  <Navigator {...props}>
    <Screen
      component={Prayer}
      name="Prayer"
      options={{ headerShown: false }}
    />
    <Screen
      component={AddPrayerFormConnected}
      name="AddPrayerFormConnected"
      options={{ headerShow: false }}
    />
    <Screen
      component={AnswerPrayerFormConnected}
      name="AnswerPrayerFormConnected"
      options={{ headerShow: false }}
    />

    <Screen
      name="PrayerList"
      component={PrayerList}
      options={{ headerShow: false }}
    />
    <Screen
      name="UserPrayerList"
      component={UserPrayerList}
      options={{ headerShow: false }}
    />
    <Screen
      name="WithYou"
      component={WithYou}
      options={{ headerShow: false }}
    />    
    <Screen
      name="PrayerSingle"
      component={PrayerSingle}
      options={{ headerShow: false }}
    />        
    <Screen
      component={LikedContentFeedConnected}
      name="LikedContentFeedConnected"
      options={{ headerTitle: 'Your Likes' }}
    />
  </Navigator>
);

const EnhancedPrayer = withTheme(({ theme, ...props }) => ({
  ...props,
  screenOptions: {
    headerTintColor: theme.colors.action.secondary,
    headerTitleStyle: {
      color: theme.colors.text.primary,
    },
    headerStyle: {
      backgroundColor: theme.colors.background.paper,
    },
    headerLargeTitle: true,
  },
}))(PrayerNavigator);

// const PrayerNavigator = createStackNavigator(
//   {
//     Prayer,
//     AddPrayerFormConnected,
//     AnswerPrayerFormConnected,
//     PrayerList,
//     UserPrayerList,
//     WithYou,
//     PrayerSingle,
//   },
//   {
//     initialRouteName: 'Prayer',
//     headerMode: 'float',
//     headerTransitionPreset: 'fade-in-place',
//     mode: 'modal',
//   }
// );
// 
// // TODO: Go back and use the TAP core icon when we get an updated ui-kit
// PrayerNavigator.navigationOptions = ({ navigation }) => {
//   let tabBarVisible = true;
//   if (navigation.state.index > 0) {
//     tabBarVisible = false;
//   }
// 
//   return {
//     tabBarVisible,
//     tabBarIcon: tabBarIcon('prayer'),
//     header: null,
//   };
// };

export default EnhancedPrayer;
