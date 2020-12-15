import { createStackNavigator } from 'react-navigation';
import tabBarIcon from '../tabBarIcon';
import { AddPrayerFormConnected } from '../../prayer/AddPrayer/AddPrayerForm';
import { AnswerPrayerFormConnected } from '../../prayer/AnswerPrayerForm';
import PrayerList from '../../prayer/PrayerList';
import PrayerSingle from '../../prayer/PrayerSingle';
import UserPrayerList from '../../prayer/UserPrayerList';
import WithYou from '../../prayer/AddPrayer/WithYou';
import Prayer from './Prayer';

const PrayerNavigator = createStackNavigator(
  {
    Prayer,
    AddPrayerFormConnected,
    AnswerPrayerFormConnected,
    PrayerList,
    UserPrayerList,
    WithYou,
    PrayerSingle,
  },
  {
    initialRouteName: 'Prayer',
    headerMode: 'float',
    headerTransitionPreset: 'fade-in-place',
    mode: 'modal',
  }
);

// TODO: Go back and use the TAP core icon when we get an updated ui-kit
PrayerNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarIcon: tabBarIcon('prayer'),
    header: null,
  };
};

export default PrayerNavigator;
