import gql from 'graphql-tag';
import prayerFragment from '../fragments/prayerFragment';

export default gql`
  query Prayer($id: ID!) {
    prayer(id: $id) {
      ...prayerFragment
    }
  }
  ${prayerFragment}
`;
