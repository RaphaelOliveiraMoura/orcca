import User from '~/app/models/User';

class UserController {
  async index(request, response) {
    const users = await User.findAll();
    return response.json(users);
  }

  async store(request, response) {
    const user = await User.create(request.body);
    return response.status(201).json(user);
  }
}

export default new UserController();
