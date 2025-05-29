import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { encryptFile } from '../utils/encrypt-file'

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.fieldname === 'fileImage' ? 'images' : 'sounds';
    const dir = path.join(__dirname, `../../public/${folder}`);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, name + ext);
  },
});

const upload = multer({ storage });

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload file âm thanh kèm ảnh đại diện
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - fileImage
 *               - fileSound
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rain on Tent
 *               fileImage:
 *                 type: string
 *                 format: binary
 *               fileSound:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Trả về thông tin file đã lưu
 */
router.post('/', upload.fields([
  { name: 'fileImage', maxCount: 1 },
  { name: 'fileSound', maxCount: 1 }
]), (req, res) => {
  const { name } = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  if (!name || !files.fileImage || !files.fileSound) {
    return res.status(400).json({ message: 'Thiếu thông tin upload' });
  }

  const rawImagePath = files.fileImage[0].path;
  const rawSoundPath = files.fileSound[0].path;

  const encryptedImagePath = rawImagePath + '.enc';
  const encryptedSoundPath = rawSoundPath + '.enc';

  encryptFile(rawImagePath, encryptedImagePath);
  encryptFile(rawSoundPath, encryptedSoundPath);

  // Optionally: xoá file gốc không mã hoá
  //  fs.unlinkSync(rawImagePath);
  //  fs.unlinkSync(rawSoundPath);

  return res.status(201).json({
    name,
    fileImageUrl: `/public/images/${path.basename(encryptedImagePath)}`,
    fileSoundUrl: `/public/sounds/${path.basename(encryptedSoundPath)}`
  });
});
export default router;
