import React, { PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Emoji from 'react-native-emoji';
import { Query, Mutation } from 'react-apollo';

import {
  BodyText,
  H4,
  H6,
  ModalView,
  FlexedView,
  Button,
  styled,
  ActivityIndicator,
  ErrorCard,
} from '@apollosproject/ui-kit';
import { AnalyticsConsumer } from '@apollosproject/ui-analytics';

import PrayerSingle from '../PrayerSingle';
import SaveButton from '../SaveButton';
import ActionComponent from '../ActionComponent';
import GET_PRAYER_FEED from '../data/queries/getPrayerFeed';
import FLAG_PRAYER from '../data/mutations/flagPrayer';
import INCREMENT_PRAYER_COUNT from '../data/mutations/incrementPrayerCount';

const FlexedSafeAreaView = styled({
  flex: 1,
})(SafeAreaView);

const ScrollArea = styled(({ theme }) => ({
  flex: 5,
  padding: theme.sizing.baseUnit,
}))(FlexedView);

const Header = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit * 2,
}))(View);

const StyledPrayerView = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit * 5,
}))(View);

const GreenH4 = styled(({ theme }) => ({
  color: theme.colors.primary,
}))(H4);

const FooterAltOption = styled(({ theme }) => ({
  alignSelf: 'center',
  padding: theme.sizing.baseUnit,
}))(View);

const FooterText = styled(({ theme, isGray }) => ({
  color: isGray ? theme.colors.text.tertiary : theme.colors.primary,
}))(BodyText);

const Footer = styled(({ theme }) => ({
  justifyContent: 'flex-end',
  padding: theme.sizing.baseUnit,
}))(FlexedView);

class PrayerList extends PureComponent {
  state = {
    prayed: false,
    saved: false,
  };

  static navigationOptions = {
    header: null,
  };

  render() {
    const title = this.props.navigation.getParam('title', 'My Church');
    const cursor = this.props.navigation.getParam('cursor', null);
    const type = this.props.navigation.getParam('type', null);

    return (
      <ModalView onClose={() => this.props.navigation.popToTop()}>
        <Query
          query={GET_PRAYER_FEED}
          variables={{ type, after: cursor, first: 1 }}
          fetchPolicy={'cache-and-network'}
        >
          {({ data, loading, error }) => {
            if (loading) return <ActivityIndicator />;
            if (error) return <ErrorCard />;

            if (data.prayerFeed.edges.length === 0)
              this.props.navigation.popToTop();
            const newCursor = data.prayerFeed.cursor;
            const prayer = data.prayerFeed.edges[0].node;
            return (
              <FlexedSafeAreaView>
                <Mutation mutation={FLAG_PRAYER}>
                  {(flagPrayer) => (
                    <Mutation mutation={INCREMENT_PRAYER_COUNT}>
                      {(increment) => (
                        <FlexedView>
                          <ScrollArea>
                            <ScrollView>
                              <Header>
                                <H6>Praying for</H6>
                                <GreenH4>{title}</GreenH4>
                              </Header>
                              <StyledPrayerView>
                                {prayer ? (
                                  <PrayerSingle
                                    avatarSize={'medium'}
                                    navigation={this.props.navigation}
                                    prayer={prayer}
                                    action={
                                      null
                                      // TODO figure this out
                                      // <SaveButton
                                      // toggleSavedState={() =>
                                      // this.setState((prevState) => ({
                                      // saved: !prevState.saved,
                                      // }))
                                      // }
                                      // saved={this.state.saved}
                                      // prayerID={prayer.id}
                                      // />
                                    }
                                    showHelp
                                    showHeader
                                  />
                                ) : null}
                              </StyledPrayerView>
                            </ScrollView>
                          </ScrollArea>
                          <Footer>
                            {!this.state.prayed ? (
                              <View>
                                <AnalyticsConsumer>
                                  {({ track }) => (
                                    <Button
                                      title={`I've prayed`}
                                      onPress={() => {
                                        increment({
                                          variables: { parsedId: prayer.id },
                                        });
                                        this.setState({ prayed: true });
                                        track({ eventName: 'Prayed' });
                                      }}
                                    />
                                  )}
                                </AnalyticsConsumer>
                                <FooterAltOption>
                                  <ActionComponent
                                    component={
                                      <FooterText isGray>
                                        Report prayer as inappropriate
                                      </FooterText>
                                    }
                                    options={[
                                      {
                                        title: 'Report prayer',
                                        method: async () => {
                                          await flagPrayer({
                                            variables: {
                                              parsedId: prayer.id,
                                            },
                                          });
                                          this.props.navigation.replace(
                                            'PrayerList',
                                            {
                                              title,
                                              type,
                                              cursor: newCursor,
                                            }
                                          );
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
                                </FooterAltOption>
                              </View>
                            ) : (
                              <View>
                                <FooterAltOption>
                                  <FooterText>
                                    Thanks for praying <Emoji name="heart" />
                                  </FooterText>
                                </FooterAltOption>
                                <Button
                                  // TODO this should say "Done" on last prayer
                                  title={'Next'}
                                  onPress={() =>
                                    this.props.navigation.replace(
                                      'PrayerList',
                                      {
                                        title,
                                        type,
                                        cursor: newCursor,
                                      }
                                    )
                                  }
                                />
                              </View>
                            )}
                          </Footer>
                        </FlexedView>
                      )}
                    </Mutation>
                  )}
                </Mutation>
              </FlexedSafeAreaView>
            );
          }}
        </Query>
      </ModalView>
    );
  }
}

export default PrayerList;
