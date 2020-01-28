import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { FeaturedCard, CardLabel, styled } from '@apollosproject/ui-kit';

// If we decide to go back to what we had before:
// * Uncomment the LiveAwareLabel code below
// * Remove hasAction & campaign from props and propTypes
// * Remove the StyledCardLabel & getTheme functions
// * Change LabelComponent to be:
// LabelComponent={
//    labelText ? (
//      <LiveAwareLabel
//        type={get(theme, 'type') === 'LIGHT' ? 'darkOverlay' : undefined}
//        customTheme={theme}
//        isLive={isLive}
//        title={labelText}
//      />
//    ) : null

// const LiveAwareLabel = withTheme(	const StyledCardLabel = styled(({ theme }) => ({
//   ({ customTheme, isLive, title, type, theme }) => ({	  marginBottom: theme.sizing.baseUnit,
//     ...(isLive	}))(CardLabel);
//       ? {
//           title: 'Live',
//           type: 'secondary',
//           icon: 'live-dot',
//           iconSize: theme.helpers.rem(0.4375), // using our typographic size unit based on fontSize so that the icon scales correctly with font size changes.
//         }
//       : {
//           title,
//           type: !customTheme ? 'secondary' : type,
//         }),
//     style: { marginBottom: theme.sizing.baseUnit },
//   })
// )(CardLabel);

const StyledCardLabel = styled(({ theme }) => ({
  marginBottom: theme.sizing.baseUnit,
}))(CardLabel);

const getTheme = (theme) =>
  get(theme, 'type') === 'LIGHT' ? 'darkOverlay' : undefined;

const BrandedCard = ({
  theme = {},
  isLive,
  labelText,
  hasAction,
  campaign,
  ...otherProps
}) => (
  <FeaturedCard
    LabelComponent={
      campaign && isLive ? (
        <StyledCardLabel title={'Sermon Notes'} />
      ) : (
        labelText && (
          <StyledCardLabel
            title={labelText}
            type={theme ? getTheme(theme) : 'secondary'}
          />
        )
      )
    }
    theme={theme}
    isLive={isLive}
    hasAction={campaign && isLive ? false : hasAction}
    {...otherProps}
  />
);

BrandedCard.propTypes = {
  theme: PropTypes.shape({
    type: PropTypes.string,
  }),
  isLive: PropTypes.bool,
  labelText: PropTypes.string,
  hasAction: PropTypes.bool,
  campaign: PropTypes.bool,
};

export default BrandedCard;
