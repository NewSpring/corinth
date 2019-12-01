import RNAmplitude from 'react-native-amplitude-analytics';
import Config from 'react-native-config';

const amplitude = new RNAmplitude(Config.AMPLITUDE_API_KEY);

export const track = ({ eventName, properties }) =>
  amplitude.logEvent(eventName, properties);

export default amplitude;
