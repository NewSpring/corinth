// Provider API for WebBrowser that injects theme values and defaults to the web browser:
import { Platform } from 'react-native';
import { createContext } from 'react';

import { withTheme } from '@apollosproject/ui-kit';

import Browser from './Browser';

const { Provider: BaseProvider, Consumer } = createContext(Browser.open);

// NOTE: don't think this is working...
const Provider = withTheme(({ theme }) => ({
  value: (url, headers = {}, options = {}) =>
    Browser.open(url, {
      ...Platform.select({
        ios: {
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: theme.colors.background.paper,
          preferredControlTintColor: theme.colors.primary,
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'overFullScreen',
          modalTransitionStyle: 'partialCurl',
          modalEnabled: true,
        },
        android: {
          toolbarColor: theme.colors.background.paper,
          enableDefaultShare: true,
          showTitle: true,
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          forceCloseOnRedirection: false,
        },
      }),
      headers: { ...headers },
      ...options,
    }),
}))(BaseProvider);

export default Browser;
export { Provider as WebBrowserProvider, Consumer as WebBrowserConsumer };
