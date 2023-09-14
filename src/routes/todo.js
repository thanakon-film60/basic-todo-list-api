import express from 'express';
import * as todoController from '../controllers/todo.js';

const router = express.Router();

router
  .route('/')
  .get(todoController.getAllTodos)
  .post(todoController.createTodo);

router
  .route('/:id')
  .get(todoController.getTodoById)
  .put(todoController.updateTodo)
  .delete(todoController.removeTodo);

export default router;
