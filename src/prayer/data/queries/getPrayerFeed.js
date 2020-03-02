import gql from 'graphql-tag';
import prayerFragment from '../fragments/prayerFragment';

export default gql`
  query PrayerFeed($type: PrayerType, $first: Int, $after: String) {
    prayerFeed(type: $type, first: $first, after: $after) {
      pageInfo {
        endCursor
      }
      edges {
        cursor
        node {
          ...prayerFragment
        }
      }
    }
  }
  ${prayerFragment}
`;
