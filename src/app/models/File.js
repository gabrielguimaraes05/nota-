import Sequelize, { Model } from 'sequelize';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const aws = require('aws-sdk');

require('dotenv/config');

const s3 = new aws.S3();

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        size: Sequelize.INTEGER,
        url: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );
    this.addHook('beforeSave', async (file) => {
      if (!file.url) {
        file.url = `${process.env.APP_URL}/files/${file.path}`;
      }
    });
    this.addHook('beforeDestroy', (file) => {
      if (process.env.STORAGE_TYPE === 's3') {
        return s3.deleteObject({
          Bucket: 'notamais',
          Key: file.path,
        }).promise();
      }
      console.log(`Teste0${file.path}`);
      return promisify(fs.unlink)(
        path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', file.path),
      );
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Order, { foreignKey: 'order_id' });
  }
}

export default File;
