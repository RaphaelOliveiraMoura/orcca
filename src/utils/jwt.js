const jwt = require('jsonwebtoken');
const { protectKey } = require('../config/server');
const expirationTime = '1h';

<<<<<<< HEAD
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
=======
function generateToken(id, rule) {
  return jwt.sign({ id, rule }, protectKey, { expiresIn: expirationTime });
}

function verifyToken(token) {
  try {
    const { id, rule } = jwt.verify(token, protectKey);
    if (!id || !rule) return false;
    return { id, rule };
>>>>>>> raphael/migrations
  } catch (error) {
    return false;
  }
}

module.exports = {
  generateToken,
  verifyToken
};
