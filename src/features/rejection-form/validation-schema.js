import { object as yupObject, string as yupString } from 'yup';

const rejectionFormValidationSchema = yupObject().shape({
  question: yupString().required('Please fill in a question.'),
  askee: yupString().required('Please fill in an askee.'),
});

export { rejectionFormValidationSchema };
