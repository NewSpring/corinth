import React from 'react';
import { Platform, View } from 'react-native';
import PropTypes from 'prop-types';
import { SideBySideView, styled } from '@apollosproject/ui-kit';
import {
  LikeButtonConnected,
  ShareButtonConnected,
} from '@apollosproject/ui-connected';

const PositioningView = styled(({ theme }) => ({
  justifyContent: 'space-around',
  paddingVertical: theme.sizing.baseUnit / 2,
  paddingHorizontal: theme.sizing.baseUnit,
}))(SideBySideView);

const Container = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.paper,
  ...Platform.select(theme.shadows.default),
}))(View);

const ActionContainer = ({ itemId }) => (
  <Container>
      <PositioningView>
        <LikeButtonConnected itemId={itemId} />
        <ShareButtonConnected itemId={itemId} />
      </PositioningView>
  </Container>
);

ActionContainer.propTypes = {
  content: PropTypes.shape({}),
  itemId: PropTypes.string,
};

export default ActionContainer;
