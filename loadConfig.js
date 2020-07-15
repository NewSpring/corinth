import ApollosConfig from '@apollosproject/config';
import FRAGMENTS from '@apollosproject/ui-fragments';
import gql from 'graphql-tag';

ApollosConfig.loadJs({
  FRAGMENTS: {
    ...FRAGMENTS,
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
