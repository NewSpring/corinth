import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { FeaturedCard, CardLabel, styled } from '@apollosproject/ui-kit';

const StyledCardLabel = styled(
  ({ isLoading, theme }) =>
    isLoading
      ? {}
      : {
          marginBottom: theme.sizing.baseUnit,
        }
)(CardLabel);

const getTheme = (theme) =>
  get(theme, 'type') === 'LIGHT' ? 'darkOverlay' : undefined;

const BrandedCard = ({
  theme = {},
  isLive,
  labelText,
  hasAction,
  campaign,
  summary,
  ...otherProps
}) => (
  <FeaturedCard
    LabelComponent={
      campaign && isLive ? (
        <StyledCardLabel
          isLoading={otherProps.isLoading}
          title={"Today's Sermon"}
        />
      ) : (
        labelText && (
          <StyledCardLabel
            isLoading={otherProps.isLoading}
            title={labelText}
            type={theme ? getTheme(theme) : 'secondary'}
          />
        )
      )
    }
    theme={theme}
    isLive={isLive}
    hasAction={campaign && isLive ? false : hasAction}
    summary={campaign && isLive ? 'Tap for sermon notes and more' : summary}
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
  summary: PropTypes.string,
};

export default BrandedCard;
