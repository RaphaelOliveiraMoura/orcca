const { startApplication } = require('./app');
const { port } = require('./config/server');

startApplication(() => {
  console.log(`application running on port: ${port}...`);
});
