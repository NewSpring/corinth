import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { ErrorCard, PaddedView, H3 } from '@apollosproject/ui-kit';
import { get } from 'lodash';
import TextFeature from './TextFeature';
import ScriptureFeature from './ScriptureFeature';
import HeaderFeature from './HeaderFeature';
import NoteFeature from './NoteFeature';
import SermonNotes from './SermonNotes';

import GET_CONTENT_ITEM_FEATURES from './getContentItemFeatures';

const FEATURE_MAP = {
  TextFeature,
  ScriptureFeature,
  HeaderFeature,
  NoteFeature,
};

const Features = ({ contentId, asNotes }) => {
  if (!contentId) return null;

  return (
    <Query
      query={GET_CONTENT_ITEM_FEATURES}
      fetchPolicy="cache-and-network"
      variables={{ contentId }}
    >
      {({ data: { node } = {}, loading, error }) => {
        if (error) return <ErrorCard error={error} />;
        if (loading) return null;

        const features = get(node, 'features', []);
        if (!features || !features.length) return null;
        const featureComponents = features.map(({ __typename, ...feature }) => {
          const Feature = FEATURE_MAP[__typename];
          if (!Feature) return null;
          return (
            <View key={feature.id}>
              <Feature {...feature} contentId={contentId} card={!asNotes} />
              {asNotes ? <PaddedView /> : null}
            </View>
          );
        });
        return asNotes ? (
          <SermonNotes features={featureComponents} contentItem={node} />
        ) : (
          <PaddedView horizontal={false}>
            <PaddedView vertical={false}>
              <H3 padded>Engage</H3>
            </PaddedView>
            featureComponents
          </PaddedView>
        );
      }}
    </Query>
  );
};

Features.propTypes = {
  contentId: PropTypes.string,
  asNotes: PropTypes.bool,
};

Features.defaultProps = {
  // asNotes: false,
  asNotes: false,
};

export default Features;
