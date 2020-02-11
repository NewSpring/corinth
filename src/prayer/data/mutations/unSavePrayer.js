import gql from 'graphql-tag';
import prayerFragment from '../fragments/prayerFragment';

export default gql`
  mutation UnSavePrayer($nodeId: String!) {
    unSavePrayer(nodeId: $nodeId) {
      ...prayerFragment
    }
  }
  ${prayerFragment}
`;
