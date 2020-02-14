import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  H3,
  PaddedView,
  ActionCard,
  Touchable,
  Icon,
  H5,
  FlexedView,
  styled,
  BodyText,
} from '@apollosproject/ui-kit';
import { LegalText } from '@apollosproject/ui-scripture';
import Analytics from 'appcenter-analytics';
// TODO: use the one from core once it makes it in a release
// import {share} from '@apollosproject/ui-connected';
import { Platform, Share } from 'react-native';

const share = ({ title, url, message }) => {
  Share.share({
    title,
    message:
      // url isn't used on Android so we want to include that in the message if available
      Platform.OS === 'android'
        ? [message, url].filter((s) => !!s).join('\n')
        : message,
    url,
  });
};

const ExportWrapper = styled({
  flexDirection: 'row',
})(FlexedView);

const PaddedText = styled(({ theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit,
}))(BodyText);

const SermonNotes = ({ contentItem, features }) => {
  const {
    communicators = [],
    guestCommunicators = [],
    title = '',
    seriesConnection = { series: { title: '' }, itemIndex: 0 },
  } = contentItem;
  const [sharedMsg, changeSharedMsg] = useState('');
  const [enhancedFeatures, enhanceFeatures] = useState([]);
  const [copyrights, setCopyrights] = useState(new Set());
  const onNotesChange = (id, text) => {
    const placeholder = `${id}{{(.*?)}}`;
    const re = new RegExp(placeholder, 'gs');
    changeSharedMsg((msg) => msg.replace(re, `${id}{{${text}}}`));
  };
  const communicatorNames = communicators.map(
    ({ nickName, firstName, lastName }) =>
      `${nickName || firstName} ${lastName}`
  );
  const speakers = communicatorNames.concat(guestCommunicators);

  // assemble exported notes
  useEffect(() => {
    // add title, series, and speakers to top
    let msg = `${title}\n${seriesConnection.series.title}\n`;
    speakers.forEach((speaker) => {
      msg += `${speaker}\n`;
    });
    msg += '\n';

    // loop through all features and add them
    const featuresWithCallbacks = features.map((feature) => {
      const featureProps = feature.props.children[0].props;
      let cleanedFeature = feature;

      // clean scripture features
      if (featureProps.scriptures) {
        // pop out all copyrights to be used later
        featureProps.scriptures.forEach((s) => {
          copyrights.add(s.copyright);
        });
        setCopyrights(copyrights);

        // remove all copyrights from features
        const cleanedScriptures = featureProps.scriptures.map((s) => ({
          ...s,
          copyright: '',
        }));
        cleanedFeature = {
          ...feature,
          props: {
            ...feature.props,
            children: [
              {
                ...feature.props.children[0],
                props: {
                  ...feature.props.children[0].props,
                  scriptures: cleanedScriptures,
                },
              },
              feature.props.children[1],
            ],
          },
        };
      }

      // assemble starting message without custom notes
      if (featureProps.sharing) {
        msg = `${msg + featureProps.sharing.message}\n\n`;
        return cleanedFeature;
      }

      // drop in placeholders for custom notes
      if (featureProps.id.match(/NoteFeature/g).length > 0)
        msg = `${msg + featureProps.id}{{}}\n\n`;

      // add callbacks to swap note placeholders with custom text
      return {
        ...feature,
        props: {
          ...feature.props,
          children: [
            {
              ...feature.props.children[0],
              props: {
                ...feature.props.children[0].props,
                onNotesChange,
              },
            },
            feature.props.children[1],
          ],
        },
      };
    });
    if (msg !== '') changeSharedMsg(msg);
    enhanceFeatures(featuresWithCallbacks);
  }, []);

  return (
    <ActionCard
      action={
        // TODO: use this when it can accept on a custom onPress function
        // so we can share content item info if we want to
        // https://github.com/ApollosProject/apollos-prototype/issues/1014
        // <ShareContentButtonConnected
        // message={sharedMsg}
        // icon={'play'}
        // itemId={contentId}
        // />
        <Touchable
          onPress={() => {
            console.log(contentItem.id); // left in the prop for the to do item above
            const message = sharedMsg.replace(
              /\w+Feature:\w+{{(.*?)}}\n\n/gs,
              (match, p1) => (p1 === '' ? p1 : `${p1}\n\n`)
            );
            share({ message });
            Analytics.trackEvent('Exported Sermon Notes', { title });
          }}
        >
          <ExportWrapper>
            <PaddedText>Export</PaddedText>
            <Icon name={'export'} size={24} />
          </ExportWrapper>
        </Touchable>
      }
    >
      <H3>Sermon Notes</H3>
      <H5>{title}</H5>
      <H5>
        {seriesConnection.series.title}
        {seriesConnection.itemIndex
          ? ` - Week ${seriesConnection.itemIndex}`
          : ''}
        {/*  - Date */}
      </H5>
      {speakers[0] != null
        ? speakers.map(
            (speaker) =>
              speaker !== '' ? <H5 key={speaker}>{speaker}</H5> : null
          )
        : null}

      <PaddedView />
      {enhancedFeatures}
      {[...copyrights].map((copyright) => (
        <LegalText key={copyright}>{copyright}</LegalText>
      ))}
    </ActionCard>
  );
};

SermonNotes.propTypes = {
  contentItem: PropTypes.shape({
    id: PropTypes.string,
    communicators: PropTypes.arrayOf(
      PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
      })
    ),
    guestCommunicators: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    seriesConnection: PropTypes.shape({
      series: PropTypes.shape({ title: PropTypes.string }),
      itemIndex: PropTypes.number,
    }),
  }),
  features: PropTypes.arrayOf(PropTypes.element),
};

SermonNotes.defaultProps = {
  features: [],
  contentItem: {},
};

export default SermonNotes;
