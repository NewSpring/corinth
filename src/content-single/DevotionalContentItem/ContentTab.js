import React from 'react';
import { ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { RockAuthedWebBrowser } from '@apollosproject/ui-connected';
import {
  BodyText,
  Button,
  PaddedView,
  H2,
  H3,
  styled,
  withIsLoading,
} from '@apollosproject/ui-kit';
import { ScriptureList } from '@apollosproject/ui-scripture';
import HorizontalContentSeriesFeedConnected from '../../ui/HorizontalContentSeriesFeedConnected';
import ContentHTMLViewConnected from '../../ui/ContentHTMLViewConnected';
import MediaControls from '../../ui/MediaControls';
import { GET_USER_PROFILE } from '../../tabs/connect/UserAvatarHeader';

const MediaView = styled(({ theme }) => ({
  paddingTop: theme.sizing.baseUnit * 2,
  alignItems: 'center',
}))(PaddedView);

const ContentContainer = withIsLoading(
  styled({ paddingVertical: 0 })(PaddedView)
);

const AdUnit = styled(({ theme }) => ({
  padding: theme.sizing.baseUnit * 2,
  backgroundColor: theme.colors.lightTertiary,
  borderRadius: 10,
}))(View);

const AdUnitH3 = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit,
}))(H3);

const AdUnitButton = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit,
}))(Button);

/**
 * This is the Content side of the Devotional tabbed component.
 * Displays a header, scripture list (using the ScriptureList component),
 * and the body text of the devo.
 */
const ContentTab = ({
  id,
  title,
  references,
  isLoading,
  navigationState,
  navigation,
}) => (
  <Query query={GET_USER_PROFILE} fetchPolicy="cache-and-network">
    {({ data: { currentUser = { profile: {} } } = {} }) => {
      const { isInReadMyBible } = currentUser.profile;
      return (
        <ScrollView>
          <ContentContainer isLoading={isLoading}>
            <H2 padded>{title}</H2>
            <MediaView>
              <MediaControls contentId={id} />
            </MediaView>
            {references && references.length ? (
              <ScriptureList
                references={references}
                onPress={navigationState.route.jumpTo} // eslint-disable-line react/jsx-handler-names
                tabDestination={'scripture'}
              />
            ) : null}
            <ContentHTMLViewConnected contentId={id} />
            {!isInReadMyBible ? (
              <RockAuthedWebBrowser>
                {(openUrl) => (
                  <AdUnit>
                    <AdUnitH3>
                      Daily Devotionals, Delivered Every Morning
                    </AdUnitH3>
                    <BodyText>
                      Sign up to receive daily devotionals via text message
                      every morning.
                    </BodyText>
                    <AdUnitButton
                      title={'Subscribe Now'}
                      onPress={() =>
                        openUrl(
                          'https://newspring.cc/workflows/510?CommunicationList=5e888a13-b0b5-411f-87bd-fd3352deca31&hidenav=true',
                          {},
                          { useRockToken: true }
                        )
                      }
                    />
                  </AdUnit>
                )}
              </RockAuthedWebBrowser>
            ) : null}
          </ContentContainer>
          <HorizontalContentSeriesFeedConnected
            contentId={id}
            navigation={navigation}
          />
        </ScrollView>
      );
    }}
  </Query>
);

ContentTab.propTypes = {
  /** The id of the devotional item */
  id: PropTypes.string,
  /** Toggles placeholders */
  isLoading: PropTypes.bool,
  /**
   * The state of the TabView component (of which the ContentTab is one child component). Mostly used
   * for the ScriptureList component to be able to jump to the ScriptureTab when the scripture
   * reference link is tapped.
   */
  navigationState: PropTypes.shape({
    route: PropTypes.shape({ jumpTo: PropTypes.func }),
  }),
  /** An array of human readable references (i.e. '1 Corinthians 15:57') */
  references: PropTypes.arrayOf(PropTypes.string),
  /** The devotional title */
  title: PropTypes.string,
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};

export default ContentTab;
