import gql from 'graphql-tag';

export default gql`
  query Prayers {
    prayers {
      id
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
`;
