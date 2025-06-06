import express from 'express';
import path from 'path';
import soundRoutes from './routes/sound.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.config';
import mixRoutes from './routes/mix.routes';
import uploadRoutes from './routes/upload.routes';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

const app = express();
const PORT = 3000;


const publicDir = path.join(__dirname, '..', 'public');
const viewsDir = path.join(__dirname, '..', 'views');

app.use(express.json());
app.use(express.static(viewsDir));


app.use('/api/sounds', soundRoutes);
app.use('/api/mix', mixRoutes);``
app.use('/api/upload', uploadRoutes);
app.use('/api/users', userRoutes);
app.use('/api', authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get('/login', (req, res) => {
  res.sendFile(path.join(viewsDir, 'login.html'));
});


app.get('/user-dashboard', (req, res) => {
  res.sendFile(path.join(viewsDir, 'user-dashboard.html'));
});


app.get('/admin', (req, res) => {
  res.sendFile(path.join(viewsDir, 'index.html'));
});


app.get('/', (req, res) => {
  res.sendFile(path.join(viewsDir, 'login.html'));
});
app.use('/public', express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});