const express = require('express');
const app = express();

// middleware
const morgan = require('morgan');
const checkConnection = require('./middleware/check-connection');

app.use(morgan('dev')); // request logging
app.use(express.json()); // body parser
app.use(express.static('public')); // static file server (public)

// test route
app.get('/hello', (req, res) => {
  res.send('hello express');
});

app.use(checkConnection); // returns error in no db connection

// API ROUTES
const animals = require('./routes/animals');
app.use('api/animals', animals);

// NOT FOUND
const api404 = require('./middleware/api-404');
app.use('/api', api404); // use express default for non-api routes

// ERRORS
const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);

module.exports = app;