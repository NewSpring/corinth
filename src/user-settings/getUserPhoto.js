import gql from 'graphql-tag';
import CampusParts from 'newspringchurchapp/src/user-settings/Locations/campusFragment';

export default gql`
  query getCurrentUserProfile {
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
  ${CampusParts}
`;
