import gql from 'graphql-tag';
import prayerFragment from '../fragments/prayerFragment';

export default gql`
  mutation SavePrayer($nodeId: String!) {
    savePrayer(nodeId: $nodeId) {
      ...prayerFragment
    }
  }
  ${prayerFragment}
`;
