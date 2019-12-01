import gql from 'graphql-tag';

export default gql`
  query PrayerMenuCategories {
    prayerMenuCategories {
      id
      key
      title
      subtitle
      imageURL
    }
  }
`;
