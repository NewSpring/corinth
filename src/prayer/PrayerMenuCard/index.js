import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { styled } from '@apollosproject/ui-kit';
import PrayerMenuTileImage from '../PrayerMenuTileImage';

const Tile = styled(({ theme, selected }) => ({
  marginHorizontal: theme.sizing.baseUnit * -0.75,
  transform: selected
    ? [{ scaleX: 1 }, { scaleY: 1.1 }]
    : [{ scaleX: 0.95 }, { scaleY: 1 }],
}))(View);

const PrayerMenuCard = ({ image, selected, title }) => (
  <Tile selected={selected}>
    <PrayerMenuTileImage image={image} text={title} />
  </Tile>
);

PrayerMenuCard.propTypes = {
  image: PropTypes.string,
  selected: PropTypes.bool,
  title: PropTypes.string,
};

export default PrayerMenuCard;
