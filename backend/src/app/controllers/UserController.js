import User from '~/app/models/User';

class UserController {
  async index(request, response) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'login', 'cpf'],
    });
    return response.json(users);
  }

  async show(request, response) {
    const user = await User.findByPk(request.params.id, {
      attributes: ['id', 'name', 'login', 'cpf'],
    });

    if (!user) {
      return response.status(400).json({ error: 'Invalid user' });
    }

    return response.json(user);
  }

  async store(request, response) {
    const user = await User.create(request.body);
    return response.status(201).json(user);
  }

  async update(request, response) {
    const user = await User.findByPk(request.params.id);

    if (!user) {
      return response.status(400).json({ error: 'User does not exists' });
    }

    await user.update(request.body);

    return response.status(200).json(user);
  }

  async destroy(request, response) {
    const user = await User.findByPk(request.params.id);

    if (!user) {
      return response.status(400).json({ error: 'User does not exists' });
    }

    await user.destroy();

    return response.json({ message: 'User deleted with success' });
  }
}

export default new UserController();
