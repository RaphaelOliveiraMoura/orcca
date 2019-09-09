function catchAndReturnAPIError(response, error) {
  const message = error.message || 'Internal Server Error';
  const status = error.status || 500;
  return response.status(status).json({ error: message });
}

function throwResponseStatusAndMessage(status, message) {
  throw {
    status,
    message
  };
}

function validateParams(values) {
  const errors = [];
  values.forEach(([value, name, regex]) => {
    if (!regex) {
      const errorMessage = name
        ? `You need to pass ${name} as parameter`
        : 'Invalid params';
      if (!value || (typeof value == 'String' && !value.trim()))
        errors.push(errorMessage);
    }
  });
  if (errors.length > 0) {
    const errorMessage = errors.length == 1 ? errors[0] : errors;
    throwResponseStatusAndMessage(400, errorMessage);
  }
}

module.exports = {
  catchAndReturnAPIError,
  throwResponseStatusAndMessage,
  validateParams
};
