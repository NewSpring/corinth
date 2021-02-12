import ApollosConfig from '@apollosproject/config';
import FRAGMENTS from '@apollosproject/ui-fragments';
import gql from 'graphql-tag';

// import fragmentTypes from './src/client/fragmentTypes.json';
// Create a map all the interfaces each type implements.
// If UniversalContentItem implements Node, Card, and ContentNode,
// our typemap would be { UniversalContentItem: ['Node', 'Card', 'ContentNode'] }
// const TYPEMAP = fragmentTypes.__schema.types.reduce((acc, curr) => {
//   const { name } = curr;
//   const types = Object.fromEntries(
//     curr.possibleTypes.map((type) => [type.name, name])
//   );
//   Object.keys(types).forEach((key) => {
//     acc[key] = acc[key] ? [...acc[key], types[key]] : [types[key]];
//   });
//   return acc;
// }, {});

// Hardcode the typemap for now.
// This changes what connected components are displayed as loading states on content items
const TYPEMAP = {
  ContentSeriesContentItem: ['ContentParentNode'],
  DevotionalContentItem: ['ContentChildNode'],
};

const liteFeatures = `
      fragment LiteFeaturesFragment on Feature {
        id
        __typename
        ... on VerticalCardListFeature {
          isFeatured
          title
          subtitle
        }
        ... on HorizontalCardListFeature {
          title
          subtitle
        }
        ... on ActionListFeature {
          title
          subtitle
        }
        ... on HeroListFeature {
          title
          subtitle
        }
        #... on PrayerListFeature {
        #  title
        #  subtitle
        #  isCard
        #}
        ... on TextFeature {
          body
          sharing {
            message
          }
        }
        ... on ScriptureFeature {
          # The whole fragment is currently included b/c these nodes don't fetch their own content.
          sharing {
            message
          }
          scriptures {
            id
            html
            reference
            copyright
            version
          }
        }
        ... on WebviewFeature {
          # The whole fragment is currently included b/c these nodes don't fetch their own content.
          linkText
          title
          url
        }
        ... on CommentListFeature {
          id
        }
      }
    `;

ApollosConfig.loadJs({
  TYPEMAP,
  FRAGMENTS: {
    ...FRAGMENTS,
    // Same as core, but not PrayerListFeature.
    CONTENT_UP_NEXT_FRAGMENT: gql`
      fragment ContentUpNextFragment on ContentItem {
        id
        ... on ProgressNode {
          upNext {
            id
          }
        }
        ... on ContentParentNode {
          childContentItemsConnection {
            edges {
              node {
                id
              }
            }
          }
        }
        ... on ContentSeriesContentItem {
          id
          upNext {
            id
          }
          childContentItemsConnection {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    `,
    RELATED_NODE_FRAGMENT: gql`
      fragment RelatedFeatureNodeFragment on Node {
        id
        ... on Url {
          url
        }
        ... on ContentChannel {
          name
        }
        ... on ContentItem {
          theme {
            type
            colors {
              primary
              secondary
              screen
              paper
            }
          }
        }
      }
    `,
    FEED_FEATURES_FRAGMENT: liteFeatures,
    LITE_FEATURES_FRAGMENT: liteFeatures,
    CONTENT_CARD_FRAGMENT: gql`
      fragment contentCardFragment on ContentItem {
        id
        __typename
        coverImage {
          sources {
            uri
          }
        }
        theme {
          type
          colors {
            primary
            secondary
            screen
            paper
          }
        }
        title
        hyphenatedTitle: title(hyphenated: true)
        summary
        ... on MediaContentItem {
          videos {
            sources {
              uri
            }
          }
          parentChannel {
            id
            name
          }
        }
        ... on WeekendContentItem {
          videos {
            sources {
              uri
            }
            thumbnail {
              sources {
                uri
              }
            }
          }
          parentChannel {
            id
            name
          }
        }
        ... on DevotionalContentItem {
          parentChannel {
            id
            name
          }
        }
        ... on UniversalContentItem {
          parentChannel {
            id
            name
          }
        }
        ... on ContentSeriesContentItem {
          parentChannel {
            id
            name
          }
        }
      }
    `,
  },
});
