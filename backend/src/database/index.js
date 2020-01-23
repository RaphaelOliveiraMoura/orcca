import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import UserRule from '~/app/models/UserRule';
import User from '~/app/models/User';
import Patient from '~/app/models/Patient';

const models = [UserRule, User, Patient];

class Database {
  constructor() {
    this.init();
    this.tryConnect();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }

  tryConnect() {
    try {
      this.connection.authenticate();
    } catch (error) {
      throw new Error('Error to connect with database');
    }
  }
}

export default new Database();
