const encrypt = require('./encrypt');

const encript = encrypt.encrypt('raphael');
const isEqual = encrypt.compare(encript, 'raphael');

console.log(`encript text: ${encript}, isEqual: ${isEqual}`);
