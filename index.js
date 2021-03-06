import './loadConfig';
import { AppRegistry, YellowBox } from 'react-native';

const App = require('./src').default;

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);

AppRegistry.registerComponent('newspringchurchapp', () => App);
