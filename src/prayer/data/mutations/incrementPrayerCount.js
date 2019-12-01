import gql from 'graphql-tag';

export default gql`
  mutation IncrementPrayerCount($parsedId: String!) {
    incrementPrayerCount(nodeId: $parsedId) {
      id
    }
  }
`;
