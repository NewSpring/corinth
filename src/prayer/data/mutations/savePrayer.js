import gql from 'graphql-tag';

export default gql`
  mutation SavePrayer($nodeId: String!) {
    savePrayer(nodeId: $nodeId) {
      __typename
      id
      isSaved
    }
  }
`;
