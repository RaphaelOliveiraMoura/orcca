function catchAndReturnAPIError(response, error) {
  const message = error.message || 'Internal Server Error';
  const status = error.status || 500;
  return response.status(status).json({ message });
}

function throwResponseStatusAndMessage(status, message) {
  throw {
    status,
    message
  };
}

module.exports = {
  catchAndReturnAPIError,
  throwResponseStatusAndMessage
};
