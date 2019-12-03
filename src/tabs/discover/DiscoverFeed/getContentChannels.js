import gql from 'graphql-tag';

import { BASE_CARD_FRAGMENT } from '../../../ui/ContentCardConnected';

export default gql`
  query getContentChannels {
    contentChannels {
      id
      name
      childContentItemsConnection(first: 3) {
        edges {
          node {
            id
            ...baseCardFragment
          }
        }
      }
    }
  }
  ${BASE_CARD_FRAGMENT}
`;
