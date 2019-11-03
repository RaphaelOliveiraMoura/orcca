const { app } = require('../../../src/app');
const api = require('supertest')(app);

module.exports = api;
