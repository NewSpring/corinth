import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import { makeIcon } from '@apollosproject/ui-kit';

const Icon = makeIcon(({ size, fill, ...otherProps } = {}) => (
  <Svg
    width={size}
    fill={fill}
    height={size}
    viewBox="0 0 24 24"
    {...otherProps}
  >
    <Path
      d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"
      // fill={'none'}
      // stroke={fill}
      // strokeWidth={2}
      // strokeLinecap={'round'}
      // strokeLinejoin={'round'}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
