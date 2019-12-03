import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import { ActionCard, BodyText, H4 } from '@apollosproject/ui-kit';
import ShareContentButtonConnected from '../../ui/ShareContentButtonConnected';

const TextFeature = ({
  body,
  sharing: { message } = {},
  contentId,
  header,
  card,
}) => {
  const [isPressed, press] = useState(false);
  const blanksRegex = /__(.*)__/gm;
  const hasBlanks = body.match(blanksRegex);
  const bodyWithBlank = body.replace(blanksRegex, (match, p1) =>
    '_'.repeat(p1.length)
  );
  const bodyWithWord = body.replace(blanksRegex, (match, p1) => p1);
  const TextComponent = header ? H4 : BodyText;
  const FillInTheBlank = () => (
    <TextComponent>{isPressed ? bodyWithWord : bodyWithBlank}</TextComponent>
  );

  return (
    <TouchableOpacity
      onPress={() => press(true)}
      disabled={isPressed || !hasBlanks}
    >
      {card ? (
        <ActionCard
          icon={'play'}
          action={
            <ShareContentButtonConnected message={message} itemId={contentId} />
          }
        >
          <FillInTheBlank />
        </ActionCard>
      ) : (
        <FillInTheBlank />
      )}
    </TouchableOpacity>
  );
};

TextFeature.propTypes = {
  body: PropTypes.string.isRequired,
  sharing: PropTypes.shape({ message: PropTypes.string }),
  contentId: PropTypes.string.isRequired,
  header: PropTypes.bool,
  card: PropTypes.bool,
};

TextFeature.defaultProps = {
  header: false,
  card: true,
};

export const TEXT_FEATURE_FRAGMENT = `
fragment TextFeatureFragment on TextFeature {
  body
  id
  sharing {
    message
  }
}
`;

export default TextFeature;
