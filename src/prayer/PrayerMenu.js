import React from 'react';
import { ScrollView } from 'react-native';
import {
  BackgroundView,
  Card,
  CardContent,
  PaddedView,
  styled,
  H3,
} from '@apollosproject/ui-kit';
import AddPrayerCard from './AddPrayer/AddPrayerCard';
import PrayerTabView from './PrayerTabView';

const FlexedScrollView = styled(({ theme }) => ({
  flex: 1,
  paddingTop: theme.sizing.baseUnit,
}))(ScrollView);

const PrayerMenu = ({ ...props }) => (
  <BackgroundView>
    <FlexedScrollView>
      <Card>
        <CardContent>
          <AddPrayerCard
            description={
              'Share a prayer request anonymously or publicly with your NewSpring Church family.'
            }
            {...props}
          />
        </CardContent>
      </Card>
      <PaddedView>
        <H3>Pray for Others</H3>
      </PaddedView>
      <PrayerTabView {...props} />
    </FlexedScrollView>
  </BackgroundView>
);

export default PrayerMenu;
