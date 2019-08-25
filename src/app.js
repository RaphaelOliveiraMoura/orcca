const express = require('express');
const cors = require('cors');
const database = require('./database/sequelize');
const routes = require('../src/routes');
const { port } = require('./config/server');

const start = async onServerOpen => {
  const app = express();

  await database.authenticate();

  app.use(express.json());
  app.use(cors());
  app.use('/api', routes);

  app.listen(port, onServerOpen);
};

module.exports = {
  start
};
