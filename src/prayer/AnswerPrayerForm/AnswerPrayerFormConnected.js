import React from 'react';
import { View } from 'react-native';
import { Query, Mutation } from 'react-apollo';
import { BodyText, styled } from '@apollosproject/ui-kit';
import getUserProfile from '../../tabs/connect/UserAvatarHeader/getUserProfile';
import GET_PRAYER_FEED from '../data/queries/getPrayerFeed';
import ANSWER_PRAYER from '../data/mutations/answerPrayer';
import INTERACT_WITH_PRAYER from '../data/mutations/interactWithPrayer';
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
          <Mutation mutation={INTERACT_WITH_PRAYER}>
            {(interactWithPrayer) => (
              <Mutation mutation={ANSWER_PRAYER}>
                {(answerPrayer) => (
                  <AnswerPrayerForm
                    loading={profileLoading}
                    onSubmit={(values) => {
                      answerPrayer({
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
                    onClose={() => this.props.navigation.pop()}
                    title={"Celebrate God's faithfulness"}
                    prayer={{
                      id: this.props.navigation.getParam('prayerId', ''),
                      text: this.props.navigation.getParam('prayerText', ''),
                      answer: this.props.navigation.getParam('prayerAnswer', ''),,
                    }}
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
                                  await interactWithPrayer({
                                    variables: {
                                      id: this.prayerId,
                                      action: 'REMOVE_ANSWER',
                                    },
                                  });
                                  this.props.navigation.pop();
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
          </Mutation>
        )}
      </Query>
    );
  }
}

export default AnswerPrayerFormConnected;
