import gql from 'graphql-tag';

export default gql`
  query getFeedFeatures {
    userFeedFeatures {
      ... on ActionListFeature {
        id
        title
        subtitle
        actions {
          id
          title
          action
          image {
            sources {
              uri
            }
          }
          relatedNode {
            id
          }
        }
      }
    }
  }
`;
