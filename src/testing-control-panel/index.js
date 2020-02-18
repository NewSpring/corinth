import React, { PureComponent } from 'react';
import { TableView } from '@apollosproject/ui-kit';
import RockAuthedWebBrowser from '../ui/RockAuthedWebBrowser';
import { UserWebBrowserConsumer } from '../user-web-browser';
import TouchableCell from './TouchableCell';

export default class TestingControlPanel extends PureComponent {
  static navigationOptions = () => ({
    title: 'Testing Control Panel',
  });

  render() {
    return (
      <TableView>
        <UserWebBrowserConsumer>
          {(openUserWebView) => (
            <TouchableCell
              handlePress={() =>
                openUserWebView({
                  url:
                    'https://www.whatismybrowser.com/detect/what-http-headers-is-my-browser-sending',
                })
              }
              iconName="share"
              cellText={`Open Web Browser With User Cookie`}
            />
          )}
        </UserWebBrowserConsumer>
        <RockAuthedWebBrowser>
          {(openUrl) => (
            <TouchableCell
              handlePress={() =>
                openUrl('https://rock.newspring.cc', {}, { useRockToken: true })
              }
              iconName="share"
              cellText={`Open InAppBrowser With Rock Token`}
            />
          )}
        </RockAuthedWebBrowser>
        <TouchableCell
          handlePress={() => this.props.navigation.navigate('Onboarding')}
          iconName="Avatar"
          cellText={`Launch Onboarding`}
        />
      </TableView>
    );
  }
}
