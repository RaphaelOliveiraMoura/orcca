import Sequelize, { Model } from 'sequelize';

class UserSchedule extends Model {
  static init(sequelize) {
    super.init(
      {
        start_at: Sequelize.DATE,
        end_at: Sequelize.DATE,
        days_of_week: Sequelize.STRING,
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default UserSchedule;
