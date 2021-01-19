import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import { makeIcon } from '@apollosproject/ui-kit';

const Icon = makeIcon(({ size, fill, ...otherProps } = {}) => (
  <Svg
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 28 28"
    {...otherProps}
  >
    <Path
      opacity="0.2"
      d="M14.0032 23.625C14.0032 23.625 3.0657 17.5 3.0657 10.0625C3.06593 8.74797 3.52142 7.47408 4.35474 6.45742C5.18806 5.44076 6.34777 4.74409 7.63669 4.48585C8.92562 4.22761 10.2642 4.42375 11.4249 5.04092C12.5855 5.65809 13.4966 6.65818 14.0032 7.87118L14.0032 7.87119C14.5098 6.65819 15.4209 5.65809 16.5815 5.04092C17.7422 4.42376 19.0808 4.22762 20.3697 4.48585C21.6586 4.74409 22.8183 5.44076 23.6517 6.45742C24.485 7.47408 24.9405 8.74797 24.9407 10.0625C24.9407 17.5 14.0032 23.625 14.0032 23.625Z"
      fill={fill}
    />
    <Path
      d="M14.0032 23.625C14.0032 23.625 3.0657 17.5 3.0657 10.0625C3.06593 8.74797 3.52142 7.47408 4.35474 6.45742C5.18806 5.44076 6.34777 4.74409 7.63669 4.48585C8.92562 4.22761 10.2642 4.42375 11.4249 5.04092C12.5855 5.65809 13.4966 6.65818 14.0032 7.87118L14.0032 7.87119C14.5098 6.65819 15.4209 5.65809 16.5815 5.04092C17.7422 4.42376 19.0808 4.22762 20.3697 4.48585C21.6586 4.74409 22.8183 5.44076 23.6517 6.45742C24.485 7.47408 24.9405 8.74797 24.9407 10.0625C24.9407 17.5 14.0032 23.625 14.0032 23.625Z"
      stroke={fill}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;