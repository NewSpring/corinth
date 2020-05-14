import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View, KeyboardAvoidingView, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Formik } from 'formik';
import {
  ModalView,
  TextInput,
  Button,
  styled,
  FlexedView,
  PaddedView,
  H4,
} from '@apollosproject/ui-kit';
import PrayerHeader from '../PrayerHeader';

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
  padding: theme.sizing.baseUnit,
}))(FlexedView);

const InputPaddedView = styled(({ theme }) => ({
  flex: 4,
  paddingHorizontal: theme.sizing.baseUnit,
}))(View);

const AnswerPrayerForm = memo(
  ({
    prayer,
    onSubmit,
    avatarSource,
    title,
    btnLabel,
    loading,
    action,
    ...props
  }) => (
    <Formik
      initialValues={{ id: prayer.id, answer: prayer.answer || '' }}
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
                  avatarSource={avatarSource}
                  avatarSize={'medium'}
                  title={title}
                />
              </HeaderView>
              <PaddedView>
                <H4>Your Prayer:</H4>
                <Text>{prayer.text}</Text>
              </PaddedView>
              <InputPaddedView>
                <StyledTextInput
                  editable
                  multiline
                  returnKeyType="default"
                  placeholder="How did God answer your prayer?"
                  onChangeText={handleChange('answer')}
                  onBlur={handleBlur('answer')}
                  value={values.answer || ''}
                  underline={false}
                />
              </InputPaddedView>
              <BottomView>
                <Button
                  title={btnLabel}
                  onPress={handleSubmit}
                  disabled={values.answer.length === 0}
                />
                {!loading && <View>{action}</View>}
              </BottomView>
            </ShrinkingView>
          </FlexedSafeAreaView>
        </ModalView>
      )}
    </Formik>
  )
);

AnswerPrayerForm.propTypes = {
  prayer: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    answer: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
  avatarSource: PropTypes.shape({
    uri: PropTypes.string,
  }),
  title: PropTypes.string,
  btnLabel: PropTypes.string,
  loading: PropTypes.bool,
  action: PropTypes.element,
};

AnswerPrayerForm.defaultProps = {
  title: 'Answer Prayer',
  btnLabel: 'Save answer',
  action: null,
};

AnswerPrayerForm.displayName = 'AnswerPrayerForm';

export default AnswerPrayerForm;
