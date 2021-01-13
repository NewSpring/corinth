import Bugsnag from '@bugsnag/react-native';
import gql from 'graphql-tag';
import Config from 'react-native-config';
import { onError } from 'apollo-link-error';

const getUser = async (client) => {
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
    user = { id: null };
  }
  return user;
};

// const configuration = new Configuration();
// configuration.apiKey = Config.BUGSNAG_API_KEY;
// const bugsnag = new Client(configuration);
Bugsnag.start();

// set the user
const setUser = async (client) => {
  const user = await getUser(client);
  Bugsnag.setUser(user.id);
};

const bugsnagLink = onError(
  ({ graphQLErrors, networkError, operation, response }) => {
    const { headers: { authorization: token } = {} } = operation.getContext();
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        Bugsnag.notify(new Error(message), (report) => {
          if (operation.variables && operation.variables.password) {
            // eslint-disable-next-line
          delete operation.variables.password;
          }
          if (path) {
            // eslint-disable-next-line
            report.context = path.join('/');
          }
          // eslint-disable-next-line
          report.addMetadata('errorDetails', {
            path,
            locations,
            operation,
            response,
          });
          report.addMetadata('userDetails', {
            token,
          });
        });
      });
    }
    if (networkError) Bugsnag.notify(networkError);
  }
);

export { Bugsnag as default, bugsnagLink, setUser };
