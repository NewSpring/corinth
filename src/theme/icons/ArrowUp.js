import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Line, Polyline } from 'react-native-svg';
import { makeIcon } from '@apollosproject/ui-kit';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Line
      class="a"
      x1="12"
      y1="23.247"
      x2="12"
      y2="0.747"
      stroke={fill}
      strokeWidth={2}
    />
    <Polyline
      class="a"
      points="8.25,4.497 12,0.747 15.75,4.497"
      fill={'none'}
      stroke={fill}
      strokeWidth={2}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
