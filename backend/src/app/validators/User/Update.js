import * as Yup from 'yup';

export default async function(request, response, next) {
  const schema = Yup.object().shape({
    name: Yup.string(),
    login: Yup.string(),
    password: Yup.string(),
    cpf: Yup.string(),
    rule_id: Yup.number(),
  });

  try {
    await schema.validate(request.body, { abortEarly: false });
  } catch ({ errors }) {
    return response.status(400).json({ errors });
  }

  if (request.body.rule_id && request.session.rule_id !== 1) {
    return response
      .status(400)
      .json({ error: 'You cannot update the rule_id field' });
  }

  if (
    Number(request.params.id) !== request.session.user_id &&
    request.session.rule_id !== 1
  ) {
    return response
      .status(401)
      .json({ error: 'You just can update your own profile' });
  }

  return next();
}
