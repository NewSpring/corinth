import gql from 'graphql-tag';
import ApollosConfig from '@apollosproject/config';

export default gql`
  query CurrentUserProfile {
    currentUser {
      id
      profile {
        isInReadMyBible
        isGroupLeader
        ...UserProfileParts
        campus {
          ...CampusParts
        }
      }
    }
  }
  ${ApollosConfig.FRAGMENTS.CAMPUS_PARTS_FRAGMENT}
  ${ApollosConfig.FRAGMENTS.USER_PROFILE_PARTS_FRAGMENT}
`;
