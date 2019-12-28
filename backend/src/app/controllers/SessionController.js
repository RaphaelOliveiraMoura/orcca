import jwt from 'jsonwebtoken';

import authConfig from '~/config/auth';
import User from '~/app/models/User';

class SessionController {
  async store(request, response) {
    const { login, password } = request.body;

    const user = await User.findOne({
      where: { login },
    });

    if (!user) {
      return response.status(400).json({ error: 'Invalid login' });
    }

    const checkPassword = await user.checkPassword(password);

    if (!checkPassword) {
      return response.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { user_id: user.id, rule_id: user.rule_id },
      authConfig.secret,
      { expiresIn: authConfig.expiresIn }
    );

    return response.json({
      id: user.id,
      login,
      token,
    });
  }
}

export default new SessionController();
