import gql from 'graphql-tag';
import { TEXT_FEATURE_FRAGMENT } from './TextFeature';
import { SCRIPTURE_FEATURE_FRAGMENT } from './ScriptureFeature';
import { HEADER_FEATURE_FRAGMENT } from './HeaderFeature';
import { NOTE_FEATURE_FRAGMENT } from './NoteFeature';

const FEATURES_FRAGMENT = `
  fragment FeaturesFragment on Feature {
    id
    ...TextFeatureFragment
    ...ScriptureFeatureFragment
    ...HeaderFeatureFragment
    ...NoteFeatureFragment
  }
  ${TEXT_FEATURE_FRAGMENT}
  ${SCRIPTURE_FEATURE_FRAGMENT}
  ${HEADER_FEATURE_FRAGMENT}
  ${NOTE_FEATURE_FRAGMENT}
`;

const SERMON_NOTES_FRAGMENT = gql`
  fragment SermonNotesFragment on WeekendContentItem {
    communicators {
      nickName
      firstName
      lastName
    }
    guestCommunicators
    title
    seriesConnection {
      series {
        title
      }
      itemIndex
      itemCount
    }
  }
`;

export default gql`
  query contentItemFeatures($contentId: ID!) {
    node(id: $contentId) {
      id
      ... on ContentSeriesContentItem {
        features {
          ...FeaturesFragment
        }
      }
      ... on WeekendContentItem {
        features {
          ...FeaturesFragment
        }
        ...SermonNotesFragment
      }
    }
  }
  ${FEATURES_FRAGMENT}
  ${SERMON_NOTES_FRAGMENT}
`;
