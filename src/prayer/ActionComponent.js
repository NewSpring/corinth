import React from 'react';
import ActionSheet from 'react-native-actionsheet';
import PropTypes from 'prop-types';
import { Touchable } from '@apollosproject/ui-kit';

class ActionComponent extends React.Component {
  handleShowActionSheet = () => {
    this.ActionSheet.show();
  };

  render() {
    const { options, component } = this.props;
    return (
      <>
        <Touchable onPress={this.handleShowActionSheet}>{component}</Touchable>
        <ActionSheet
          ref={(sheet) => {
            this.ActionSheet = sheet;
          }}
          options={options.map((option) => option.title)}
          cancelButtonIndex={options.length - 1}
          destructiveButtonIndex={options
            .map((option) => option.destructive)
            .indexOf(true)}
          onPress={async (index) => {
            if (index !== options.length - 1) {
              options[index].method();
            }
          }}
        />
      </>
    );
  }
}

ActionComponent.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({ method: PropTypes.func })),
  component: PropTypes.element,
};

export default ActionComponent;
