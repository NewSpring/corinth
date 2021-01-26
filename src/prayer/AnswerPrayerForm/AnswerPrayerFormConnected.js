import React from 'react';
import { View } from 'react-native';
import { Query, Mutation } from '@apollo/client/react/components';
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
  prayer = {
    id: this.props.route.params?.prayerId || '',
    text: this.props.route.params?.prayerText || '',
    answer: this.props.route.params?.prayerAnswer || '',
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
                    prayer={this.prayer}
                    action={
                      this.prayer.answer ? (
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
                                      id: this.prayer.id,
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
