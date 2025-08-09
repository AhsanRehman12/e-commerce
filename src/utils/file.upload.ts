import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerProductImageConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const prefixes = Date.now() + '-' + Math.round(Math.random() * 1000);
      callback(null, prefixes + extname(file.originalname));
    },
  }),
};