import React from 'react';
import { Animated } from 'react-native';
import ApollosConfig from '@apollosproject/config';
import FRAGMENTS from '@apollosproject/ui-fragments';
import 'react-native/Libraries/Animated/src/bezier';

ApollosConfig.loadJs({ FRAGMENTS });

jest.mock('@react-native-community/datetimepicker', () => 'DateTimePicker');

ApollosConfig.loadJs({
  ONE_SIGNAL_KEY: 'doesntmatter',
});

Animated.timing = (value, config) => ({
  start: (callback) => {
    value.setValue(config.toValue);
    callback && callback({ finished: true });
  },
  stop: () => ({}),
});
Animated.spring = (value, config) => ({
  start: (callback) => {
    value.setValue(config.toValue);
    callback && callback({ finished: true });
  },
  stop: () => ({}),
});
// jest.mock('NativeAnimatedHelper');

jest.mock('react-native-safari-view', () => ({
  isAvailable: jest.fn().mockImplementation(() => Promise.resolve(true)),
  show: jest.fn(),
  default: require.requireActual('react-native').SafeAreaView,
}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaConsumer: ({ children }) =>
    children({ top: 0, bottom: 0, left: 0, right: 0 }),
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: jest.requireActual('react-native').SafeAreaView,
}));

jest.mock('react-native-device-info', () => ({
  getUniqueId: () => 'id-123',
  getSystemVersion: () => 'sys-version-123',
  getModel: () => 'ios',
  getVersion: () => 'version-123',
  getBuildNumber: () => 0,
}));

jest.mock('rn-fetch-blob', () => 'Fetch');

jest.mock('@apollosproject/ui-analytics', () => ({
  track: () => '',
  AnalyticsConsumer: ({ children }) => children({ test: jest.fn() }),
  AnalyticsProvider: ({ children }) => children,
  CoreNavigationAnalytics: ({ children }) =>
    children({ onNavigationStateChange: jest.fn() }),
  TrackEventWhenLoaded: () => null,
  withTrackOnPress: (Component) => (props) => <Component {...props} />,
}));

jest.mock('@apollosproject/ui-kit', () => ({
  ...require.requireActual('@apollosproject/ui-kit'),
  NavigationService: {
    navigate: jest.fn(),
    setTopLevelNavigator: jest.fn(),
  },
}));

jest.mock('@apollosproject/ui-notifications', () => ({
  NotificationsProvider: ({ children }) => children,
}));

jest.mock('@apollosproject/ui-mapview', () => ({
  MapViewConnected: 'MapViewConnected',
}));

jest.mock('@apollosproject/ui-media-player', () => ({
  MediaPlayerSpacer: ({ children }) => children,
  MediaPlayer: () => 'MediaPlayer',
  MediaPlayerProvider: ({ children }) => children,
  playVideoMutation: 'mutation { playVideo }',
  withTabBarMediaSpacer: () => ({ children }) => children,
}));

jest.mock('react-native-amplitude-analytics', () => {
  class AnalyticsMock {
    static logEvent() {
      return null;
    }
  }
  return AnalyticsMock;
});

jest.mock('react-native-reanimated', () => ({
  Value: jest.fn(),
  onChange: jest.fn(),
  abs: jest.fn(),
  add: jest.fn(),
  and: jest.fn(),
  block: jest.fn(),
  call: jest.fn(),
  clockRunning: jest.fn(),
  cond: jest.fn(),
  divide: jest.fn(),
  eq: jest.fn(),
  event: jest.fn(),
  greaterThan: jest.fn(),
  max: jest.fn(),
  min: jest.fn(),
  multiply: jest.fn(),
  neq: jest.fn(),
  or: jest.fn(),
  not: jest.fn(),
  round: jest.fn(),
  set: jest.fn(),
  spring: jest.fn(),
  startClock: jest.fn(),
  stopClock: jest.fn(),
  sub: jest.fn(),
  timing: jest.fn(),
  Easing: { out: jest.fn() },
  Clock: jest.fn(),
  ...require.requireActual('Animated'),
}));

jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    /* Buttons */
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    /* Other */
    FlatList: View,
    gestureHandlerRootHOC: jest.fn(),
    Directions: {},
  };
});

jest.mock('react-native-video', () => 'Video');

jest.mock('NativeEventEmitter');

jest.mock('@bugsnag/react-native', () => ({
  start: jest.fn(),
  setUser: jest.fn(),
  notify: jest.fn(),
}));
jest.mock('DatePickerIOS', () => 'DatePicker');
jest.mock('./src/client/index');
