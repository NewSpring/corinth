import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { FeaturedCard, CardLabel, styled } from '@apollosproject/ui-kit';

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
