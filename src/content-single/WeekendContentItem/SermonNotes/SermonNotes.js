import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Share } from 'react-native';
import {
  ActionCard,
  H3,
  H5,
  BodyText,
  FlexedView,
  styled,
  Touchable,
  PaddedView,
  Icon,
} from '@apollosproject/ui-kit';
import { LegalText } from '@apollosproject/ui-scripture';
import { AnalyticsConsumer } from '@apollosproject/ui-analytics';
import TextNote from './TextNote';
import ScriptureNote from './ScriptureNote';
import CustomNote from './CustomNote';

const NoteTypeMapper = (props) => {
  switch (props.type) {
    case 'TextNote':
      return <TextNote {...props} />;
    case 'ScriptureNote':
      return <ScriptureNote {...props} />;
    default:
      return null;
  }
};

NoteTypeMapper.propTypes = {
  type: PropTypes.string,
};

const ExportWrapper = styled({
  flexDirection: 'row',
})(FlexedView);

const SermonNotes = ({ isLoading, ...contentItem }) => {
  const hasNotes = !isLoading && !contentItem.sermonNotes.length;
  const [exports, setExports] = useState([]);
  const handleChangeExportText = (index) => (text) => {
    const changed = exports;
    changed[index] = text;
    setExports(changed);
  };
  const {
    title = '',
    seriesConnection: { series: { title: seriesTitle } } = {
      series: { title },
    },
    communicators = [],
    guestCommunicators = [],
    sermonNotes = [],
  } = contentItem;
  const communicatorNames = communicators.map(
    ({ nickName, firstName, lastName }) =>
      `${nickName || firstName} ${lastName}`
  );
  const speakers = communicatorNames.concat(guestCommunicators);
  const copyrights = new Set(
    sermonNotes
      .filter(({ scripture }) => !!scripture)
      .map((note) => note.scripture.copyright)
  );

  // set up exported text
  useEffect(() => {
    const exportTemplate = [];
    sermonNotes.forEach((note) => {
      exportTemplate.push(note.simpleText);
      exportTemplate.push('');
    });
    setExports(exportTemplate);
  }, []);

  return (
    <ActionCard
      isLoading={isLoading}
      action={
        hasNotes ? (
          <AnalyticsConsumer>
            {({ track }) => (
              <Touchable
                onPress={() => {
                  const textExports = exports.filter((text) => text !== '');
                  Share.share({
                    message: `Sermon Notes\n${title}\n${seriesTitle}${
                      speakers.length ? '\n' : ''
                    }${speakers.join('\n')}${
                      textExports.length ? '\n\n' : ''
                    }${textExports.join('\n\n')}`,
                  });
                  track({
                    eventName: 'Exported Sermon Notes',
                    properties: { title },
                  });
                }}
              >
                <ExportWrapper>
                  <PaddedView vertical={false}>
                    <BodyText>Export</BodyText>
                  </PaddedView>
                  <Icon name={'export'} size={24} />
                </ExportWrapper>
              </Touchable>
            )}
          </AnalyticsConsumer>
        ) : null
      }
    >
      <H3 isLoading={false}>{hasNotes ? 'Sermon Notes' : null}</H3>
      <H5>{title}</H5>
      <H5>{seriesTitle}</H5>
      {speakers.length
        ? speakers
            .filter((speaker) => speaker !== '')
            .map((speaker) => <H5 key={speaker}>{speaker}</H5>)
        : null}

      {sermonNotes.length ? (
        <>
          {sermonNotes.map((note, i) => (
            <>
              <NoteTypeMapper type={note.__typename} key={note.id} {...note} />
              {note.allowsCustomNote ? (
                <CustomNote onChange={handleChangeExportText(i * 2 + 1)} />
              ) : null}
            </>
          ))}
          {[...copyrights].map((text) => (
            <LegalText key={text}>{text}</LegalText>
          ))}
        </>
      ) : null}
    </ActionCard>
  );
};

SermonNotes.propTypes = {
  isLoading: PropTypes.bool,
};

export default SermonNotes;
