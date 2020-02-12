import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { get } from 'lodash';
import {
  Card,
  CardContent,
  BodyText,
  FeedView,
  H4,
  H6,
  Icon,
  ModalView,
  PaddedView,
  styled,
  withTheme,
} from '@apollosproject/ui-kit';
import { fetchMoreResolver } from '@apollosproject/ui-connected';
import PrayerSingle from '../PrayerSingle';
import GET_PRAYER_FEED from '../data/queries/getPrayerFeed';
import DELETE_PRAYER from '../data/mutations/deletePrayer';
import ActionComponent from '../ActionComponent';

const FlexedSafeAreaView = styled({
  flex: 1,
})(SafeAreaView);

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
          <Query
            query={GET_PRAYER_FEED}
            variables={{ type: 'USER', first: 10, after: null }}
            fetchPolicy="cache-and-network"
          >
            {({ loading, error, data, refetch, fetchMore, variables }) => (
              <>
                <Mutation
                  mutation={DELETE_PRAYER}
                  update={(cache, { data: { deletePrayer } }) => {
                    const prayerData = cache.readQuery({
                      query: GET_PRAYER_FEED,
                      variables: { type: 'USER' },
                    });
                    const { id } = deletePrayer;
                    const updatedPrayers = prayerData.prayerFeed.edges.filter(
                      (prayer) => prayer.node.id !== id
                    );
                    cache.writeQuery({
                      query: GET_PRAYER_FEED,
                      variables: { type: 'USER' },
                      data: { prayerFeed: updatedPrayers },
                    });
                  }}
                >
                  {(deletePrayer) => (
                    <FeedView
                      content={get(data, 'prayerFeed.edges', []).map(
                        (edge) => edge.node
                      )}
                      fetchMore={fetchMoreResolver({
                        collectionName: 'prayerFeed',
                        fetchMore,
                        variables,
                        data,
                      })}
                      isLoading={loading}
                      error={error}
                      refetch={refetch}
                      ListHeaderComponent={
                        <PaddedView>
                          <H6>Viewing</H6>
                          <GreenH4>My Prayers</GreenH4>
                        </PaddedView>
                      }
                      renderItem={({ item }) =>
                        item ? (
                          <View>
                            <Card key={item.id}>
                              <CardContent>
                                <PrayerSingle
                                  prayer={item}
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
                                                parsedId: item.id,
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
                          </View>
                        ) : (
                          <PaddedView>
                            <BodyText>
                              You have not submitted any prayers. Go back and
                              add one!
                            </BodyText>
                          </PaddedView>
                        )
                      }
                    />
                  )}
                </Mutation>
              </>
            )}
          </Query>
        </FlexedSafeAreaView>
      </ModalView>
    );
  }
}

export default UserPrayerList;
