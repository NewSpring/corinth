import gql from 'graphql-tag';

export default gql`
  mutation EditPrayer($id: ID!, $answer: String) {
    editPrayer(id: $id, answer: $answer) {
      id
      text
      answer
    }
  }
`;
