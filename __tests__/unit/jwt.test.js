const jwt = require('../../src/utils/jwt');

const payload = {
  id: 99,
  rule: 'admin'
};

it('should return a jwt with a encrypted paylodad and verify if it is valid', () => {
  const token = jwt.generateToken(payload.id, payload.rule);
  expect(token).not.toBeNull();

  const { id, rule } = jwt.verifyToken(token);
  expect(id).toEqual(payload.id);
  expect(rule).toEqual(payload.rule);
});

it('should return false when try verify a invalid token', () => {
  const payload = jwt.verifyToken('daskljdlaksjkdljaslkd');
  expect(payload).toEqual(false);
});
