import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Query, ApolloConsumer } from 'react-apollo';

import { PaddedView, Avatar, styled } from '@apollosproject/ui-kit';
import GET_USER_PHOTO from './getUserPhoto';
import uploadPhoto from './uploadPhoto';

const GetPhotoData = ({ children }) => (
  <Query query={GET_USER_PHOTO}>
    {({ data: { currentUser = {} } = {} }) => {
      const photo = get(currentUser, 'profile.photo');
      return children({ photo });
    }}
  </Query>
);

GetPhotoData.propTypes = {
  children: PropTypes.func.isRequired,
};

const Wrapper = styled({
  justifyContent: 'center',
  alignItems: 'center',
})(View);

export default class AvatarForm extends PureComponent {
  state = {
    isUploadingFile: false,
  };

  componentWillUnmount() {
    this.setState({ isUploadingFile: false });
  }

  handleUploadPhoto = async ({ client }) => {
    try {
      await uploadPhoto({
        client,
        onUpload: () => this.setState({ isUploadingFile: true }),
      });
      await this.setState({ isUploadingFile: false });
    } catch (e) {
      console.warn(e);
      this.setState({ isUploadingFile: false });
    }
  };

  render() {
    const { isUploadingFile } = this.state;

    return (
      <ApolloConsumer>
        {(client) => (
          <Wrapper>
            <GetPhotoData>
              {({ photo }) => (
                <PaddedView horizontal={false}>
                  <Avatar
                    source={photo}
                    size="large"
                    buttonIcon="camera"
                    onPressIcon={() => this.handleUploadPhoto({ client })}
                    isLoading={isUploadingFile}
                  />
                </PaddedView>
              )}
            </GetPhotoData>
          </Wrapper>
        )}
      </ApolloConsumer>
    );
  }
}
