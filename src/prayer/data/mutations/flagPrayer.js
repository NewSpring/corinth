import gql from 'graphql-tag';

export default gql`
  mutation FlagPrayer($parsedId: String!) {
    flagPrayer(nodeId: $parsedId) {
      id
    }
  }
`;
