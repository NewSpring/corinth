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

const ThreeDotsIcon = withTheme(({ theme }) => ({
  name: 'ellipsis',
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
              <Mutation
                mutation={DELETE_PRAYER}
                update={(cache, { data: { deletePrayer } }) => {
                  const { prayerFeed } = cache.readQuery({
                    query: GET_PRAYER_FEED,
                    variables: { type: 'USER', first: 10, after: null },
                  });
                  const { id } = deletePrayer;
                  const oldPrayers = prayerFeed.edges.flatMap((edge) => [
                    {
                      cursor: edge.cursor,
                      node: edge.node,
                      __typename: edge.__typename,
                    },
                  ]);
                  const newPrayers = oldPrayers.filter(
                    (prayer) => prayer.node.id !== id
                  );
                  const { cursor } = newPrayers[newPrayers.length - 1];
                  cache.writeQuery({
                    query: GET_PRAYER_FEED,
                    variables: { type: 'USER', first: 10, after: null },
                    data: {
                      prayerFeed: {
                        pageInfo: {
                          endCursor: cursor,
                          __typename: 'PaginationInfo',
                        },
                        edges: newPrayers,
                        __typename: 'PrayersConnection',
                      },
                    },
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
                    ListEmptyComponent={() => (
                      <PaddedView>
                        <BodyText>
                          You have not submitted any prayers. Go back and add
                          one!
                        </BodyText>
                      </PaddedView>
                    )}
                    renderItem={({ item }) => (
                      <View>
                        <Card key={item.id} isLoading={loading}>
                          <CardContent>
                            <PrayerSingle
                              prayer={item}
                              showDate
                              isLoading={loading}
                              navigation={this.props.navigation}
                              action={
                                <ActionComponent
                                  component={<ThreeDotsIcon />}
                                  options={[
                                    {
                                      title: item.answer
                                        ? 'Edit Answer'
                                        : 'Mark as Answered',
                                      method: () =>
                                        this.props.navigation.navigate(
                                          'AnswerPrayerFormConnected',
                                          {
                                            prayerId: item.id,
                                            prayerText: item.text,
                                            prayerAnswer: item.answer,
                                          }
                                        ),
                                      destructive: false,
                                    },
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
                    )}
                  />
                )}
              </Mutation>
            )}
          </Query>
        </FlexedSafeAreaView>
      </ModalView>
    );
  }
}

export default UserPrayerList;
