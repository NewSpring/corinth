import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import {
  ModalView,
  Switch,
  TextInput,
  Button,
  styled,
  FlexedView,
} from '@apollosproject/ui-kit';
import PrayerHeader from '../../PrayerHeader';

const FlexedSafeAreaView = styled({
  flex: 1,
})(SafeAreaView);

const ShrinkingView = styled(({ theme }) => ({
  flex: 1,
  paddingTop: theme.sizing.baseUnit,
}))(KeyboardAvoidingView);

const HeaderView = styled(({ theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit,
}))(View);

const StyledTextInput = styled(({ theme }) => ({
  height: '100%',
  borderRadius: theme.sizing.baseUnit / 2,
  borderWidth: 0.5,
  borderColor: theme.colors.shadows.default,
  paddingHorizontal: theme.sizing.baseUnit,
  paddingTop: theme.sizing.baseUnit,
  paddingBottom: theme.sizing.baseUnit,
  textAlignVertical: 'top',
}))(TextInput);

const BottomView = styled(({ theme }) => ({
  // justifyContent: 'flex-end',
  padding: theme.sizing.baseUnit,
}))(FlexedView);

const InputPaddedView = styled(({ theme }) => ({
  flex: 4,
  paddingHorizontal: theme.sizing.baseUnit,
}))(View);

const SwitchContainer = styled(({ theme }) => ({
  flex: 1,
  paddingHorizontal: theme.sizing.baseUnit,
  width: '70%',
}))(View);

const AddPrayerForm = memo(
  ({ onSubmit, avatarSource, title, btnLabel, loading, ...props }) => (
    <Formik
      initialValues={{ prayer: '', anonymous: false }}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        // this is necessary so the modal can transition completely
        setTimeout(() => resetForm({}), 1000);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <ModalView {...props}>
          <FlexedSafeAreaView forceInset={{ top: 'always' }}>
            <ShrinkingView behavior={'padding'}>
              <HeaderView>
                <PrayerHeader
                  loading={loading}
                  avatarSource={values.anonymous ? null : avatarSource}
                  avatarSize={'medium'}
                  title={title}
                />
              </HeaderView>
              <InputPaddedView>
                <StyledTextInput
                  editable
                  multiline
                  returnKeyType="default"
                  placeholder="Start typing your prayer..."
                  onChangeText={handleChange('prayer')}
                  onBlur={handleBlur('prayer')}
                  value={values.prayer || ''}
                  underline={false}
                />
              </InputPaddedView>
              <SwitchContainer>
                <Switch
                  value={values.anonymous}
                  onValueChange={handleChange('anonymous')}
                  label={'Share Anonymously'}
                />
              </SwitchContainer>
              <BottomView>
                {/* TODO need to use Formik.resetForm() here somehow
                    when you come back to this screen, the form still has
                    old info in it */}
                <Button title={btnLabel} onPress={handleSubmit} />
              </BottomView>
            </ShrinkingView>
          </FlexedSafeAreaView>
        </ModalView>
      )}
    </Formik>
  )
);

AddPrayerForm.propTypes = {
  onSubmit: PropTypes.func,
  avatarSource: PropTypes.shape({
    uri: PropTypes.string,
  }),
  title: PropTypes.string,
  btnLabel: PropTypes.string,
  loading: PropTypes.bool,
};

AddPrayerForm.defaultProps = {
  title: 'Ask for prayer',
  btnLabel: 'Send prayer',
};

AddPrayerForm.displayName = 'AddPrayerForm';

export default AddPrayerForm;
