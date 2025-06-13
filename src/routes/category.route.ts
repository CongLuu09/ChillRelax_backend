import express from 'express';
import { CategoryController } from '../controllers/category.controller';
import { getUploader } from '../utils/file-uploader';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const controller = new CategoryController();


const upload = getUploader('categories');


router.get('/', controller.getAll);


router.get('/:id', controller.getById);


router.post('/', controller.create);


router.put('/:id', controller.update);


router.delete('/:id', controller.delete);


router.post('/upload-image', getUploader('categories').single('file'), (req, res) => {
  console.log('req.file:', req.file); 
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const url = '/categories/' + req.file.filename;
  res.json({ url });
});



router.get('/json', (req, res) => {
  const dataPath = path.join(__dirname, '../../data/categories.json');
  if (!fs.existsSync(dataPath)) return res.json([]);
  const data = fs.readFileSync(dataPath, 'utf-8');
  res.type('application/json').send(data);
});

export default router;