export default {
  cpf: {
    mask: '999.999.999-99',
    pattern: '\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}'
  },
  cep: {
    mask: '99.999-999',
    pattern: '\\d{2}\\.\\d{3}-\\d{3}'
  },
  phone: {
    mask: '(99) \\99999-9999',
    pattern: '\\(\\d{2}\\) \\d{5}-\\d{4}'
  },
  email: {
    pattern: '[a-z0-9.]+@[a-z0-9]+\\.[a-z]+(\\.[a-z]+)?$'
  }
};
