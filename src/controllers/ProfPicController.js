import multer from 'multer';

import multerConfig from '../config/multer';
import Picture from '../models/Picture';

const upload = multer(multerConfig).single('photo');

class ProfPicController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(404).json({ errors: [err.code] });
      }
      const { originalname, filename } = req.file;
      await Picture.create({ originalname, filename, user_id: req.userId });
      return res.json({ ok: 'ok' });
    });
  }
}

export default new ProfPicController();
