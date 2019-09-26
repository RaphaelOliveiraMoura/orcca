const FakerWrapper = require('../global/FakerWrapper');

/**
 * This file represent all the data of employees to save in database
 * to realize the tests
 */
module.exports = [
  FakerWrapper.generateRandomEmployee({
    ruleId: 1
  }),
  FakerWrapper.generateRandomEmployee({
    ruleId: 2
  }),
  FakerWrapper.generateRandomEmployee({
    ruleId: 3
  }),
  FakerWrapper.generateRandomEmployee({
    ruleId: 1
  }),
  FakerWrapper.generateRandomEmployee({
    ruleId: 2
  }),
  FakerWrapper.generateRandomEmployee({
    ruleId: 2
  }),
  FakerWrapper.generateRandomEmployee({
    ruleId: 3
  })
];
