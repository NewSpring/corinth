import gql from 'graphql-tag';

export default gql`
  query GroupPrayers {
    groupPrayers {
      id
      isAnonymous
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
