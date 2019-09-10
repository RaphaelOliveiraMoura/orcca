const api = require('./api');

const employee = {
  name: 'TesteUser',
  cpf: '11111111111',
  login: 'teste',
  password: 'teste123',
  birthDate: '1999-06-12',
  phoneNumber: '31999999999',
  rule: 1
};

async function getAuthorizationToken() {
  const { body } = await api.post('/api/login').send({
    login: employee.login,
    password: employee.password
  });
  return body.token;
}

async function getAuthorizationEmployee() {
  try {
    await api.post('/api/employee').send(employee);
  } finally {
    return employee;
  }
}

module.exports = {
  getAuthorizationToken,
  getAuthorizationEmployee
};
