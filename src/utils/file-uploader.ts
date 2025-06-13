import multer from 'multer';
import path from 'path';

export function getUploader(type: 'sounds' | 'images' | 'categories') {
  let folder = '';
  if (type === 'sounds') folder = 'sounds';
  else if (type === 'images') folder = 'images';
  else if (type === 'categories') folder = 'categories';
  else throw new Error('Invalid upload type');

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, `../../public/${folder}`));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    },
  });

  return multer({ storage });
}