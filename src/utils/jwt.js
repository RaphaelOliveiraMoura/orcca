const jwt = require('jsonwebtoken');
const { protectKey } = require('../config/server');
const expirationTime = '1h';

function generateToken(userId) {
  return jwt.sign(
    {
      userId
    },
    protectKey,
    { expiresIn: expirationTime }
  );
}

async function verifyToken(token) {
  try {
    const { userId } = jwt.verify(token, protectKey);
    if (!userId) return false;
    return userId;
  } catch (error) {
    return false;
  }
}

module.exports = {
  generateToken,
  verifyToken
};
