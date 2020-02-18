import { Client, Configuration } from 'bugsnag-react-native';
import gql from 'graphql-tag';
import Config from 'react-native-config';
import { onError } from 'apollo-link-error';
import { client } from './client';

const configuration = new Configuration();
configuration.apiKey = Config.BUGSNAG_API_KEY;
configuration.releaseStage = Config.BUGSNAG_STAGE || 'development';
const bugsnag = new Client(configuration);

const getUser = async () => {
  let user;
  try {
    const {
      currentUser: { id },
    } = await client.readQuery({
      query: gql`
        {
          currentUser {
            id
          }
        }
      `,
    });
    user = { id };
  } catch (e) {
    user = null;
  }
  return user;
};

const bugsnagLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(async ({ message, locations, path }) => {
      const user = await getUser();
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
          user,
        };
      });
    });
  }
  if (networkError)
    (async () => {
      const user = await getUser();
      bugsnag.notify(networkError, (report) => {
        // eslint-disable-next-line
        report.metadata = { user };
      });
    })();
});

export { bugsnag as default, bugsnagLink };
