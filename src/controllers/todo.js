import catchAsync from '../utils/catch-async';
import * as todoService from '../services/todo';
import { validateTodo } from '../utils/validator';
import { ValidationError } from '../utils/error';

export const getAllTodos = catchAsync(async (req, res, next) => {
  const todos = await todoService.getAllTodos();
  res.status(200).json({ todos });
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
