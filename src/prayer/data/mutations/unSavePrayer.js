import gql from 'graphql-tag';

export default gql`
  mutation UnSavePrayer($nodeId: String!) {
    unSavePrayer(nodeId: $nodeId) {
      id
    }
  }
`;
