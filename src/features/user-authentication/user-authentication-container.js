import { withFormik } from 'formik';
import { transformProps } from 'hocs/transform-props';
import { Magic } from 'magic-sdk';
import { compose } from 'ramda';
import { connect } from 'react-redux';

import { UserAuthentication as UserAuthenticationComponent } from './user-authentication-component';
import { login } from './user-authentication-saga';
import { loginValidationSchema } from './validation-schema';

const apiKey = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY || '';

const formikProps = {
  validateOnMount: true,
  mapPropsToValues: () => ({
    email: '',
  }),
  enableReinitialize: true,
  validationSchema: loginValidationSchema,
  handleSubmit: async ({ email }, { props: { login } }) => {
    const magic = new Magic(apiKey);
    const didToken = await magic.auth.loginWithMagicLink({ email });
    login({ didToken });
  },
};

const mapFormikBagToProps = ({
  values: { email },
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
  email,
  emailError: touched.email ? errors.email : '',
  onChangeEmail: e => setFieldValue('email', e.target.value),
  onFocusEmail: () => setFieldTouched('email', true),
  onBlurEmail: () => setFieldTouched('email', true),
  resetForm,
  onSubmit: handleSubmit,
  ...rest,
});

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  login,
};
export const UserAuthentication = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormik(formikProps),
  transformProps(mapFormikBagToProps),
)(UserAuthenticationComponent);
