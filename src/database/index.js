/* eslint-disable no-console */
import Sequelize from 'sequelize';
import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  async init() {
    this.connection = new Sequelize(databaseConfig);

    try {
      await this.connection.authenticate();
      console.log( '[src/database/index]' + ' Connection has been established successfully.');
    } catch (error) {
      console.error('[src/database/index]' + ' Unable to connect to the database:', error);
    }

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
