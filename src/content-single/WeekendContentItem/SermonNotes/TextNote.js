import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { H4, BodyText, PaddedView } from '@apollosproject/ui-kit';
import { AnalyticsConsumer } from '@apollosproject/ui-analytics';

const TextNote = ({ text, isHeader }) => {
  const [isPressed, press] = useState(false);
  const blanksRegex = /__(.*)__/gm;
  const textWithBlanks = text.replace(blanksRegex, (match, p1) =>
    '_'.repeat(p1.length)
  );
  const textNoBlanks = text.replace(blanksRegex, (match, p1) => p1);
  const TextComponent = isHeader ? H4 : BodyText;
  const Note = () => (
    <TextComponent>{isPressed ? textNoBlanks : textWithBlanks}</TextComponent>
  );
  return (
    <AnalyticsConsumer>
      {({ track }) => (
        <TouchableOpacity
          onPress={() => {
            press(true);
            track({ eventName: 'Clicked Fill-in-the-blank' });
          }}
          disabled={isPressed || !text.match(blanksRegex)}
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
  text: PropTypes.string,
  isHeader: PropTypes.bool,
};

export default TextNote;
