import React, { memo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ModalView,
  FlexedView,
  PaddedView,
  styled,
  Button,
  ButtonLink,
  BodyText,
  Icon,
  H1,
  withTheme,
  Paragraph,
} from '@apollosproject/ui-kit';

const FlexedSafeAreaView = styled(({ theme }) => ({
  flex: 1,
  paddingHorizontal: theme.sizing.baseUnit,
}))(SafeAreaView);

const MessageView = styled({
  flex: 4,
  justifyContent: 'center',
})(FlexedView);

const BrandIcon = withTheme(({ theme }) => ({
  name: 'brand-icon',
  size: theme.sizing.baseUnit * 4,
  fill: theme.colors.primary,
}))(Icon);

const Title = styled(({ theme }) => ({
  marginVertical: theme.sizing.baseUnit,
  color: theme.colors.primary,
}))(H1);

const Footer = styled({
  justifyContent: 'flex-end',
})(FlexedView);

const FooterAltOption = styled({
  alignSelf: 'center',
})(PaddedView);

const FooterText = styled(({ theme }) => ({
  color: theme.colors.tertiary,
}))(BodyText);

const WithYou = memo(({ ...props }) => (
  <ModalView {...props} onClose={() => props.navigation.popToTop()}>
    <FlexedSafeAreaView>
      <MessageView>
        <BrandIcon />
        <Title>Thank you for sharing</Title>
        <Paragraph>
          <BodyText>
            “This is the confidence we have in approaching God: that if we ask
            anything according to his will, he hears us” (1 John 5:14).
          </BodyText>
        </Paragraph>
        <Paragraph>
          <BodyText>We’re praying for you and believing with you.</BodyText>
        </Paragraph>
      </MessageView>
      <Footer>
        <Button
          title="Pray for others"
          onPress={() => props.navigation.navigate('PrayerList')}
        />
        <FooterAltOption>
          <ButtonLink onPress={() => props.navigation.pop()}>
            <FooterText>Add another prayer request</FooterText>
          </ButtonLink>
        </FooterAltOption>
      </Footer>
    </FlexedSafeAreaView>
  </ModalView>
));

WithYou.displayName = 'WithYou';

WithYou.navigationOptions = {
  header: null,
};

export default WithYou;
