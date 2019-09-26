// error handling middleware must have all 4 paramas
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  let statusCode = 500;
  let error = 'Internal Server Error';

  // Mogoose Validation Error?
  if(err.name === 'ValidationError' || err.name === 'CastError') {
    statusCode = 400;
    error = err.message;
  }

  // One of our errors?
  else if(err.statusCode) {
    // Object with statusCode property for http statusCode
    // And an error property for message to display
    statusCode = err.statusCode;
    error = err.error;
  }
  else {
    // Log unexpected error
    console.log('UNEXPECTED ERROR', err);
  }

  // To see all errors in log
  console.log('ERROR', statusCode, error);

  res.status(statusCode).send({ error });
};