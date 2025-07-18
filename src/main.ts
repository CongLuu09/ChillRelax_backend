import express from 'express';
import path from 'path';
import soundRoutes from './routes/sound.routes';
import mixRoutes from './routes/mix.routes';
import uploadRoutes from './routes/upload.routes';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.config';
import categoryRoutes from "./routes/category.route";


const app = express();
const PORT = 3000;

const publicDir = path.join(__dirname, '..', 'public');
const viewsDir = path.join(__dirname, '..', 'views');


app.use(express.json());
app.use(express.static(publicDir));


app.use('/api/sounds', soundRoutes);
app.use('/api/mix', mixRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/users', userRoutes);
app.use('/api', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get('/login', (req, res) => {
  res.sendFile(path.join(viewsDir, 'login.html'));
});
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(viewsDir, 'login.html'));
});


app.get('/admin', (req, res) => {
  res.sendFile(path.join(viewsDir, 'index.html'));
});
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(viewsDir, 'index.html'));
});


app.get('/index.html', (req, res) => {
  res.sendFile(path.join(viewsDir, 'index.html'));
});
app.get('/', (req, res) => {
  res.sendFile(path.join(viewsDir, 'login.html'));
});


app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
