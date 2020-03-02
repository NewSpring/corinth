import gql from 'graphql-tag';

export default gql`
  query PrayerCount($type: PrayerType) {
    prayerFeed(type: $type) {
      totalCount
    }
  }
`;
