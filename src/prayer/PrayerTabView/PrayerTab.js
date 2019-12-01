import React, { memo } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import {
  styled,
  Button,
  BodyText,
  H4,
  Placeholder,
  FlexedView,
} from '@apollosproject/ui-kit';

const VerticalPaddedView = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit,
}))(View);

const ContentView = styled(({ theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit,
  marginBottom: theme.sizing.baseUnit * 2,
}))(FlexedView);

const StyledButton = styled({
  width: '100%',
})(Button);

const PrayerTab = memo(
  ({ prayers, type, title, description, loading, ...props }) => (
    <ContentView>
      <Placeholder.Paragraph
        lineNumber={2}
        onReady={!loading}
        lastLineWidth="100%"
        firstLineWidth="60%"
      >
        {prayers.length > 0 ? (
          <View>
            <VerticalPaddedView>
              <BodyText placeholder={'Loading Prayers'}>{description}</BodyText>
            </VerticalPaddedView>
            <StyledButton
              title="Start praying"
              onPress={() =>
                props.navigation.navigate('PrayerList', {
                  prayers,
                  title,
                })
              }
            />
          </View>
        ) : (
          <VerticalPaddedView>
            {type === 'saved' ? (
              <H4>You do not have any saved prayers</H4>
            ) : (
              <>
                <H4>There are no prayers yet for your {type}</H4>
                <BodyText>Be the first to add one!</BodyText>
              </>
            )}
          </VerticalPaddedView>
        )}
      </Placeholder.Paragraph>
    </ContentView>
  )
);

PrayerTab.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  prayers: PropTypes.arrayOf(
    PropTypes.shape({}) // TODO fill this out
  ),
  loading: PropTypes.bool,
};

PrayerTab.displayName = 'PrayerTab';

export default PrayerTab;
