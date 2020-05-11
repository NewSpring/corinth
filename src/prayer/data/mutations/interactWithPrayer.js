import gql from 'graphql-tag';

export default gql`
  mutation InteractWithPrayer($id: ID!, $action: PrayerAction!) {
    interactWithPrayer(id: $id, action: $action) {
      id
      text
      answer
    }
  }
`;
