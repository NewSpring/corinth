import URL from 'url';
import querystring from 'querystring';
import React, { Component } from 'react';
import { Linking } from 'react-native';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { withApollo } from '@apollo/client/react/hoc';
import { get } from 'lodash';
import OneSignal from 'react-native-onesignal';

import { GET_PUSH_ID } from '@apollosproject/ui-notifications';
import PushProvider from '@apollosproject/ui-notifications/src/pushProvider';
import {
  resolvers,
  defaults,
} from '@apollosproject/ui-notifications/src/store';

const UPDATE_DEVICE_PUSH_ID = gql`
  mutation updateDevicePushId($pushId: String!) {
    updateDevicePushId(pushId: $pushId) @client
  }
`;

const GET_CONTENT_ITEM_BY_SLUG = gql`
  query ContentItemIdFromSlug($slug: String!) {
    contentItemFromSlug(slug: $slug) {
      id
    }
  }
`;

class NotificationsInit extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    oneSignalKey: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
    client: PropTypes.shape({
      mutate: PropTypes.func,
      addResolvers: PropTypes.func,
      writeQuery: PropTypes.func,
      onClearStore: PropTypes.func,
    }).isRequired,
    actionMap: PropTypes.shape({}),
  };

  static defaultProps = {
    actionMap: {},
  };

  static navigationOptions = {};

  constructor(props) {
    super(props);
    const { client } = props;
    client.addResolvers(resolvers);
    client.writeQuery({ query: GET_PUSH_ID, data: defaults });
    client.onClearStore(() =>
      client.writeQuery({ query: GET_PUSH_ID, data: defaults })
    );
  }

  componentDidMount() {
    OneSignal.init(this.props.oneSignalKey, {
      kOSSettingsKeyAutoPrompt: false,
    });
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.setSubscription(true);
    Linking.getInitialURL().then((url) => {
      if (url) {
        this._handleOpenURL({ url });
      }
    });
    Linking.addEventListener('url', this._handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url');
    OneSignal.removeEventListener('received');
    OneSignal.removeEventListener('opened');
    OneSignal.removeEventListener('ids');
  }

  navigate = (rawUrl) => {
    if (!rawUrl) return;
    const url = URL.parse(rawUrl);
    const route = url.pathname.substring(1);
    const args = querystring.parse(url.query);
    console.warn(args);
    this.props.navigate(route, args);
  };

  onReceived = (notification) => {
    console.log('Notification received: ', notification);
  };

  onOpened = (openResult) => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
    // URL looks like this
    // apolloschurchapp://AppStackNavigator/Connect
    // apolloschurchapp://SomethingElse/Connect
    // apolloschurchapp://SomethingElse/ContentSingle?itemId=SomeItemId:blablalba
    const url = get(openResult, 'notification.payload.additionalData.url');
    if (
      openResult?.action?.actionID &&
      this.props.actionMap[openResult.action.actionID]
    ) {
      this.props.actionMap[openResult.action.actionID](
        openResult.notification.payload.additionalData
      );
    } else if (url) {
      this.navigate(url);
    }
  };

  _handleOpenURL = async (rawUrl) => {
    if (rawUrl.url.indexOf('newspringchurchapp') >= 0) {
      // if the URL starts with 'newspringchurchapp' then this is
      // a deep link in the format it already needs to be in.
      // So just navigate to it.
      this.navigate(rawUrl.url);
    } else {
      // The link coming in is more like `https://newspring.cc/<something>
      // We need to convert this to a deep link first, and then navigate.
      const urlArray = rawUrl.url.split(/[\s/]+/);
      const path = urlArray[urlArray.length - 1];
      const slug = path.split('?')[0];

      const {
        data: { contentItemFromSlug } = {},
      } = await this.props.client.query({
        query: GET_CONTENT_ITEM_BY_SLUG,
        variables: { slug },
      });
      if (contentItemFromSlug) {
        const newUrl = `newspringchurchapp://AppStackNavigator/ContentSingle?itemId=${
          contentItemFromSlug.id
        }`;
        this.navigate(newUrl);
      }
    }
  };

  onIds = (device) => {
    this.props.client.mutate({
      mutation: UPDATE_DEVICE_PUSH_ID,
      variables: { pushId: device.userId },
    });
  };

  render() {
    return <PushProvider>{this.props.children}</PushProvider>;
  }
}

export default withApollo(NotificationsInit);
