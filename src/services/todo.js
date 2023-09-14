import { v4 as uuidv4 } from "uuid";

import { readTodo, writeTodo } from "../utils/file.js";

export const getAllTodos = async () => {
  const todos = await readTodo();
  return todos;
};

export const getTodoById = async id => {
  const todos = await readTodo();
  const todo = todos.find(todo => todo.id === id);
  return todo || null;
};

export const createTodo = async ({ title, completed }) => {
  const todos = await readTodo();
  const todo = { id: uuidv4(), title, completed };
  todos.unshift(todo);
  await writeTodo(todos);
  return todo;
};

export const updateTodo = async ({ title, completed }, id) => {
  const todos = await readTodo();
  const idx = todos.findIndex(todo => todo.id === id);
  if (idx !== -1) {
    todos[idx] = { ...todos[idx], title, completed };
    await writeTodo(todos);
    return todos[idx];
  }
  return 0;
};

export const removeTodo = async id => {
  const todos = await readTodo();
  const idx = todos.findIndex(todo => todo.id === id);
  if (idx !== -1) {
    todos.splice(idx, 1);
    await writeTodo(todos);
    return 1;
  }
  return 0;
};
