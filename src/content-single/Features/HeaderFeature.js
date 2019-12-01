import React from 'react';
import TextFeature from './TextFeature';

const HeaderFeature = ({ ...props }) => <TextFeature {...props} header />;

export const HEADER_FEATURE_FRAGMENT = `
fragment HeaderFeatureFragment on HeaderFeature {
  body
  id
  sharing {
    message
  }
}
`;

export default HeaderFeature;
