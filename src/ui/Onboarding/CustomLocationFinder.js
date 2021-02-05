import React, { memo } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import {
  CampusCard,
  Chip,
  PaddedView,
  styled,
  Button,
  Touchable,
} from '@apollosproject/ui-kit';

import { Slide, SlideContent } from '@apollosproject/ui-onboarding';

const getCampusAddress = (campus) =>
  `${campus.street1}\n${campus.city}, ${campus.state} ${campus.postalCode}`;

const StyledCampusCard = styled(({ theme }) => ({
  marginBottom: theme.sizing.baseUnit,
}))(CampusCard);

const StyledSlideContent = styled({
  flex: 1,
  justifyContent: 'space-between',
})(SlideContent);

const StyledChip = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit,
  alignSelf: 'center',
  color: theme.colors.text.tertiary,
}))(Chip);

// memo = sfc PureComponent 💥
const LocationFinder = memo(
  ({
    onPressPrimary,
    onPressSecondary,
    BackgroundComponent,
    slideTitle,
    description,
    buttonText,
    buttonDisabled,
    onPressButton,
    campus,
    onSelectWeb,
    ...props
  }) => {
    const showSkip = !campus;
    const swipeFunction = onPressPrimary || onPressSecondary;
    return (
      <Slide
        {...props}
        onPressSecondary={showSkip ? onSelectWeb : null}
        onPressPrimary={!showSkip ? swipeFunction : null}
      >
        {BackgroundComponent}
        <StyledSlideContent title={slideTitle} description={description}>
          <View>
            <StyledChip onPress={onSelectWeb} title="I attend online" />
            {campus && campus.image ? (
              <Touchable onPress={onPressButton}>
                <StyledCampusCard
                  key={campus.id}
                  distance={campus.distanceFromLocation}
                  title={campus.name}
                  description={getCampusAddress(campus)}
                  images={[campus.image]}
                />
              </Touchable>
            ) : (
              <PaddedView horizontal={false}>
                <Button
                  title={buttonText}
                  onPress={onPressButton}
                  disabled={buttonDisabled}
                  pill={false}
                />
              </PaddedView>
            )}
          </View>
        </StyledSlideContent>
      </Slide>
    );
  }
);

LocationFinder.propTypes = {
  /* The `Swiper` component used in `<Onboarding>` looks for and hijacks the title prop of it's
   * children. Thus we have to use a more unique name.
   */
  onPressPrimary: PropTypes.func,
  BackgroundComponent: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  slideTitle: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  buttonDisabled: PropTypes.bool,
  onPressButton: PropTypes.func,
  campus: PropTypes.shape({
    image: PropTypes.shape({
      uri: PropTypes.string,
    }),
    distanceFromLocation: PropTypes.number,
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  onSelectWeb: PropTypes.func,
  onPressSecondary: PropTypes.func,
};

LocationFinder.displayName = 'LocationFinder';

LocationFinder.defaultProps = {
  slideTitle: "Let's select your local campus",
  description:
    "We'll use your location to connect you with your nearby campus and community",
  buttonText: 'Yes, find my local campus',
  buttonDisabled: false,
};

export default LocationFinder;
