import React, { useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';

import { AnalyticsConsumer } from '@apollosproject/ui-analytics';
import {
  Icon,
  TextInput,
  BodyText,
  styled,
  Touchable,
} from '@apollosproject/ui-kit';

const StyledTextInput = styled(({ theme }) => ({
  borderWidth: 0.5,
  borderColor: theme.colors.shadows.default,
  paddingHorizontal: theme.sizing.baseUnit * 0.5,
  paddingTop: theme.sizing.baseUnit,
  paddingBottom: theme.sizing.baseUnit,
  textAlignVertical: 'top',
}))(TextInput);

const StyledAddNoteView = styled({
  flex: 1,
  flexDirection: 'row',
})(View);

const PaddedText = styled(({ theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit,
}))(BodyText);

const CustomNote = () => {
  const [hasBox, showBox] = useState(false);
  const [note, setNote] = useState('');
  return hasBox ? (
    <StyledTextInput
      multiline
      returnKeyType={'default'}
      value={note}
      scrollEnabled={false}
      onChangeText={(text) => {
        setNote(text);
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
          <StyledAddNoteView>
            <Icon name={'add'} size={24} />
            <PaddedText>Add a Note</PaddedText>
          </StyledAddNoteView>
        </Touchable>
      )}
    </AnalyticsConsumer>
  );
};

export default CustomNote;
