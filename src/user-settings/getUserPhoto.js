import gql from 'graphql-tag';

export default gql`
  query CurrentUserPhoto {
    currentUser {
      id
      profile {
        id
        photo {
          uri
        }
      }
    }
  }
`;
