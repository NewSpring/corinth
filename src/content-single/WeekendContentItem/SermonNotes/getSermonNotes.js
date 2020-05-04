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
          allowsCustomNote
          simpleText
          ... on TextNote {
            id
            isHeader
            hasBlanks
            hiddenText
          }
          ... on ScriptureNote {
            id
            scripture {
              reference
              html
              version
              copyright
            }
          }
        }
      }
    }
  }
`;
