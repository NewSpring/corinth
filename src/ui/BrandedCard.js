import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { FeaturedCard, CardLabel, withTheme } from '@apollosproject/ui-kit';

const LiveAwareLabel = withTheme(
  ({ customTheme, isLive, title, type, theme }) => ({
    ...(isLive
      ? {
          title: 'Live',
          type: 'secondary',
          icon: 'live-dot',
          iconSize: theme.helpers.rem(0.4375), // using our typographic size unit based on fontSize so that the icon scales correctly with font size changes.
        }
      : {
          title,
          type: !customTheme ? 'secondary' : type,
        }),
    style: { marginBottom: theme.sizing.baseUnit },
  })
)(CardLabel);

const BrandedCard = ({ theme = {}, isLive, labelText, ...otherProps }) => (
  <FeaturedCard
    LabelComponent={
      labelText ? (
        <LiveAwareLabel
          type={get(theme, 'type') === 'LIGHT' ? 'darkOverlay' : undefined}
          customTheme={theme}
          isLive={isLive}
          title={labelText}
        />
      ) : null
    }
    theme={theme}
    isLive={isLive}
    {...otherProps}
  />
);

BrandedCard.propTypes = {
  theme: PropTypes.shape({
    type: PropTypes.string,
  }),
  isLive: PropTypes.bool,
  labelText: PropTypes.string,
};

export default BrandedCard;
