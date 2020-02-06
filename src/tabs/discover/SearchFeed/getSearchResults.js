import gql from 'graphql-tag';
import ApollosConfig from '@apollosproject/config';

export default gql`
  query searchResults($searchText: String!) {
    search(query: $searchText) {
      edges {
        title
        summary
        coverImage {
          name
          sources {
            uri
          }
        }
        cursor
        node {
          ...contentCardFragment
        }
      }
    }
  }
  ${ApollosConfig.FRAGMENTS.CONTENT_CARD_FRAGMENT}
`;
