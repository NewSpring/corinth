import React, { useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import PropTypes from 'prop-types';
import Analytics from 'appcenter-analytics';

import { AnalyticsConsumer } from '@apollosproject/ui-analytics';
import {
  ActionCard,
  Icon,
  TextInput,
  BodyText,
  styled,
  Touchable,
} from '@apollosproject/ui-kit';
import ShareButtonConnected from '@apollosproject/ui-connected';

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

const Note = ({ id: featureId, placeholder, onNotesChange, onNoteChange }) => {
  const [hasBox, showBox] = useState(false);
  const [note, setNote] = useState('');
  return hasBox ? (
    <StyledTextInput
      multiline
      defaultValue={placeholder}
      returnKeyType={'default'}
      value={note}
      scrollEnabled={false}
      onChangeText={(text) => {
        setNote(text); // this is local state
        onNoteChange(text); // updates text for sharing this specific note
        onNotesChange(featureId, text); // updates text for sharing sermon notes
      }}
    />
  ) : (
    <AnalyticsConsumer>
      {({ track }) => (
        <Touchable
          onPress={() => {
            showBox(true);
            Analytics.trackEvent('Added Custom Note');
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
Note.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onNotesChange: PropTypes.func,
  onNoteChange: PropTypes.func,
};

const NoteFeature = ({ contentId, card, ...noteProps }) => {
  const [sharedMsg, setSharedMsg] = useState('');
  return card ? (
    <ActionCard
      icon={'play'}
      action={<ShareButtonConnected message={sharedMsg} itemId={contentId} />}
    >
      <KeyboardAvoidingView>
        <Note {...noteProps} onNoteChange={(text) => setSharedMsg(text)} />
      </KeyboardAvoidingView>
    </ActionCard>
  ) : (
    <Note {...noteProps} onNoteChange={(text) => setSharedMsg(text)} />
  );
};

NoteFeature.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  contentId: PropTypes.string.isRequired,
  card: PropTypes.bool,
  onSharingChange: PropTypes.func,
};

NoteFeature.defaultProps = {
  card: true,
};

export const NOTE_FEATURE_FRAGMENT = `
fragment NoteFeatureFragment on NoteFeature {
  placeholder
  id
}
`;

export default NoteFeature;
