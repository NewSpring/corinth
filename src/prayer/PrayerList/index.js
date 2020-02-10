import React, { PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Emoji from 'react-native-emoji';
import { Mutation } from 'react-apollo';

import {
  BodyText,
  H4,
  H6,
  ModalView,
  FlexedView,
  Button,
  styled,
} from '@apollosproject/ui-kit';
import { AnalyticsConsumer } from '@apollosproject/ui-analytics';

import PrayerSingle from '../PrayerSingle';
import SaveButton from '../SaveButton';
import ActionComponent from '../ActionComponent';
import FLAG_PRAYER from '../data/mutations/flagPrayer';
import INCREMENT_PRAYER_COUNT from '../data/mutations/incrementPrayerCount';
// import flagPrayerUpdateAll from '../data/updates/flagPrayerUpdateAll';
// import cache from '../../client/cache';

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
    prayers: [],
    prayerIndex: 0,
    prayed: false,
    saved: false,
  };

  title = this.props.navigation.getParam('title', 'My Church');

  componentDidMount() {
    this.setState(() => {
      const prayers = this.props.navigation.getParam('prayers', []);

      return {
        prayers,
        saved: prayers[0].isSaved,
      };
    });
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    const prayer = this.state.prayers[this.state.prayerIndex];
    const isLastPrayer =
      this.state.prayerIndex + 1 === this.state.prayers.length;

    // this can simply be a navigate.replace
    const advancePrayer = (prayed = false) =>
      !isLastPrayer
        ? this.setState((prevState) => ({
            prayerIndex: prevState.prayerIndex + 1,
            prayed: prayed ? false : prevState.prayed,
            saved: prevState.prayers[prevState.prayerIndex + 1].isSaved,
          }))
        : this.props.navigation.popToTop();

    return (
      <ModalView onClose={() => this.props.navigation.popToTop()}>
        <FlexedSafeAreaView>
          <Mutation
            mutation={FLAG_PRAYER}
            // TODO: we probably won't need this
            // since we're going to pull one prayer at a time
            // update={() => flagPrayerUpdateAll(cache, prayer.id)}
          >
            {(flagPrayer) => (
              <Mutation mutation={INCREMENT_PRAYER_COUNT}>
                {(increment) => (
                  <FlexedView>
                    <ScrollArea>
                      <ScrollView>
                        <Header>
                          <H6>Praying for</H6>
                          <GreenH4>{this.title}</GreenH4>
                        </Header>
                        <StyledPrayerView>
                          {prayer ? (
                            <PrayerSingle
                              avatarSize={'medium'}
                              navigation={this.props.navigation}
                              prayer={prayer}
                              action={
                                <SaveButton
                                  toggleSavedState={() =>
                                    this.setState((prevState) => ({
                                      saved: !prevState.saved,
                                    }))
                                  }
                                  saved={this.state.saved}
                                  prayerID={prayer.id}
                                />
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
        </FlexedSafeAreaView>
      </ModalView>
    );
  }
}

export default PrayerList;
