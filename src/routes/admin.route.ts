import express from 'express';
import path from 'path';

const router = express.Router();
const publicDir = path.join(__dirname, '..', 'Chill_Relax');

// Trang chủ: trả về file dashboard.html trong thư mục public
router.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));  // Thay bằng tên file HTML của bạn
});

// Trang admin panel: mở file index.html trong folder public
router.get('/admin', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

export default router;
