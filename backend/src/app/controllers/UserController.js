import User from '~/app/models/User';

class UserController {
  async store(request, response) {
    const user = await User.create(request.body);
    return response.status(201).json(user);
  }
}

export default new UserController();
