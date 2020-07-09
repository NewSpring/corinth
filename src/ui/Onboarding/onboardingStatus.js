import AsyncStorage from '@react-native-community/async-storage';
import gql from 'graphql-tag';
import { NavigationService } from '@apollosproject/ui-kit';

export const WITH_USER_ID = gql`
  query currentUserId {
    currentUser {
      id
    }
  }
`;

export const onboardingComplete = async ({ userId }) => {
  try {
    const jsonValue = JSON.stringify(true);
    await AsyncStorage.setItem(`@onboarding-status/${userId}`, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const checkOnboardingStatusAndNavigate = async ({
  client,
  navigation,
}) => {
  const { data } = await client.query({ query: WITH_USER_ID });
  let hasOnboarded = false;
  if (data.currentUser.id) {
    try {
      const jsonValue = await AsyncStorage.getItem(
        `@onboarding-status/${data.currentUser.id}`
      );
      hasOnboarded = jsonValue != null ? JSON.parse(jsonValue) : false;
    } catch (e) {
      // error reading value
    }
  }
  if (hasOnboarded) {
    navigation.dispatch(
      NavigationService.resetAction({
        navigatorName: 'Tabs',
        routeName: 'Home',
      })
    );
  } else {
    navigation.navigate('Onboarding');
  }
};
