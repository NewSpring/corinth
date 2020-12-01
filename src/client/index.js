import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHookProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { getVersion, getApplicationName } from 'react-native-device-info';

// TODO put this all back to normal once we find the auth error
// import { authLink, buildErrorLink } from '@apollosproject/ui-auth';
import { authLink } from '@apollosproject/ui-auth';
import { onError } from 'apollo-link-error';
import AsyncStorage from '@react-native-community/async-storage';
import Appcenter from 'appcenter-analytics';
import { NavigationService } from '@apollosproject/ui-kit';
import bugsnag, { bugsnagLink, setUser } from '../bugsnag';

import { resolvers, schema, defaults } from '../store';

import httpLink from './httpLink';
import cache, { ensureCacheHydration } from './cache';
import MARK_CACHE_LOADED from './markCacheLoaded';

const goToAuth = () => NavigationService.resetToAuth();
const wipeData = () => cache.writeData({ data: defaults });

let clearStore;
let storeIsResetting = false;
const onAuthError = async () => {
  if (!storeIsResetting) {
    storeIsResetting = true;
    await clearStore();
  }
  storeIsResetting = false;
  goToAuth();
};

const buildErrorLink = (onAuthError1) =>
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(async (error) => {
        // wipe out all data and go somewhere
        const token = await AsyncStorage.getItem('authToken');
        if (error.extensions.code === 'UNAUTHENTICATED') {
          AsyncStorage.removeItem('authToken');
          Appcenter.trackEvent('Token removed', {
            token,
            error: error.message,
          });
          bugsnag.notify(new Error(error), (report) => {
            report.metadata = { // eslint-disable-line
              token,
            };
          });
          onAuthError1();
        }
        return null;
      });

    if (networkError) return null;
    return null;
  });

const errorLink = buildErrorLink(onAuthError);

const link = ApolloLink.from([bugsnagLink, authLink, errorLink, httpLink]);

export const client = new ApolloClient({
  link,
  cache,
  queryDeduplication: false,
  shouldBatch: true,
  resolvers,
  typeDefs: schema,
  name: getApplicationName(),
  version: getVersion(),
});

// Hack to give auth link access to method on client;
// eslint-disable-next-line prefer-destructuring
clearStore = client.clearStore;

wipeData();
// Ensure that media player still works after logout.
client.onClearStore(() => wipeData());

class ClientProvider extends PureComponent {
  static propTypes = {
    client: PropTypes.shape({
      cache: PropTypes.shape({}),
    }),
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.object, // covers Fragments
    ]).isRequired,
  };

  static defaultProps = {
    client,
  };

  async componentDidMount() {
    try {
      await ensureCacheHydration;
    } catch (e) {
      throw e;
    } finally {
      client.mutate({ mutation: MARK_CACHE_LOADED });
      setUser(client);
    }
  }

  render() {
    const { children, ...otherProps } = this.props;
    return (
      <ApolloProvider {...otherProps} client={client}>
        <ApolloHookProvider {...otherProps} client={client}>
          {children}
        </ApolloHookProvider>
      </ApolloProvider>
    );
  }
}

export default ClientProvider;
