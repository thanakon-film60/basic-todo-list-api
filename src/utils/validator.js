import validator from 'validator';

export const validateTodo = ({ title, completed }) => {
  if (!title || validator.isEmpty(title + '')) return 'title is required';
  if (typeof title !== 'string') return 'title must be a string';

  if (!validator.isBoolean(completed + '')) return 'invalid completed value';
  return false;
};
