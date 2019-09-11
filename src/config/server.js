require('dotenv').config();

const serverConfigurations = {
  port: process.env.PORT || 5050,
  protectKey: process.env.PROTECT_KEY,
  envrironment: process.env.ENV,
  database: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    logging: process.env.DATABASE_LOG == 'true' ? true : false
  },
  databaseTest: {
    username: process.env.DATABASE_TEST_USERNAME,
    password: process.env.DATABASE_TEST_PASSWORD,
    database: process.env.DATABASE_TEST_NAME,
    host: process.env.DATABASE_TEST_HOST,
    dialect: process.env.DATABASE_TEST_DIALECT,
    logging: process.env.DATABASE_TEST_LOG == 'false' ? false : true
  }
};

const requiredParams = [
  process.env.PROTECT_KEY,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  process.env.DATABASE_NAME,
  process.env.DATABASE_HOST,
  process.env.DATABASE_DIALECT
];

if (serverConfigurations.envrironment == 'test') {
  requiredParams.push([
    process.env.DATABASE_TEST_USERNAME,
    process.env.DATABASE_TEST_PASSWORD,
    process.env.DATABASE_TEST_NAME,
    process.env.DATABASE_TEST_HOST,
    process.env.DATABASE_TEST_DIALECT
  ]);
}

requiredParams.forEach(item => {
  if (!item)
    throw '[ Some required envrironment variables was not setted, please consult the documentation to see how variables are required to run the project ]';
});

module.exports = serverConfigurations;
