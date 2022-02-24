import React, { memo } from 'react';
import { Query } from '@apollo/client/react/components';
import { ActivityIndicator } from '@apollosproject/ui-kit';
import GET_PRAYER_MENU_CATEGORIES from './data/queries/getPrayerMenuCategories';
import PrayerMenu from './PrayerMenu';

const PrayerMenuConnected = memo(({ ...props }) => (
  <Query query={GET_PRAYER_MENU_CATEGORIES} fetchPolicy="cache-and-network">
    {({ loading, data: { prayerMenuCategories = [] } = {} }) => {
      if (loading) return <ActivityIndicator />;
      const categories = prayerMenuCategories.map((category) => ({
        id: category.id,
        description: category.subtitle,
        image: category.imageURL,
        title: category.title,
        key: category.key,
      }));
      return <PrayerMenu categories={categories} {...props} />;
    }}
  </Query>
));

PrayerMenuConnected.displayName = 'PrayerMenuConnected';

export default PrayerMenuConnected;
