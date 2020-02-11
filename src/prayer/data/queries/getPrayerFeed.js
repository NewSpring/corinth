import gql from 'graphql-tag';

export default gql`
  query PrayerFeed($type: PrayerType, $first: Int, $after: String) {
    prayerFeed(type: $type, first: $first, after: $after) {
      edges {
        node {
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
