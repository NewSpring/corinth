import React from 'react';
import { View } from 'react-native';
import { Query, Mutation } from 'react-apollo';
import { BodyText, styled } from '@apollosproject/ui-kit';
import getUserProfile from '../../tabs/connect/UserAvatarHeader/getUserProfile';
import GET_PRAYER_FEED from '../data/queries/getPrayerFeed';
import ANSWER_PRAYER from '../data/mutations/answerPrayer';
import ActionComponent from '../ActionComponent';
import AnswerPrayerForm from './AnswerPrayerForm';

const FooterAltOption = styled(({ theme }) => ({
  alignSelf: 'center',
  padding: theme.sizing.baseUnit,
}))(View);

const FooterText = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(BodyText);

class AnswerPrayerFormConnected extends React.Component {
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
                prayerId={this.props.navigation.getParam('prayerId', '')}
                prayerText={this.props.navigation.getParam('prayerText', '')}
                prayerAnswer={this.props.navigation.getParam(
                  'prayerAnswer',
                  ''
                )}
                action={
                  <FooterAltOption>
                    <ActionComponent
                      component={<FooterText>Remove Answer</FooterText>}
                      options={[
                        {
                          title: 'Remove Answer', // method: async () => {
                          //   await removeAnswer({
                          //     variables: {
                          //       parsedId: item.id,
                          //     },
                          //   });
                          // },
                          method: async () => {},
                          destructive: true,
                        },
                        { title: 'Cancel', method: null, destructive: false },
                      ]}
                    />
                  </FooterAltOption>
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
