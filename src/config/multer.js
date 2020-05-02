import multer from 'multer';
import crypto from 'crypto';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import { resolve } from 'path';

require('dotenv/config');

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if(err) cb(err);

        file.key = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, file.key);
      })
    }
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: 'notamais',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if(err) cb(err);

        const fileName = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, fileName);
      });
    },
  }),
};

export default {
  dest: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  /*fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif'
    ];

    if(allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  }*/
};
