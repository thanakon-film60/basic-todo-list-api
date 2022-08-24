import catchAsync from '../utils/catch-async';
import * as todoService from '../services/todo';
import { validateTodo } from '../utils/validator';
import { ValidationError } from '../utils/error';

export const getAllTodos = catchAsync(async (req, res, next) => {
  const { title, completed, sort } = req.query;

  let todos = await todoService.getAllTodos();

  if (title || completed) {
    todos = todos.filter(
      todo =>
        (!title || todo.title.toLowerCase().includes(title.toLowerCase())) &&
        (!completed ||
          (['true', '1'].includes(completed) && todo.completed) ||
          (['false', '0'].includes(completed) && !todo.completed))
    );
  }

  if (sort === 'title') {
    todos.sort((a, b) =>
      a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
    );
  } else if (sort === '-title') {
    todos.sort((a, b) =>
      a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1
    );
  }

  const total = todos.length;

  if (req.query.page || req.query.limit) {
    const page = req.query.page || 1;
    const limit = req.query.limit || 100;
    todos = todos.slice((page - 1) * limit, page * limit);
  }

  res.status(200).json({ total, todos });
});

export const getTodoById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const todo = await todoService.getTodoById(id);
  res.status(200).json({ todo });
});

export const createTodo = catchAsync(async (req, res, next) => {
  const { title, completed } = req.body;

  const error = validateTodo({ title, completed });
  if (error) throw new ValidationError(error);

  const todo = await todoService.createTodo({
    title: title.trim(),
    completed: !!completed
  });

  res.status(201).json({ todo });
});

export const updateTodo = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const error = validateTodo({ title, completed });
  if (error) throw new ValidationError(error);

  const todo = await todoService.updateTodo(
    {
      title: title.trim(),
      completed: !!completed
    },
    id
  );

  res.status(200).json({ todo });
});

export const removeTodo = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await todoService.removeTodo(id);
  res.status(204).json();
});
