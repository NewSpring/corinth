import ApollosConfig from '@apollosproject/config';
import FRAGMENTS from '@apollosproject/ui-fragments';
import gql from 'graphql-tag';

const liteFeatures = `
      fragment FeedFeaturesFragment on Feature {
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
        # ... on PrayerListFeature {
        #   title
        #   subtitle
        #   isCard
        # }
        ... on TextFeature {
          body
          ...TextFeatureFragment
        }
        ... on ScriptureFeature {
          scriptures {
            reference
          }
          ...ScriptureFeatureFragment
        }
        ... on WebviewFeature {
          ...WebviewFeatureFragment
        }
      }
    `;

ApollosConfig.loadJs({
  FRAGMENTS: {
    ...FRAGMENTS,
    // Same as core, but not PrayerListFeature.
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
