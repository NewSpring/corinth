import gql from 'graphql-tag';

export default gql`
  query PrayerFeed($type: PrayerType, $first: Int, $after: String) {
    prayerFeed(type: $type, first: $first, after: $after) {
      pageInfo {
        endCursor
      }
      edges {
        cursor
        node {
          __typename
          id
          isAnonymous
          isSaved
          text
          flagCount
          startTime
          requestor {
            photo {
              uri
            }
            firstName
            nickName
            lastName
            campus {
              id
              name
            }
          }
        }
      }
    }
  }
`;
