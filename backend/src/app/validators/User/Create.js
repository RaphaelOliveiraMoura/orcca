import * as Yup from 'yup';
import { Op } from 'sequelize';

import User from '~/app/models/User';
import UserRule from '~/app/models/UserRule';

export default async function(request, response, next) {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    login: Yup.string().required(),
    password: Yup.string().required(),
    cpf: Yup.string().required(),
    rule_id: Yup.number().required(),
  });

  try {
    await schema.validate(request.body, { abortEarly: false });
  } catch ({ errors }) {
    return response.status(400).json({ errors });
  }

  const userExists = await User.findOne({
    where: {
      [Op.or]: [
        { login: { [Op.like]: request.body.login } },
        { cpf: { [Op.like]: request.body.cpf } },
      ],
    },
  });

  if (userExists) {
    return response.status(400).json({ error: 'User already exists' });
  }

  const rule = await UserRule.findByPk(request.body.rule_id);

  if (!rule) {
    return response
      .status(400)
      .json({ error: 'You need to pass a valid rule' });
  }

  return next();
}
