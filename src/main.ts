import express from 'express';
import path from 'path';
import soundRoutes from './routes/sound.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.config';
import mixRoutes from './routes/mix.routes';
import uploadRoutes from './routes/upload.routes';
import adminRoutes from './routes/admin.route'; 

const app = express();
const PORT = 3000;

const publicDir = path.join(__dirname, '..', 'public');

app.use(express.json());
app.use('/public', express.static(publicDir));

// Dùng admin route (nếu có các API hoặc nhiều route cho admin)
app.use('/admin', adminRoutes);

// Nếu adminRoutes chưa có hoặc chỉ 1 trang index.html thì dùng cách này
app.get('/admin', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Trả index.html khi truy cập root (nếu cần)
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.use('/api/sounds', soundRoutes);
app.use('/api/mix', mixRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
