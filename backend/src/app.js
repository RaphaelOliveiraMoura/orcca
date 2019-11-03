const express = require('express');
const cors = require('cors');
const database = require('./database/sequelize');
const routes = require('../src/routes');
const { port } = require('./config/server');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', routes);

const startApplication = async onServerOpen => {
  await database.authenticate();
  app.listen(port, onServerOpen);
};

module.exports = {
  app,
  startApplication
};
