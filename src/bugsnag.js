import { Client, Configuration } from 'bugsnag-react-native';
import gql from 'graphql-tag';
import Config from 'react-native-config';
import { onError } from 'apollo-link-error';
import { client } from './client';

const configuration = new Configuration();
configuration.apiKey = Config.BUGSNAG_API_KEY;
configuration.releaseStage = Config.BUGSNAG_STAGE || 'development';
const bugsnag = new Client(configuration);

const GET_USER_ID = gql`
  {
    currentUser {
      id
    }
  }
`;

const bugsnagLink = onError(
  async ({ graphQLErrors, networkError, operation }) => {
    const { currentUser } = await client.readQuery({ query: GET_USER_ID });
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
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
            user: { id: currentUser.id },
          };
        });
      });
    }
    if (networkError)
      bugsnag.notify(networkError, (report) => {
        // eslint-disable-next-line
        report.metadata = { user: { id: currentUser.id } };
      });
  }
);

export { bugsnag as default, bugsnagLink };
