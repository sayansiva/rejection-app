import { createQuestion } from 'features/question/questions-saga';
import { withFormik } from 'formik';
import { transformProps } from 'hocs/transform-props';
import { compose } from 'ramda';
import { connect } from 'react-redux';

import { RejectionForm as RejectionFormComponent } from './rejection-form-component';
import { rejectionFormValidationSchema } from './validation-schema';

const formikProps = {
  validateOnMount: true,
  mapPropsToValues: () => ({
    question: '',
    askee: '',
  }),
  enableReinitialize: true,
  validationSchema: rejectionFormValidationSchema,
  handleSubmit: (
    { question, askee },
    { props: { createQuestion }, resetForm },
  ) => {
    //TODO: refactor to a curry or something
    const status = document.activeElement.dataset.flag;
    createQuestion({ question, askee, status });
    resetForm();
  },
};

const mapFormikBagToProps = ({
  values: { question, askee },
  isValid,
  errors,
  resetForm,
  touched,
  setFieldValue,
  setFieldTouched,
  handleSubmit,
  ...rest
}) => ({
  disabled: !isValid,
  question,
  askee,
  questionError: touched.question ? errors.question : '',
  askeeError: touched.askee ? errors.askee : '',
  onChangeQuestion: e => setFieldValue('question', e.target.value),
  onChangeAskee: e => setFieldValue('askee', e.target.value),
  onFocusQuestion: () => setFieldTouched('question', true),
  onFocusAskee: () => setFieldTouched('askee', true),
  onBlurQuestion: () => setFieldTouched('question', true),
  onBlurAskee: () => setFieldTouched('askee', true),
  resetForm,
  onSubmit: handleSubmit,
  ...rest,
});

const mapDispatchToProps = {
  createQuestion,
};
export const RejectionForm = compose(
  connect(undefined, mapDispatchToProps),
  withFormik(formikProps),
  transformProps(mapFormikBagToProps),
)(RejectionFormComponent);
