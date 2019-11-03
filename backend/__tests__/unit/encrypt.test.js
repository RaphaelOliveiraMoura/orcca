const { encrypt, compare } = require('../../src/utils/encrypt');

it('should create and verify a valid password encrypted', () => {
  const encriptValue = encrypt('raphael');
  expect(encriptValue).not.toBeNull();
  const isEqual = compare(encriptValue, 'raphael');
  expect(isEqual).toEqual(true);
});

it('should return false, when try compare a invalid encrypt value', () => {
  const encriptValue = encrypt('raphael');
  expect(compare(encriptValue, 'raphael2')).toEqual(false);
  expect(compare(encriptValue, encriptValue)).toEqual(false);
  expect(compare('raphael', encriptValue)).toEqual(false);
  expect(compare('dalçskdçlasd5a4sda4s56d4asdasd', 'raphael')).toEqual(false);
  expect(compare('56a4sd564a6s5da', 'raphael')).toEqual(false);
  expect(compare('', 'raphael')).toEqual(false);
  expect(compare('.+/´´]~~-*-]-=-*/-', 'raphael')).toEqual(false);
  expect(compare('raphael', 'raphael')).toEqual(false);
  expect(compare('', '')).toEqual(false);
  expect(compare('45465', '')).toEqual(false);
});
