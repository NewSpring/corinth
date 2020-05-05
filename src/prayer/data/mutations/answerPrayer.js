import gql from 'graphql-tag';

export default gql`
  mutation AnswerPrayer($id: ID!, $answer: String!) {
    answerPrayer(id: $id, answer: $answer) {
      id
      text
      answer
    }
  }
`;
