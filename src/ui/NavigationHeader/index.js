import React from 'react';
import PropTypes from 'prop-types';
import { ModalViewHeader } from '@apollosproject/ui-kit';

const NavigationHeader = ({ scene, navigation }) => {
  let onBack = null;
  // The isolated prop is for a situation where a content single is navigated to from a separate navigator.
  // This will only ever be true if that content single cannot navigate to another screen and we need to
  // navigate back to the previous route.
  if (scene.index > 0 || navigation.state.params.isolated)
    onBack = () => navigation.pop();

  const onClose = () => {
    navigation.goBack();
  };

  return (
    <ModalViewHeader
      onClose={navigation.state.params.isolated ? null : onClose}
      onBack={onBack}
      navigationHeader
    />
  );
};

NavigationHeader.propTypes = {
  scene: PropTypes.shape({
    index: PropTypes.number,
  }),
  navigation: PropTypes.shape({
    pop: PropTypes.func,
    popToTop: PropTypes.func,
  }),
};

export default NavigationHeader;
