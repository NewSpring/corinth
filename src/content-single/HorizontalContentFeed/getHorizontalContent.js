import gql from 'graphql-tag';
import ApollosConfig from '@apollosproject/config';

export default gql`
  query getHorizontalContent($itemId: ID!, $cursor: String) {
    node(id: $itemId) {
      ... on ContentItem {
        id
        childContentItemsConnection(after: $cursor) {
          edges {
            cursor
            node {
              ...contentCardFragment
            }
          }
        }
        siblingContentItemsConnection(after: $cursor) {
          edges {
            cursor
            node {
              ...contentCardFragment
            }
          }
        }
      }
    }
  }
  ${ApollosConfig.FRAGMENTS.CONTENT_CARD_FRAGMENT}
`;
