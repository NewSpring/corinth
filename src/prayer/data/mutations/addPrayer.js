import gql from 'graphql-tag';

export default gql`
  mutation AddPrayer($text: String!, $isAnonymous: Boolean) {
    addPrayer(text: $text, isAnonymous: $isAnonymous) {
      id
      text
      startTime
    }
  }
`;
