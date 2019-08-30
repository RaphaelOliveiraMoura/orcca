const CryptoJS = require('crypto-js');

const { protectKey } = require('../config/server');

function encrypt(text) {
  return CryptoJS.AES.encrypt(text, protectKey).toString();
}

function compare(encryptText, textWithoutEncrypt) {
  const decryptText = CryptoJS.AES.decrypt(encryptText, protectKey).toString(
    CryptoJS.enc.Utf8
  );
  return decryptText === textWithoutEncrypt;
}

module.exports = {
  encrypt,
  compare
};
