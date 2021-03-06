import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { AnalyticsConsumer } from '@apollosproject/ui-analytics';
import {
  Icon,
  TextInput,
  BodyText,
  styled,
  Touchable,
  PaddedView,
} from '@apollosproject/ui-kit';

const StyledTextInput = styled(({ theme }) => ({
  borderWidth: 0.5,
  borderColor: theme.colors.shadows.default,
  paddingHorizontal: theme.sizing.baseUnit * 0.5,
  paddingTop: theme.sizing.baseUnit,
  paddingBottom: theme.sizing.baseUnit,
  textAlignVertical: 'top',
  color: theme.colors.text.primary,
  height: null,
}))(TextInput);

const AddNoteView = styled({
  flex: 1,
  flexDirection: 'row',
})(PaddedView);

const NoteComment = ({ onChange, initialText }) => {
  const [hasBox, showBox] = useState(initialText !== '');
  const [note, setNote] = useState(initialText);
  return hasBox ? (
    <StyledTextInput
      multiline
      returnKeyType={'default'}
      value={note}
      scrollEnabled={false}
      onChangeText={(text) => {
        setNote(text);
        onChange(text);
      }}
    />
  ) : (
    <AnalyticsConsumer>
      {({ track }) => (
        <Touchable
          onPress={() => {
            showBox(true);
            track({ eventName: 'Added Custom Note' });
          }}
        >
          <AddNoteView horizontal={false}>
            <Icon name={'add'} size={24} />
            <PaddedView vertical={false}>
              <BodyText>Add a Note</BodyText>
            </PaddedView>
          </AddNoteView>
        </Touchable>
      )}
    </AnalyticsConsumer>
  );
};

NoteComment.propTypes = {
  onChange: PropTypes.func,
  initialText: PropTypes.string,
};

export default NoteComment;
