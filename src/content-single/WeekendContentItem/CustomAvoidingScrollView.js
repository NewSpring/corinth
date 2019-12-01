import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { styled } from '@apollosproject/ui-kit';

const FlexedAvoidingView = styled({ flex: 1 })(KeyboardAvoidingView);

const CustomAvoidingScrollView = ({ children, ...scrollViewProps }) => (
  <FlexedAvoidingView
    enabled
    behavior={Platform.OS === 'ios' ? 'padding' : false}
  >
    <ScrollView
      keyboardShouldPersistTaps={'always'}
      keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  </FlexedAvoidingView>
);

CustomAvoidingScrollView.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};

export default CustomAvoidingScrollView;
