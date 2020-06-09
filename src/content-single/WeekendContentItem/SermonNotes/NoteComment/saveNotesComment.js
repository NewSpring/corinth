import gql from 'graphql-tag';

export default gql`
  mutation SaveNotesComment($contentID: ID!, $noteID: ID!, $text: String!) {
    saveNotesComment(contentID: $contentID, blockID: $noteID, text: $text) {
      id
      text
    }
  }
`;
