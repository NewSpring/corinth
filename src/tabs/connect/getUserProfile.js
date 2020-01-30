import gql from 'graphql-tag';
import CampusParts from '../../user-settings/Locations/campusFragment';

export default gql`
  query CurrentUserProfile {
    currentUser {
      id
      profile {
        id
        firstName
        lastName
        campus {
          ...CampusParts
        }
        email
        nickName
        gender
        birthDate
        photo {
          uri
        }
        isGroupLeader
      }
    }
  }
  ${CampusParts}
`;
