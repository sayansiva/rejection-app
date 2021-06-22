import { withFormik } from 'formik';
import { transformProps } from 'hocs/transform-props';
import { Magic } from 'magic-sdk';
import { compose } from 'ramda';
import { connect } from 'react-redux';

import { UserAuthentication as UserAuthenticationComponent } from './user-authentication-component';
import { getIsLoggingIn, login } from './user-authentication-reducer';
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
    const magic = new Magic(apiKey, { testMode: Boolean(window.Cypress) });
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
  isLoggingIn,
  ...rest
}) => ({
  disabled: !isValid | isLoggingIn,
  email,
  emailError: touched.email ? errors.email : '',
  onChangeEmail: e => setFieldValue('email', e.target.value),
  onFocusEmail: () => setFieldTouched('email', true),
  onBlurEmail: () => setFieldTouched('email', true),
  resetForm,
  onSubmit: handleSubmit,
  isLoggingIn,
  ...rest,
});

const mapStateToProps = state => ({
  isLoggingIn: getIsLoggingIn(state),
});

const mapDispatchToProps = {
  login,
};

export const UserAuthentication = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormik(formikProps),
  transformProps(mapFormikBagToProps),
)(UserAuthenticationComponent);
