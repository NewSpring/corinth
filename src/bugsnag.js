import { Client, Configuration } from 'bugsnag-react-native';
import Config from 'react-native-config';
import { onError } from 'apollo-link-error';

const configuration = new Configuration();
configuration.apiKey = Config.BUGSNAG_API_KEY;
configuration.releaseStage = Config.BUGSNAG_STAGE;
configuration.notifyReleaseStages = ['production', 'staging'];
const bugsnag = new Client(configuration);

const bugsnagLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      bugsnag.notify(new Error(message), (report) => {
        console.warn(message);
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
        };
      })
    );
  }
  if (networkError) bugsnag.notify(networkError);
});

export { bugsnag as default, bugsnagLink };
