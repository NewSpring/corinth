import gql from 'graphql-tag';

export default gql`
  query PrayerSaveState($nodeId: ID!) {
    node(id: $nodeId) {
      __typename
      id
      ... on Prayer {
        isSaved
      }
    }
  }
`;
