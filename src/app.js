import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import chalk from 'chalk';

import todoRoute from './routes/todo';
import notFoundMiddleware from './middlewares/not-found';
import errorMiddleware from './middlewares/error';

const app = express();

if (process.env.MODE === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/todos', todoRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8080;
app.listen(port, () =>
  console.log(chalk.blueBright(`server running on port ${port}`))
);
