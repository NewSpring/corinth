import React from 'react';
import { Query, Mutation } from 'react-apollo';
import getUserProfile from '../../tabs/connect/UserAvatarHeader/getUserProfile';
import GET_PRAYER_FEED from '../data/queries/getPrayerFeed';
import ANSWER_PRAYER from '../data/mutations/answerPrayer';
import AnswerPrayerForm from './AnswerPrayerForm';

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
                      { query: GET_PRAYER_FEED, variables: { type: 'USER' } },
                    ],
                  });
                  this.props.navigation.pop();
                }}
                avatarSource={photo}
                {...this.props}
                onClose={() => this.props.navigation.pop()}
                title={'Enter your answer below ...'}
                prayerId={this.props.navigation.getParam('prayerId', '')}
                prayerText={this.props.navigation.getParam('prayerText', '')}
              />
            )}
          </Mutation>
        )}
      </Query>
    );
  }
}

export default AnswerPrayerFormConnected;
