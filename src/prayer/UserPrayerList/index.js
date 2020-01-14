import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {
  Card,
  CardContent,
  BodyText,
  H4,
  H6,
  ModalView,
  PaddedView,
  styled,
  Icon,
  withTheme,
} from '@apollosproject/ui-kit';
import PrayerSingle from '../PrayerSingle';
import GET_PRAYERS from '../data/queries/getPrayers';
import DELETE_PRAYER from '../data/mutations/deletePrayer';
import ActionComponent from '../ActionComponent';

const FlexedSafeAreaView = styled({
  flex: 1,
})(SafeAreaView);

const StyledView = styled(({ theme }) => ({
  marginBottom: theme.sizing.baseUnit * 4,
}))(View);

const GreenH4 = styled(({ theme }) => ({
  color: theme.colors.primary,
}))(H4);

const DeleteIcon = withTheme(({ theme }) => ({
  name: 'delete',
  size: theme.sizing.baseUnit,
  fill: theme.colors.darkTertiary,
}))(Icon);

class UserPrayerList extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ModalView {...this.props} onClose={() => this.props.navigation.pop()}>
        <FlexedSafeAreaView forceInset={{ top: 'always' }}>
          <ScrollView>
            <Query
              query={GET_PRAYERS}
              variables={{ type: 'USER' }}
              fetchPolicy="cache-and-network"
            >
              {({ loading, data: { userPrayers = [] } = {} }) => {
                if (loading) return <ActivityIndicator />;
                return (
                  <>
                    <PaddedView>
                      <H6>Viewing</H6>
                      <GreenH4>My Prayers</GreenH4>
                    </PaddedView>
                    <Mutation
                      mutation={DELETE_PRAYER}
                      update={(cache, { data: { deletePrayer } }) => {
                        const data = cache.readQuery({
                          query: GET_PRAYERS,
                          variables: { type: 'USER' },
                        });
                        const { id } = deletePrayer;
                        const updatedPrayers = data.userPrayers.filter(
                          (prayer) => prayer.id !== id
                        );
                        cache.writeQuery({
                          query: GET_PRAYERS,
                          variables: { type: 'USER' },
                          data: { userPrayers: updatedPrayers },
                        });
                      }}
                    >
                      {(deletePrayer) => (
                        <StyledView>
                          {userPrayers && userPrayers.length > 0 ? (
                            userPrayers.map((prayer) => (
                              <Card key={prayer.id}>
                                <CardContent>
                                  <PrayerSingle
                                    prayer={prayer}
                                    showDate
                                    action={
                                      <ActionComponent
                                        component={<DeleteIcon />}
                                        options={[
                                          {
                                            title: 'Delete Prayer',
                                            method: async () => {
                                              await deletePrayer({
                                                variables: {
                                                  parsedId: prayer.id,
                                                },
                                              });
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
                                    }
                                  />
                                </CardContent>
                              </Card>
                            ))
                          ) : (
                            <PaddedView>
                              <BodyText>
                                You have not submitted any prayers. Go back and
                                add one!
                              </BodyText>
                            </PaddedView>
                          )}
                        </StyledView>
                      )}
                    </Mutation>
                  </>
                );
              }}
            </Query>
          </ScrollView>
        </FlexedSafeAreaView>
      </ModalView>
    );
  }
}

export default UserPrayerList;
