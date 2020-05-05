import gql from 'graphql-tag';

export default gql`
  mutation RemoveAnswer($id: ID!) {
    removeAnswer(id: $id) {
      id
      text
      answer
    }
  }
`;
