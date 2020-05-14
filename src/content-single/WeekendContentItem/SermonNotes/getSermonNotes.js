import gql from 'graphql-tag';

export default gql`
  query GetSermonNotes($contentID: ID!) {
    node(id: $contentID) {
      id
      ... on WeekendContentItem {
        communicators {
          nickName
          firstName
          lastName
        }
        guestCommunicators
        title
        seriesConnection {
          series {
            title
          }
        }
        sermonNotes {
          id
          __typename
          simpleText
          ... on NotesTextBlock {
            id
            isHeader
            hasBlanks
            hiddenText
          }
          ... on NotesScriptureBlock {
            id
            scripture {
              reference
              html
              version
              copyright
            }
          }
          allowsComment
          comment {
            id
            text
          }
        }
      }
    }
  }
`;
