import { object as yupObject, string as yupString } from 'yup';

const loginValidationSchema = yupObject().shape({
  email: yupString()
    .email('Invalid E-Mail')
    .required('Please fill in an E-Mail.'),
});

export { loginValidationSchema };
