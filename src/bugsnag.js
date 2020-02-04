import { Client, Configuration } from 'bugsnag-react-native';
import Config from 'react-native-config';
import { onError } from 'apollo-link-error';
import AsyncStorage from '@react-native-community/async-storage';

const configuration = new Configuration();
configuration.apiKey = Config.BUGSNAG_API_KEY;
configuration.releaseStage = Config.BUGSNAG_STAGE || 'development';
const bugsnag = new Client(configuration);

const getStore = async () => {
  const keys = await AsyncStorage.getAllKeys();
  return AsyncStorage.multiGet(keys);
};

const bugsnagLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.map(async ({ message, locations, path }) => {
      const store = await getStore();
      bugsnag.notify(new Error(message), (report) => {
        if (operation.variables && operation.variables.password) {
          // eslint-disable-next-line
          delete operation.variables.password;
        }
        if (path) {
          // eslint-disable-next-line
          report.context = path.join('/');
        }
        // eslint-disable-next-line
        report.metadata = {
          path,
          locations,
          operation,
          store,
        };
      });
    });
  }
  if (networkError) bugsnag.notify(networkError);
});

export { bugsnag as default, bugsnagLink };
