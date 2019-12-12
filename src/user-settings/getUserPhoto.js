import gql from 'graphql-tag';
import CampusParts from './Locations/campusFragment';

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
