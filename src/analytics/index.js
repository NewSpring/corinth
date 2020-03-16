import RNAmplitude from 'react-native-amplitude-analytics';
import Appcenter from 'appcenter-analytics';
import Config from 'react-native-config';

const amplitude = new RNAmplitude(Config.AMPLITUDE_API_KEY);

export default ({ eventName, properties }) => {
  amplitude.logEvent(eventName, properties);
  Appcenter.trackEvent(eventName, properties);
};
