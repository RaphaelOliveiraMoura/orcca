const jwt = require('jsonwebtoken');
const { protectKey } = require('../config/server');
const expirationTime = '1h';

function generateToken(id, rule) {
  return jwt.sign({ id, rule }, protectKey, { expiresIn: expirationTime });
}

function verifyToken(token) {
  try {
    const payload = jwt.verify(token, protectKey);
    if (!payload || !payload.id || !payload.rule) return false;
    return payload;
  } catch (error) {
    return false;
  }
}

module.exports = {
  generateToken,
  verifyToken
};
