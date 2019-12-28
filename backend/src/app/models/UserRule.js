import Sequelize, { Model } from 'sequelize';

class UserRule extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
      },
      { sequelize }
    );
  }
}

export default UserRule;
