import React from 'react';
import { View } from 'react-native';
import { Query, Mutation } from 'react-apollo';
import { BodyText, styled } from '@apollosproject/ui-kit';
import getUserProfile from '../../tabs/connect/UserAvatarHeader/getUserProfile';
import GET_PRAYER_FEED from '../data/queries/getPrayerFeed';
import EDIT_PRAYER from '../data/mutations/editPrayer';
import ActionComponent from '../ActionComponent';
import AnswerPrayerForm from './AnswerPrayerForm';

const OptionMenu = styled(({ theme }) => ({
  alignSelf: 'center',
  padding: theme.sizing.baseUnit,
}))(View);

const OptionMenuText = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(BodyText);

class AnswerPrayerFormConnected extends React.Component {
  prayerId = this.props.navigation.getParam('prayerId', '');

  prayerAnswer = this.props.navigation.getParam('prayerAnswer', '');

  closePrayer = () => this.props.navigation.pop();

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Query query={getUserProfile}>
        {({
          loading: profileLoading,
          data: {
            currentUser: { profile: { photo = { uri: '' } } = {} } = {},
          } = {},
        }) => (
          <Mutation mutation={EDIT_PRAYER}>
            {(editPrayer) => (
              <AnswerPrayerForm
                loading={profileLoading}
                onSubmit={(values) => {
                  editPrayer({
                    variables: {
                      id: values.id,
                      answer: values.answer,
                    },
                    refetchQueries: () => [
                      {
                        query: GET_PRAYER_FEED,
                        variables: { type: 'USER' },
                      },
                    ],
                  });
                  this.props.navigation.pop();
                }}
                avatarSource={photo}
                {...this.props}
                onClose={() => this.closePrayer()}
                title={"Celebrate God's faithfulness"}
                prayerId={this.prayerId}
                prayerText={this.props.navigation.getParam('prayerText', '')}
                prayerAnswer={this.prayerAnswer}
                action={
                  this.prayerAnswer ? (
                    <OptionMenu>
                      <ActionComponent
                        component={
                          <OptionMenuText>Remove answer</OptionMenuText>
                        }
                        options={[
                          {
                            title: 'Remove Answer',
                            method: async () => {
                              await editPrayer({
                                variables: {
                                  id: this.prayerId,
                                },
                              });
                              await this.closePrayer();
                            },
                            destructive: true,
                          },
                          {
                            title: 'Cancel',
                            method: null,
                            destructive: false,
                          },
                        ]}
                      />
                    </OptionMenu>
                  ) : null
                }
              />
            )}
          </Mutation>
        )}
      </Query>
    );
  }
}

export default AnswerPrayerFormConnected;
