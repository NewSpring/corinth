import gql from 'graphql-tag';

export default gql`
  mutation EditAnswer($id: ID!, $answer: String) {
    editAnswer(id: $id, answer: $answer) {
      id
      text
      answer
    }
  }
`;
