import React from 'react';
import { gql, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';

import { View } from 'react-native';
import { TrackEventWhenLoaded } from '@apollosproject/ui-analytics';
import {
  InteractWhenLoadedConnected,
  NodeSingleConnected,
  ThemeMixinConnected,
  ContentNodeConnected,
  ContentParentFeedConnected,
  ContentChildFeedConnected,
  NodeFeaturesConnected,
} from '@apollosproject/ui-connected';

import ScriptureNodeConnected from '@apollosproject/ui-connected/src/ScriptureNodeConnected';

import { styled } from '@apollosproject/ui-kit';

import ActionContainer from './ActionContainer';
import SermonNotes from './SermonNotes';

const NodeSingleConnectedWithActionContainer = styled(
  ({ theme: { sizing } }) => ({ paddingBottom: sizing.baseUnit * 5 })
)(NodeSingleConnected);

const NodeSingleInner = ({ nodeId, ImageWrapperComponent, ...props }) => (
  <View {...props}>
    <ContentNodeConnected
      ImageWrapperComponent={ImageWrapperComponent}
      nodeId={nodeId}
    />
    <SermonNotes contentID={nodeId} />
    <ScriptureNodeConnected nodeId={nodeId} />
    <NodeFeaturesConnected nodeId={nodeId} />
    {/* <UpNextButtonConnected nodeId={nodeId} /> */}
    <ContentParentFeedConnected nodeId={nodeId} />
    <ContentChildFeedConnected nodeId={nodeId} />
  </View>
);

NodeSingleInner.propTypes = {
  nodeId: PropTypes.string,
  ImageWrapperComponent: PropTypes.any // eslint-disable-line
};

const ContentSingle = (props) => {
  const nodeId = props.route?.params?.itemId;
  const { data, loading } = useQuery(
    gql`
      query getContentNodeTitle($nodeId: ID!) {
        node(id: $nodeId) {
          id
          ... on ContentNode {
            title
          }
        }
      }
    `,
    { variables: { nodeId } }
  );
  return (
    <ThemeMixinConnected nodeId={nodeId}>
      <InteractWhenLoadedConnected
        isLoading={loading}
        nodeId={nodeId}
        action={'COMPLETE'}
      />
      <TrackEventWhenLoaded
        isLoading={loading}
        eventName={'View Content'}
        properties={{
          title: data?.node?.title,
          itemId: nodeId,
        }}
      />
      <NodeSingleConnectedWithActionContainer
        nodeId={nodeId}
        Component={NodeSingleInner}
      >
        <ActionContainer itemId={nodeId} />
      </NodeSingleConnectedWithActionContainer>
    </ThemeMixinConnected>
  );
};

ContentSingle.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func,
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      itemId: PropTypes.string,
    }),
  }),
};

export default ContentSingle;
