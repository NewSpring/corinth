import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { contentCardComponentMapper } from '../ContentCardConnected';

const SearchCard = memo(
  ({
    Component,
    coverImage,
    isLoading,
    node,
    summary,
    title,
    ...otherProps
  }) => {
    /* We don't have a way to know for certain if a particular card is true for `hasAction` without
     * hitting Rock. While not 100% perfect we do know that these two types will have almost always
     * have media associated with them. */
    const hasAction = ['MediaContentItem', 'WeekendContentItem'].includes(
      get(node, '__typename')
    );

    return (
      <Component
        coverImage={get(coverImage, 'sources', [])}
        hasAction={hasAction}
        isLoading={isLoading}
        summary={summary}
        title={title}
        {...otherProps}
        {...node}
      />
    );
  }
);

SearchCard.propTypes = {
  Component: PropTypes.func,
  coverImage: PropTypes.shape({
    sources: PropTypes.array,
  }),
  summary: PropTypes.string,
  title: PropTypes.string,
  node: PropTypes.shape({}),
  isLoading: PropTypes.bool,
};

SearchCard.defaultProps = {
  Component: contentCardComponentMapper,
};

SearchCard.displayName = 'SearchCard';

export default SearchCard;
