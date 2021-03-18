import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ConnectScreenConnected } from '@apollosproject/ui-connected';
import { Query } from '@apollo/client/react/components';

import ActionTable from './ActionTable';
import ActionBar from './ActionBar';
import GET_USER_PROFILE from './UserAvatarHeader/getUserProfile';

const ActionBarWithIsStaff = () => (
  <Query query={GET_USER_PROFILE} fetchPolicy="cache-and-network">
    {({
      data: { currentUser: { profile: { isGroupLeader } = {} } = {} } = {},
    }) => <ActionBar isGroupLeader={isGroupLeader} />}
  </Query>
);
class Connect extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
  };

  render() {
    return (
      <ConnectScreenConnected
        ActionTable={ActionTable}
        ActionBar={ActionBarWithIsStaff}
      />
    );
  }
}

export default Connect;
