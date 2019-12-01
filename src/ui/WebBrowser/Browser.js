import { Linking } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import gql from 'graphql-tag';
import { client } from '../../client';

export const GET_ROCK_AUTH_DETAILS = gql`
  query RockAuthDetails {
    currentUser {
      id
      rock {
        authCookie
        authToken
      }
    }
  }
`;

export const getRockAuthDetails = async () => {
  const { data: { currentUser: { rock } = {} } = {} } = await client.query({
    query: GET_ROCK_AUTH_DETAILS,
    fetchPolicy: 'network-only',
  });
  return rock;
};

const Browser = {
  open: async (
    baseURL,
    options = { externalBrowser: false },
    auth = { useRockCookie: false, useRockToken: false }
  ) => {
    const url = new URL(baseURL);
    // NOTE: RN adds a trailing slash
    // https://github.com/facebook/react-native/issues/24428
    url._url = url.toString().endsWith('/')
      ? url.toString().slice(0, -1)
      : url.toString();

    const { authCookie, authToken } = await getRockAuthDetails();
    let headers = {};
    if (auth.useRockCookie && authCookie) {
      console.warn(
        "iOS doesn't support headers, you may want to use src/user-web-view"
      );
      headers = { Cookie: authCookie };
    }
    if (auth.useRockToken && authToken) {
      url.searchParams.append('rckipid', authToken);
    }
    // hide nav bar for links to newspring's site
    if (url.toString().includes('newspring.cc'))
      url.searchParams.append('hidenav', 'true');
    try {
      if (!options.externalBrowser && (await InAppBrowser.isAvailable())) {
        InAppBrowser.open(url.toString(), {
          headers,
          ...options,
        });
      } else Linking.openURL(url.toString());
    } catch (e) {
      console.error(e);
    }
  },
};

export default Browser;
