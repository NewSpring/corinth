import React from 'react';
import PropTypes from 'prop-types';
import { ActionCard, H3, H5, PaddedView } from '@apollosproject/ui-kit';
import TextNote from './TextNote';
import ScriptureNote from './ScriptureNote';

const SermonNotes = ({ isLoading, ...contentItem }) => {
  const {
    title = '',
    seriesConnection: { series: { title: seriesTitle }, itemIndex } = {
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
  return (
    <ActionCard isLoading={isLoading}>
      <H3>Sermon Notes</H3>
      <H5>{title}</H5>
      <H5>
        {seriesTitle || ''}
        {itemIndex ? ` - Week ${itemIndex}` : ''}
        {/*  - Date */}
      </H5>
      {speakers.length
        ? speakers.map(
            (speaker) =>
              speaker !== '' ? <H5 key={speaker}>{speaker}</H5> : null
          )
        : null}

      {sermonNotes.length ? (
        <>
          {sermonNotes.map((note) => {
            switch (note.__typename) {
              case 'TextNote':
                return <TextNote key={note.id} {...note} />;
              case 'ScriptureNote':
                return <ScriptureNote key={note.id} {...note} />;
              default:
                return null;
            }
          })}
        </>
      ) : null}
    </ActionCard>
  );
};

SermonNotes.propTypes = {
  isLoading: PropTypes.bool,
};

export default SermonNotes;
