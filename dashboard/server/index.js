const path = require('path');
const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/index');

require('dotenv-safe').config();

const port = process.env.PORT || 3001;
const app = express();
app.db = require('./models');

const isProduction = process.env.NODE_ENV === 'production';

app.use(morgan('dev'));
app.use('/api', routes);

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, `../${isProduction ? 'build' : 'public'}/index.html`)));


app.db.sequelize
  .authenticate()
  .then(() => {
    app.listen(port, () => {
      console.log(`>>Listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
