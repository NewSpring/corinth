import gql from 'graphql-tag';

import { BASE_CARD_FRAGMENT } from '../../ui/ContentCardConnected';

export default gql`
  query campaigns {
    campaigns {
      edges {
        node {
          childContentItemsConnection {
            edges {
              node {
                ...baseCardFragment
              }
            }
          }
        }
      }
    }
  }
  ${BASE_CARD_FRAGMENT}
`;
