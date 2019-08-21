const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const routes = require('./routes');

require('dotenv-safe').config({ allowEmptyValues: true });

const port = process.env.APP_PORT || 3001;
const app = express();

app.db = require('./models');

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // if ('OPTIONS' === req.method) {
    //   res.send(200);
    // }
    // else {
    //   next();
    // }

    next();
});

app.options('*', cors());

app.use('/api', routes);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});

app.db.sequelize
  .authenticate()
  .then(() => app.listen(port, () => console.log(`Listening on port ${port}`)))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = app;
