import React, { PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Emoji from 'react-native-emoji';
import { Query, Mutation } from '@apollo/client/react/components';

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
import FLAG_PRAYER from '../data/mutations/flagPrayer';
import GET_PRAYER_FEED from '../data/queries/getPrayerFeed';
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
    prayerIndex: 0,
    prayed: false,
  };

  render() {
    const title = this.props.route.params?.title || 'My Church';
    const type = this.props.route.params?.type;

    return (
      <ModalView onClose={() => this.props.navigation.popToTop()}>
        <FlexedSafeAreaView>
          <Query
            query={GET_PRAYER_FEED}
            variables={{ type, first: 20 }}
            fetchPolicy={'cache-and-network'}
          >
            {({ data, loading, error }) => {
              if (loading) return <ActivityIndicator />;
              if (error) return <ErrorCard />;
              const prayers = data.prayerFeed.edges.map((edge) => edge.node);
              const isLastPrayer =
                this.state.prayerIndex + 1 === prayers.length;

              const advancePrayer = (prayed = false) =>
                !isLastPrayer
                  ? this.setState((prevState) => ({
                      prayerIndex: prevState.prayerIndex + 1,
                      prayed: prayed ? false : prevState.prayed,
                    }))
                  : this.props.navigation.popToTop();

              const prayer = prayers[this.state.prayerIndex];
              return (
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
                                <PrayerSingle
                                  avatarSize={'medium'}
                                  route={this.props.route}
                                  navigation={this.props.navigation}
                                  prayer={prayer}
                                  action={<SaveButton prayerID={prayer.id} />}
                                  showHelp
                                  showHeader
                                />
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
                                          await advancePrayer();
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
                                  title={!isLastPrayer ? 'Next' : 'Done'}
                                  onPress={() => advancePrayer(true)}
                                />
                              </View>
                            )}
                          </Footer>
                        </FlexedView>
                      )}
                    </Mutation>
                  )}
                </Mutation>
              );
            }}
          </Query>
        </FlexedSafeAreaView>
      </ModalView>
    );
  }
}

export default PrayerList;
