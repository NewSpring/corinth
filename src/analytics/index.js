import Appcenter from 'appcenter-analytics';
import { Amplitude } from '@amplitude/react-native';
import ApollosConfig from '@apollosproject/config';

const amplitude = Amplitude.getInstance();
amplitude.init(ApollosConfig.AMPLITUDE_API_KEY);

export default ({ eventName, properties }) => {
  amplitude.logEvent(eventName, properties);
  Appcenter.trackEvent(eventName, properties);
};
