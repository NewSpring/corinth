import { Linking } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

import GET_ROCK_AUTH_DETAILS from './getRockAuthDetails';

export const getRockAuthDetails = async (client) => {
  const { data: { currentUser: { rock } = {} } = {} } = await client.query({
    query: GET_ROCK_AUTH_DETAILS,
    fetchPolicy: 'network-only',
  });
  return rock;
};

const RockAuthedInAppBrowser = {
  open: async (
    baseURL,
    { client, ...options },
    auth = { useRockCookie: false, useRockToken: false }
  ) => {
    const url = new URL(baseURL);
    // NOTE: RN adds a trailing slash
    // https://github.com/facebook/react-native/issues/24428
    url._url = url.toString().endsWith('/')
      ? url.toString().slice(0, -1)
      : url.toString();

    const { authCookie, authToken } = await getRockAuthDetails(client);
    let headers = {};
    if (auth.useRockCookie && authCookie) {
      // eslint-disable-next-line no-console
      console.warn(
        "iOS doesn't support headers, you may want to use src/user-web-view"
      );
      headers = { Cookie: authCookie };
    }

    if (auth.useRockToken && authToken) {
      url.searchParams.append('rckipid', authToken);
    }
    try {
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.open(url.toString(), {
          headers,
          ...options,
        });
      } else Linking.openURL(url.toString());
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  },
};

export default RockAuthedInAppBrowser;
