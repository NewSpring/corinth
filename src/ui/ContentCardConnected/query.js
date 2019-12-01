import gql from 'graphql-tag';

export const COVER_IMAGE_FRAGMENT = gql`
  fragment coverImageFragment on ContentItem {
    coverImage {
      sources {
        uri
      }
    }
  }
`;

export const THEME_FRAGMENT = gql`
  fragment themeFragment on ContentItem {
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
`;

export const BASE_CARD_FRAGMENT = gql`
  fragment baseCardFragment on ContentItem {
    id
    __typename
    ...coverImageFragment
    ...themeFragment
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
      seriesConnection {
        series {
          title
        }
        itemCount
        itemIndex
      }
    }
    ... on DevotionalContentItem {
      parentChannel {
        id
        name
      }
      seriesConnection {
        series {
          title
        }
        itemCount
        itemIndex
      }
    }
  }
  ${COVER_IMAGE_FRAGMENT}
  ${THEME_FRAGMENT}
`;

const GET_CONTENT_CARD = gql`
  query getContentCard($contentId: ID!) {
    node(id: $contentId) {
      id
      __typename
      ...baseCardFragment
    }
  }
  ${BASE_CARD_FRAGMENT}
`;

export default GET_CONTENT_CARD;
