import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { H4, BodyText, PaddedView } from '@apollosproject/ui-kit';
import { AnalyticsConsumer } from '@apollosproject/ui-analytics';

const TextNote = ({ hasBlanks, simpleText, hiddenText, isHeader }) => {
  const [isPressed, press] = useState(false);
  const TextComponent = isHeader ? H4 : BodyText;
  const Note = () => (
    <TextComponent>
      {isPressed || !hasBlanks ? simpleText : hiddenText}
    </TextComponent>
  );
  return (
    <AnalyticsConsumer>
      {({ track }) => (
        <TouchableOpacity
          onPress={() => {
            press(true);
            track({ eventName: 'Clicked Fill-in-the-blank' });
          }}
          disabled={isPressed || !hasBlanks}
        >
          <PaddedView horizontal={false}>
            <Note />
          </PaddedView>
        </TouchableOpacity>
      )}
    </AnalyticsConsumer>
  );
};

TextNote.propTypes = {
  hasBlanks: PropTypes.bool,
  simpleText: PropTypes.string,
  hiddenText: PropTypes.string,
  isHeader: PropTypes.bool,
};

export default TextNote;
