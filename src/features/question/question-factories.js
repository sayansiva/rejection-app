const createQuestion = ({
  question = '',
  askee = '',
  status = 'accepted',
} = {}) => ({
  question,
  askee,
  status,
});

export { createQuestion };
