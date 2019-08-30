const jwt = require('jsonwebtoken');
const { protectKey } = require('../config/server');
const expirationTime = '1h';

function generateToken(id, rule) {
  return jwt.sign({ id, rule }, protectKey, { expiresIn: expirationTime });
}

function verifyToken(token) {
  try {
    const { id, rule } = jwt.verify(token, protectKey);
    if (!id || !rule) return false;
    return { id, rule };
  } catch (error) {
    return false;
  }
}

module.exports = {
  generateToken,
  verifyToken
};
