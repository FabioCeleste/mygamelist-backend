import multer from 'multer';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    fileFilter: (req, file, cb) => {
      if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
        return cb(new multer.MulterError('Arquivo precisa ser png ou jpge'));
      }
      return cb(null, true);
    },
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}${extname(file.originalname)}`);
    },
  }),

};
