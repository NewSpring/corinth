import gql from 'graphql-tag';

export default gql`
  query PrayerFeed($type: PrayerType, $first: Int) {
    prayerFeed(type: $type, first: $first) {
      edges {
        node {
          __typename
          id
          ... on Prayer {
            isAnonymous
            isSaved
            text
            flagCount
            campus {
              id
              name
            }
            startTime
            requestor {
              photo {
                uri
              }
              firstName
              nickName
              lastName
            }
          }
        }
      }
    }
  }
`;
