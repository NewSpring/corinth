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
          itemIndex
          itemCount
        }
        sermonNotes {
          id
          __typename
          ... on TextNote {
            id
            isHeader
            text
          }
          ... on ScriptureNote {
            id
            scripture {
              reference
            }
          }
        }
      }
    }
  }
`;
