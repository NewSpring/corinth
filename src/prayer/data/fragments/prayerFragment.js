import gql from 'graphql-tag';

export default gql`
  fragment prayerFragment on Prayer {
    __typename
    id
    isAnonymous
    isSaved
    text
    answer
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
`;
