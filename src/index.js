const app = require('./app');
const { port } = require('./config/server');

app.start(() => {
  console.log(`application running on port: ${port}...`);
});
