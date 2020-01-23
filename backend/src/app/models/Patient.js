import Sequelize, { Model } from 'sequelize';

class Patient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        birth_date: Sequelize.DATE,
      },
      { sequelize }
    );
  }
}

export default Patient;
