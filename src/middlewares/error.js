import chalk from 'chalk';

export default (err, req, res, next) => {
  console.log(chalk.redBright('----------------------------------------'));
  console.log(err);
  console.log(chalk.redBright('----------------------------------------'));

  let statusCode;

  if ((err.name = 'ValidationError')) {
    statusCode = 400;
  }

  res.status(statusCode ?? 500).json({ message: err.message });
};
