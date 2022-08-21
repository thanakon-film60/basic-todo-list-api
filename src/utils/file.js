import fs from 'fs/promises';
import path from 'path';

const readFile = async fileName => {
  const data = await fs.readFile(
    path.resolve(process.env.DB + fileName),
    'utf-8'
  );
  return JSON.parse(data);
};

const writeFile = (fileName, data) =>
  fs.writeFile(
    path.resolve(process.env.DB + fileName),
    JSON.stringify(data),
    'utf-8'
  );

export const readTodo = () => readFile('todo.json');
export const writeTodo = data => writeFile('todo.json', data);
