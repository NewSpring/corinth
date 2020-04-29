import gql from 'graphql-tag';

export default gql`
  mutation AnswerPrayer($id: ID!, $answer: String!) {
    addPrayer(id: $id, answer: $answer) {
      id
      text
      answer
    }
  }
`;
