import './loadConfig';
import { AppRegistry, YellowBox } from 'react-native';

import ApollosConfig from '@apollosproject/config';

const App = require('./src').default;
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);

AppRegistry.registerComponent('newspringchurchapp', () => App);
