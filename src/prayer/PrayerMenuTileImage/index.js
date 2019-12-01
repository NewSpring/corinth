import React, { memo } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardImage,
  H4,
  styled,
  withTheme,
} from '@apollosproject/ui-kit';

const TitleView = styled(({ theme }) => ({
  position: 'absolute',
  bottom: theme.sizing.baseUnit,
  left: theme.sizing.baseUnit,
  right: theme.sizing.baseUnit,
  backgroundColor: theme.colors.transparent,
}))(View);

const Title = styled({
  color: 'white',
})(H4);

const SquareCard = styled(() => ({
  width: 150,
  height: 150,
}))(Card);

const StyledCardContent = styled(
  ({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'flex-start', // needed to make `Label` display as an "inline" element
    paddingHorizontal: theme.sizing.baseUnit, // TODO: refactor CardContent to have this be the default
    paddingBottom: theme.sizing.baseUnit * 1.5, // TODO: refactor CardContent to have this be the default
  }),
  'ui-kit.HorizontalHighlightCard.Content'
)(CardContent);

const StyledCardImage = withTheme(({ theme }) => ({
  minAspectRatio: 1,
  maxAspectRatio: 1,
  maintainAspectRatio: true,
  forceRatio: 1, // fixes loading state
  overlayColor: theme.colors.primary,
  overlayType: 'high',
}))(CardImage);

const PrayerMenuTileImage = memo(({ image, text }) => (
  <SquareCard>
    <StyledCardImage source={{ uri: image }} />
    <StyledCardContent>
      <TitleView>
        <Title>{text}</Title>
      </TitleView>
    </StyledCardContent>
  </SquareCard>
));

PrayerMenuTileImage.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string,
};

PrayerMenuTileImage.defaultProps = {
  text: '',
};

PrayerMenuTileImage.displayName = 'PrayerMenuTileImage';

export default PrayerMenuTileImage;
